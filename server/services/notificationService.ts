import { executeQuery } from '../database/connection';

export interface NotificationData {
  type: string;
  title: string;
  message: string;
  phone?: string;
  userId?: string;
  referenceId?: string;
}

export async function sendNotification(data: NotificationData) {
  try {
    let userId = data.userId;
    
    // If phone is provided but not userId, find user by phone
    if (data.phone && !userId) {
      const userResult = await executeQuery(
        'SELECT id FROM users WHERE phone = $1 LIMIT 1',
        [data.phone]
      );
      
      if (userResult.rows.length > 0) {
        userId = userResult.rows[0].id;
      }
    }

    // Store notification in database
    if (userId) {
      await executeQuery(`
        INSERT INTO notifications (
          user_id, title_en, message_en, type, reference_id
        ) VALUES ($1, $2, $3, $4, $5)
      `, [userId, data.title, data.message, data.type, data.referenceId]);
    }

    // Here you would integrate with SMS/Email services
    // For now, we'll just log the notification
    console.log('📱 Notification sent:', {
      type: data.type,
      title: data.title,
      message: data.message,
      phone: data.phone,
      userId
    });

    // In production, integrate with services like:
    // - SMS: Twilio, AWS SNS, or local SMS gateway
    // - Email: SendGrid, AWS SES, or SMTP
    // - Push notifications: Firebase Cloud Messaging
    
    return {
      success: true,
      message: 'Notification sent successfully'
    };
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Failed to send notification');
  }
}

export async function getNotifications(userId: string, limit: number = 50) {
  try {
    const query = `
      SELECT id, title_en as title, message_en as message, type, 
             reference_id, is_read, created_at
      FROM notifications
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2
    `;
    
    const result = await executeQuery(query, [userId, limit]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw new Error('Failed to fetch notifications');
  }
}

export async function markNotificationAsRead(notificationId: string, userId: string) {
  try {
    const query = `
      UPDATE notifications 
      SET is_read = true 
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    
    const result = await executeQuery(query, [notificationId, userId]);
    
    if (result.rows.length === 0) {
      throw new Error('Notification not found');
    }

    return {
      success: true,
      message: 'Notification marked as read'
    };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw new Error('Failed to mark notification as read');
  }
}

export async function getUnreadNotificationCount(userId: string) {
  try {
    const query = `
      SELECT COUNT(*) as count
      FROM notifications
      WHERE user_id = $1 AND is_read = false
    `;
    
    const result = await executeQuery(query, [userId]);
    return parseInt(result.rows[0].count);
  } catch (error) {
    console.error('Error getting unread notification count:', error);
    return 0;
  }
}
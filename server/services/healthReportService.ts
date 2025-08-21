import { executeQuery, executeTransaction } from '../database/connection';
import { generateReportId } from '../utils/idGenerator';
import { sendNotification } from './notificationService';

export interface HealthReportData {
  farmerName: string;
  phone: string;
  village: string;
  animalType: string;
  animalCount: number;
  symptoms: string;
  severity: string;
  duration?: string;
  location?: string;
  photos?: string[];
}

export async function createHealthReport(data: HealthReportData) {
  const reportId = generateReportId('VET');
  
  try {
    // Calculate priority score based on severity
    const priorityScore = calculatePriorityScore(data.severity, data.animalCount);
    
    const queries = [
      {
        query: `
          INSERT INTO health_reports (
            report_id, farmer_name, phone, village, animal_type, animal_count,
            symptoms, severity, duration, location_coordinates, priority_score
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          RETURNING id, report_id
        `,
        params: [
          reportId, data.farmerName, data.phone, data.village, data.animalType,
          data.animalCount, data.symptoms, data.severity, data.duration,
          data.location, priorityScore
        ]
      }
    ];

    // Add photo entries if provided
    if (data.photos && data.photos.length > 0) {
      data.photos.forEach(photoUrl => {
        queries.push({
          query: `
            INSERT INTO health_report_photos (report_id, photo_url, photo_name)
            SELECT id, $1, $2 FROM health_reports WHERE report_id = $3
          `,
          params: [photoUrl, `photo_${Date.now()}.jpg`, reportId]
        });
      });
    }

    const results = await executeTransaction(queries);
    const reportResult = results[0].rows[0];

    // Auto-assign to available doctor based on severity and location
    if (data.severity === 'critical' || data.severity === 'high') {
      await autoAssignDoctor(reportResult.id, data.village, data.severity);
    }

    // Send notifications
    await sendNotification({
      type: 'health_report_created',
      title: 'Health Report Submitted',
      message: `Your health report ${reportId} has been submitted successfully.`,
      phone: data.phone
    });

    return {
      success: true,
      reportId,
      message: 'Health report submitted successfully'
    };
  } catch (error) {
    console.error('Error creating health report:', error);
    throw new Error('Failed to create health report');
  }
}

export async function getHealthReports(filters: any = {}) {
  try {
    let query = `
      SELECT hr.*, at.name_en as animal_name, at.icon as animal_icon,
             u.name as assigned_doctor_name
      FROM health_reports hr
      LEFT JOIN animal_types at ON hr.animal_type = at.id
      LEFT JOIN users u ON hr.assigned_doctor_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 0;

    if (filters.status) {
      paramCount++;
      query += ` AND hr.status = $${paramCount}`;
      params.push(filters.status);
    }

    if (filters.severity) {
      paramCount++;
      query += ` AND hr.severity = $${paramCount}`;
      params.push(filters.severity);
    }

    if (filters.phone) {
      paramCount++;
      query += ` AND hr.phone = $${paramCount}`;
      params.push(filters.phone);
    }

    if (filters.village) {
      paramCount++;
      query += ` AND hr.village ILIKE $${paramCount}`;
      params.push(`%${filters.village}%`);
    }

    query += ` ORDER BY hr.priority_score DESC, hr.created_at DESC`;

    if (filters.limit) {
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      params.push(filters.limit);
    }

    const result = await executeQuery(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching health reports:', error);
    throw new Error('Failed to fetch health reports');
  }
}

export async function updateHealthReportStatus(reportId: string, status: string, doctorId?: string, notes?: string) {
  try {
    const query = `
      UPDATE health_reports 
      SET status = $1, assigned_doctor_id = $2, updated_at = NOW()
      WHERE report_id = $3
      RETURNING *
    `;
    
    const result = await executeQuery(query, [status, doctorId, reportId]);
    
    if (result.rows.length === 0) {
      throw new Error('Health report not found');
    }

    const report = result.rows[0];

    // Send notification to farmer
    await sendNotification({
      type: 'health_report_updated',
      title: 'Health Report Update',
      message: `Your health report ${reportId} status has been updated to ${status}.`,
      phone: report.phone
    });

    return {
      success: true,
      message: 'Health report updated successfully',
      report
    };
  } catch (error) {
    console.error('Error updating health report:', error);
    throw new Error('Failed to update health report');
  }
}

function calculatePriorityScore(severity: string, animalCount: number): number {
  const severityScores = {
    'critical': 100,
    'high': 75,
    'medium': 50,
    'low': 25
  };
  
  const baseScore = severityScores[severity as keyof typeof severityScores] || 25;
  const countMultiplier = Math.min(animalCount / 10, 2); // Max 2x multiplier
  
  return Math.round(baseScore * (1 + countMultiplier));
}

async function autoAssignDoctor(reportId: string, village: string, severity: string) {
  try {
    // Find available doctors in the area
    const query = `
      SELECT d.id, d.user_id, u.name, d.available_districts
      FROM doctors d
      JOIN users u ON d.user_id = u.id
      WHERE d.is_active = true
      AND (d.available_districts IS NULL OR $1 = ANY(d.available_districts))
      ORDER BY d.rating DESC, d.total_reviews DESC
      LIMIT 1
    `;
    
    const result = await executeQuery(query, [village]);
    
    if (result.rows.length > 0) {
      const doctor = result.rows[0];
      
      await executeQuery(
        'UPDATE health_reports SET assigned_doctor_id = $1, status = $2 WHERE id = $3',
        [doctor.user_id, 'assigned', reportId]
      );

      // Notify doctor
      await sendNotification({
        type: 'report_assigned',
        title: 'New Health Report Assigned',
        message: `A ${severity} priority health report has been assigned to you.`,
        userId: doctor.user_id
      });
    }
  } catch (error) {
    console.error('Error auto-assigning doctor:', error);
  }
}
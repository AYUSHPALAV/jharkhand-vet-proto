import { executeQuery, executeTransaction } from '../database/connection';
import { generateReportId } from '../utils/idGenerator';
import { sendNotification } from './notificationService';

export interface AppointmentData {
  farmerName: string;
  phone: string;
  village: string;
  address: string;
  serviceType: string;
  visitType: string;
  animalType: string;
  animalCount: number;
  description?: string;
  preferredDate: string;
  preferredTime: string;
  alternateDate?: string;
  alternateTime?: string;
  urgency: string;
}

export async function createAppointment(data: AppointmentData) {
  const bookingId = generateReportId('VET');
  
  try {
    const query = `
      INSERT INTO appointments (
        booking_id, farmer_name, phone, village, address, service_type,
        visit_type, animal_type, animal_count, description, preferred_date,
        preferred_time, alternate_date, alternate_time, urgency
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id, booking_id
    `;
    
    const params = [
      bookingId, data.farmerName, data.phone, data.village, data.address,
      data.serviceType, data.visitType, data.animalType, data.animalCount,
      data.description, data.preferredDate, data.preferredTime,
      data.alternateDate, data.alternateTime, data.urgency
    ];

    const result = await executeQuery(query, params);
    const appointment = result.rows[0];

    // Auto-assign doctor based on availability and location
    if (data.urgency === 'emergency') {
      await autoAssignDoctorForAppointment(appointment.id, data.village, data.preferredDate, data.preferredTime);
    }

    // Send confirmation notification
    await sendNotification({
      type: 'appointment_created',
      title: 'Appointment Booked',
      message: `Your veterinary appointment ${bookingId} has been scheduled for ${data.preferredDate} at ${data.preferredTime}.`,
      phone: data.phone
    });

    return {
      success: true,
      bookingId,
      message: 'Appointment booked successfully'
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw new Error('Failed to create appointment');
  }
}

export async function getAppointments(filters: any = {}) {
  try {
    let query = `
      SELECT a.*, at.name_en as animal_name, at.icon as animal_icon,
             u.name as assigned_doctor_name, u.phone as doctor_phone
      FROM appointments a
      LEFT JOIN animal_types at ON a.animal_type = at.id
      LEFT JOIN users u ON a.assigned_doctor_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 0;

    if (filters.status) {
      paramCount++;
      query += ` AND a.status = $${paramCount}`;
      params.push(filters.status);
    }

    if (filters.phone) {
      paramCount++;
      query += ` AND a.phone = $${paramCount}`;
      params.push(filters.phone);
    }

    if (filters.doctorId) {
      paramCount++;
      query += ` AND a.assigned_doctor_id = $${paramCount}`;
      params.push(filters.doctorId);
    }

    if (filters.date) {
      paramCount++;
      query += ` AND a.preferred_date = $${paramCount}`;
      params.push(filters.date);
    }

    query += ` ORDER BY a.preferred_date ASC, a.preferred_time ASC`;

    const result = await executeQuery(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw new Error('Failed to fetch appointments');
  }
}

export async function updateAppointmentStatus(bookingId: string, status: string, doctorId?: string, notes?: string) {
  try {
    const query = `
      UPDATE appointments 
      SET status = $1, assigned_doctor_id = $2, notes = $3, updated_at = NOW()
      WHERE booking_id = $4
      RETURNING *
    `;
    
    const result = await executeQuery(query, [status, doctorId, notes, bookingId]);
    
    if (result.rows.length === 0) {
      throw new Error('Appointment not found');
    }

    const appointment = result.rows[0];

    // Send notification to farmer
    await sendNotification({
      type: 'appointment_updated',
      title: 'Appointment Update',
      message: `Your appointment ${bookingId} status has been updated to ${status}.`,
      phone: appointment.phone
    });

    return {
      success: true,
      message: 'Appointment updated successfully',
      appointment
    };
  } catch (error) {
    console.error('Error updating appointment:', error);
    throw new Error('Failed to update appointment');
  }
}

export async function getDoctorAvailability(doctorId: string, date: string) {
  try {
    const query = `
      SELECT da.day_of_week, da.start_time, da.end_time, da.is_available
      FROM doctor_availability da
      WHERE da.doctor_id = $1 AND da.is_available = true
    `;
    
    const result = await executeQuery(query, [doctorId]);
    
    // Get existing appointments for the date
    const appointmentsQuery = `
      SELECT preferred_time, actual_time
      FROM appointments
      WHERE assigned_doctor_id = $1 AND (preferred_date = $2 OR actual_date = $2)
      AND status NOT IN ('cancelled', 'completed')
    `;
    
    const appointmentsResult = await executeQuery(appointmentsQuery, [doctorId, date]);
    
    return {
      availability: result.rows,
      bookedSlots: appointmentsResult.rows
    };
  } catch (error) {
    console.error('Error fetching doctor availability:', error);
    throw new Error('Failed to fetch doctor availability');
  }
}

async function autoAssignDoctorForAppointment(appointmentId: string, village: string, date: string, time: string) {
  try {
    // Find available doctors for the requested date and time
    const query = `
      SELECT d.id, d.user_id, u.name, d.available_districts
      FROM doctors d
      JOIN users u ON d.user_id = u.id
      LEFT JOIN doctor_availability da ON d.id = da.doctor_id
      WHERE d.is_active = true
      AND (d.available_districts IS NULL OR $1 = ANY(d.available_districts))
      AND da.is_available = true
      AND da.start_time <= $2::time
      AND da.end_time >= $2::time
      AND da.day_of_week = EXTRACT(DOW FROM $3::date)
      AND NOT EXISTS (
        SELECT 1 FROM appointments a
        WHERE a.assigned_doctor_id = d.user_id
        AND a.preferred_date = $3::date
        AND a.preferred_time = $2::time
        AND a.status NOT IN ('cancelled', 'completed')
      )
      ORDER BY d.rating DESC, d.total_reviews DESC
      LIMIT 1
    `;
    
    const result = await executeQuery(query, [village, time, date]);
    
    if (result.rows.length > 0) {
      const doctor = result.rows[0];
      
      await executeQuery(
        'UPDATE appointments SET assigned_doctor_id = $1, status = $2 WHERE id = $3',
        [doctor.user_id, 'confirmed', appointmentId]
      );

      // Notify doctor
      await sendNotification({
        type: 'appointment_assigned',
        title: 'New Appointment Assigned',
        message: `A new veterinary appointment has been assigned to you for ${date} at ${time}.`,
        userId: doctor.user_id
      });
    }
  } catch (error) {
    console.error('Error auto-assigning doctor for appointment:', error);
  }
}
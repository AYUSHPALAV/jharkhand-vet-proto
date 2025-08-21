import { RequestHandler } from 'express';
import { createAppointment, getAppointments, updateAppointmentStatus, getDoctorAvailability } from '../services/appointmentService';

export const createAppointmentHandler: RequestHandler = async (req, res) => {
  try {
    const result = await createAppointment(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createAppointmentHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getAppointmentsHandler: RequestHandler = async (req, res) => {
  try {
    const filters = req.query;
    const appointments = await getAppointments(filters);
    res.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error in getAppointmentsHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const updateAppointmentHandler: RequestHandler = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, doctorId, notes } = req.body;
    
    const result = await updateAppointmentStatus(bookingId, status, doctorId, notes);
    res.json(result);
  } catch (error) {
    console.error('Error in updateAppointmentHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getDoctorAvailabilityHandler: RequestHandler = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;
    
    const availability = await getDoctorAvailability(doctorId, date as string);
    res.json({ success: true, data: availability });
  } catch (error) {
    console.error('Error in getDoctorAvailabilityHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};
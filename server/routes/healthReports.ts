import { RequestHandler } from 'express';
import { createHealthReport, getHealthReports, updateHealthReportStatus } from '../services/healthReportService';

export const createHealthReportHandler: RequestHandler = async (req, res) => {
  try {
    const result = await createHealthReport(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createHealthReportHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getHealthReportsHandler: RequestHandler = async (req, res) => {
  try {
    const filters = req.query;
    const reports = await getHealthReports(filters);
    res.json({ success: true, data: reports });
  } catch (error) {
    console.error('Error in getHealthReportsHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const updateHealthReportHandler: RequestHandler = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, doctorId, notes } = req.body;
    
    const result = await updateHealthReportStatus(reportId, status, doctorId, notes);
    res.json(result);
  } catch (error) {
    console.error('Error in updateHealthReportHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};
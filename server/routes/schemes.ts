import { RequestHandler } from 'express';
import { createSchemeApplication, getSchemes, getSchemeApplications, updateSchemeApplicationStatus, trackSchemeApplication } from '../services/schemeService';

export const createSchemeApplicationHandler: RequestHandler = async (req, res) => {
  try {
    const result = await createSchemeApplication(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createSchemeApplicationHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getSchemesHandler: RequestHandler = async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const schemes = await getSchemes(language as string);
    res.json({ success: true, data: schemes });
  } catch (error) {
    console.error('Error in getSchemesHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getSchemeApplicationsHandler: RequestHandler = async (req, res) => {
  try {
    const filters = req.query;
    const applications = await getSchemeApplications(filters);
    res.json({ success: true, data: applications });
  } catch (error) {
    console.error('Error in getSchemeApplicationsHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const updateSchemeApplicationHandler: RequestHandler = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, reviewerId, reviewNotes, approvedAmount } = req.body;
    
    const result = await updateSchemeApplicationStatus(applicationId, status, reviewerId, reviewNotes, approvedAmount);
    res.json(result);
  } catch (error) {
    console.error('Error in updateSchemeApplicationHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const trackSchemeApplicationHandler: RequestHandler = async (req, res) => {
  try {
    const { applicationId, aadhaarNumber } = req.body;
    
    const application = await trackSchemeApplication(applicationId, aadhaarNumber);
    res.json({ success: true, data: application });
  } catch (error) {
    console.error('Error in trackSchemeApplicationHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};
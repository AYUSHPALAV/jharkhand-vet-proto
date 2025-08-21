import { RequestHandler } from 'express';
import { createWildlifeSighting, getWildlifeSightings, updateWildlifeSightingStatus, getWildlifeStatistics } from '../services/wildlifeService';

export const createWildlifeSightingHandler: RequestHandler = async (req, res) => {
  try {
    const result = await createWildlifeSighting(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error in createWildlifeSightingHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getWildlifeSightingsHandler: RequestHandler = async (req, res) => {
  try {
    const filters = req.query;
    const sightings = await getWildlifeSightings(filters);
    res.json({ success: true, data: sightings });
  } catch (error) {
    console.error('Error in getWildlifeSightingsHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const updateWildlifeSightingHandler: RequestHandler = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, officerId, responseNotes } = req.body;
    
    const result = await updateWildlifeSightingStatus(reportId, status, officerId, responseNotes);
    res.json(result);
  } catch (error) {
    console.error('Error in updateWildlifeSightingHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getWildlifeStatisticsHandler: RequestHandler = async (req, res) => {
  try {
    const filters = req.query;
    const statistics = await getWildlifeStatistics(filters);
    res.json({ success: true, data: statistics });
  } catch (error) {
    console.error('Error in getWildlifeStatisticsHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};
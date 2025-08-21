import { RequestHandler } from 'express';
import { getTranslation, getSystemSettings, updateUserLanguage, getUserLanguage, getLocalizedSchemes, getLocalizedAnimalTypes, getLocalizedNotifications } from '../services/languageService';

export const getTranslationsHandler: RequestHandler = async (req, res) => {
  try {
    const { language = 'en', keys } = req.query;
    
    if (typeof keys === 'string') {
      const keyArray = keys.split(',');
      const translations: { [key: string]: string } = {};
      
      keyArray.forEach(key => {
        translations[key] = getTranslation(key, language as string);
      });
      
      res.json({ success: true, data: translations });
    } else {
      res.json({ success: true, data: {} });
    }
  } catch (error) {
    console.error('Error in getTranslationsHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getSystemSettingsHandler: RequestHandler = async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const settings = await getSystemSettings(language as string);
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error('Error in getSystemSettingsHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const updateUserLanguageHandler: RequestHandler = async (req, res) => {
  try {
    const { userId, language } = req.body;
    
    if (!userId || !language) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID and language are required' 
      });
    }
    
    const result = await updateUserLanguage(userId, language);
    res.json(result);
  } catch (error) {
    console.error('Error in updateUserLanguageHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getUserLanguageHandler: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const language = await getUserLanguage(userId);
    res.json({ success: true, data: { language } });
  } catch (error) {
    console.error('Error in getUserLanguageHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getLocalizedSchemesHandler: RequestHandler = async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const schemes = await getLocalizedSchemes(language as string);
    res.json({ success: true, data: schemes });
  } catch (error) {
    console.error('Error in getLocalizedSchemesHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getLocalizedAnimalTypesHandler: RequestHandler = async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const animalTypes = await getLocalizedAnimalTypes(language as string);
    res.json({ success: true, data: animalTypes });
  } catch (error) {
    console.error('Error in getLocalizedAnimalTypesHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};

export const getLocalizedNotificationsHandler: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const { language = 'en' } = req.query;
    
    const notifications = await getLocalizedNotifications(userId, language as string);
    res.json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error in getLocalizedNotificationsHandler:', error);
    res.status(500).json({ 
      success: false, 
      message: error instanceof Error ? error.message : 'Internal server error' 
    });
  }
};
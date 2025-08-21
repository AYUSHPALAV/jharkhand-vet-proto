import { executeQuery } from '../database/connection';
import fs from 'fs';
import path from 'path';

// Language translations cache
let translationsCache: { [key: string]: any } = {};

// Load translations from JSON files
export async function loadTranslations() {
  try {
    const languages = ['en', 'hi', 'sat', 'mun'];
    
    for (const lang of languages) {
      const filePath = path.join(__dirname, '../translations', `${lang}.json`);
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        translationsCache[lang] = JSON.parse(content);
      } else {
        console.warn(`Translation file not found: ${filePath}`);
        translationsCache[lang] = {};
      }
    }
    
    console.log('✅ Translations loaded successfully');
  } catch (error) {
    console.error('❌ Error loading translations:', error);
  }
}

// Get translation for a key in specified language
export function getTranslation(key: string, language: string = 'en', params: { [key: string]: string } = {}): string {
  try {
    const translations = translationsCache[language] || translationsCache['en'] || {};
    let translation = translations[key] || key;
    
    // Replace parameters in translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{{${param}}}`, params[param]);
    });
    
    return translation;
  } catch (error) {
    console.error('Error getting translation:', error);
    return key;
  }
}

// Get system settings in specified language
export async function getSystemSettings(language: string = 'en') {
  try {
    const query = `
      SELECT key, 
             COALESCE(value_${language}, value_en) as value
      FROM system_settings
    `;
    
    const result = await executeQuery(query);
    
    const settings: { [key: string]: string } = {};
    result.rows.forEach(row => {
      settings[row.key] = row.value;
    });
    
    return settings;
  } catch (error) {
    console.error('Error fetching system settings:', error);
    return {};
  }
}

// Update user language preference
export async function updateUserLanguage(userId: string, language: string) {
  try {
    const query = `
      UPDATE users 
      SET language_preference = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING language_preference
    `;
    
    const result = await executeQuery(query, [language, userId]);
    
    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    return {
      success: true,
      language: result.rows[0].language_preference,
      message: 'Language preference updated successfully'
    };
  } catch (error) {
    console.error('Error updating user language:', error);
    throw new Error('Failed to update language preference');
  }
}

// Get user language preference
export async function getUserLanguage(userId: string): Promise<string> {
  try {
    const query = `
      SELECT language_preference
      FROM users
      WHERE id = $1
    `;
    
    const result = await executeQuery(query, [userId]);
    
    if (result.rows.length === 0) {
      return 'en'; // Default language
    }

    return result.rows[0].language_preference || 'en';
  } catch (error) {
    console.error('Error getting user language:', error);
    return 'en';
  }
}

// Get localized content for schemes
export async function getLocalizedSchemes(language: string = 'en') {
  try {
    const query = `
      SELECT id, 
             COALESCE(name_${language}, name_en) as name,
             COALESCE(description_${language}, description_en) as description,
             category, subsidy_amount,
             COALESCE(eligibility_criteria_${language}, eligibility_criteria_en) as eligibility_criteria,
             COALESCE(required_documents_${language}, required_documents_en) as required_documents,
             is_active
      FROM schemes
      WHERE is_active = true
      ORDER BY category, name_en
    `;
    
    const result = await executeQuery(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching localized schemes:', error);
    throw new Error('Failed to fetch localized schemes');
  }
}

// Get localized animal types
export async function getLocalizedAnimalTypes(language: string = 'en') {
  try {
    const query = `
      SELECT id, 
             COALESCE(name_${language}, name_en) as name,
             icon
      FROM animal_types
      ORDER BY name_en
    `;
    
    const result = await executeQuery(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching localized animal types:', error);
    throw new Error('Failed to fetch localized animal types');
  }
}

// Get localized notifications
export async function getLocalizedNotifications(userId: string, language: string = 'en') {
  try {
    const query = `
      SELECT id, 
             COALESCE(title_${language}, title_en) as title,
             COALESCE(message_${language}, message_en) as message,
             type, reference_id, is_read, created_at
      FROM notifications
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 50
    `;
    
    const result = await executeQuery(query, [userId]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching localized notifications:', error);
    throw new Error('Failed to fetch localized notifications');
  }
}

// Initialize translations on startup
loadTranslations();
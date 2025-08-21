import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string, params?: { [key: string]: string }) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'sat', name: 'Santali', native: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'mun', name: 'Mundari', native: 'ᱢᱩᱱᱰᱟᱨᱤ' }
];

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations from localStorage or default to 'en'
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred_language') || 'en';
    setCurrentLanguage(savedLanguage);
    loadTranslations(savedLanguage);
  }, []);

  const loadTranslations = async (language: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would fetch from your API
      // For now, we'll use a mock translation function
      const mockTranslations = await fetchTranslations(language);
      setTranslations(mockTranslations);
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to English if translation loading fails
      if (language !== 'en') {
        const fallbackTranslations = await fetchTranslations('en');
        setTranslations(fallbackTranslations);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred_language', language);
    await loadTranslations(language);
    
    // Update user preference in backend if user is logged in
    const userId = localStorage.getItem('user_id');
    if (userId) {
      try {
        await fetch('/api/user-language', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, language }),
        });
      } catch (error) {
        console.error('Error updating user language preference:', error);
      }
    }
  };

  const t = (key: string, params: { [key: string]: string } = {}): string => {
    let translation = translations[key] || key;
    
    // Replace parameters in translation
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{{${param}}}`, params[param]);
    });
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Mock translation function - replace with actual API call
async function fetchTranslations(language: string): Promise<{ [key: string]: string }> {
  // This would be replaced with actual API call to /api/translations
  const mockTranslations: { [key: string]: { [key: string]: string } } = {
    en: {
      'app_name': 'Jharkhand Veterinary Services',
      'welcome_message': 'Welcome to Jharkhand Veterinary Services',
      'emergency_number': 'Emergency: 1800-XXX-XXXX',
      'report_health_issues': 'Report Health Issues',
      'book_vet_visits': 'Book Vet Visits',
      'government_schemes': 'Government Schemes',
      'wildlife_reporting': 'Wildlife Reporting',
      'farmer_name': 'Farmer Name',
      'phone_number': 'Phone Number',
      'village': 'Village',
      'animal_type': 'Animal Type',
      'symptoms': 'Symptoms',
      'severity': 'Severity',
      'submit': 'Submit',
      'cancel': 'Cancel',
      'next': 'Next',
      'previous': 'Previous',
      'required_field': 'This field is required',
      'cattle': 'Cattle (Cow/Bull/Buffalo)',
      'goat': 'Goat',
      'sheep': 'Sheep',
      'poultry': 'Poultry',
      'pig': 'Pig',
      'other': 'Other'
    },
    hi: {
      'app_name': 'झारखंड पशु चिकित्सा सेवाएं',
      'welcome_message': 'झारखंड पशु चिकित्सा सेवाओं में आपका स्वागत है',
      'emergency_number': 'आपातकाल: 1800-XXX-XXXX',
      'report_health_issues': 'स्वास्थ्य समस्याओं की रिपोर्ट करें',
      'book_vet_visits': 'पशु चिकित्सक की यात्रा बुक करें',
      'government_schemes': 'सरकारी योजनाएं',
      'wildlife_reporting': 'वन्यजीव रिपोर्टिंग',
      'farmer_name': 'किसान का नाम',
      'phone_number': 'फोन नंबर',
      'village': 'गांव',
      'animal_type': 'पशु का प्रकार',
      'symptoms': 'लक्षण',
      'severity': 'गंभीरता',
      'submit': 'जमा करें',
      'cancel': 'रद्द करें',
      'next': 'अगला',
      'previous': 'पिछला',
      'required_field': 'यह फील्ड आवश्यक है',
      'cattle': 'गाय/बैल/भैंस',
      'goat': 'बकरी',
      'sheep': 'भेड़',
      'poultry': 'मुर्गी',
      'pig': 'सुअर',
      'other': 'अन्य'
    },
    sat: {
      'app_name': 'झारखंड पशु चिकित्सा सेवाएं',
      'welcome_message': 'झारखंड पशु चिकित्सा सेवाओं में आपका स्वागत है',
      'emergency_number': 'आपातकाल: 1800-XXX-XXXX',
      'report_health_issues': 'स्वास्थ्य समस्याओं की रिपोर्ट करें',
      'book_vet_visits': 'पशु चिकित्सक की यात्रा बुक करें',
      'government_schemes': 'सरकारी योजनाएं',
      'wildlife_reporting': 'वन्यजीव रिपोर्टिंग',
      'farmer_name': 'किसान का नाम',
      'phone_number': 'फोन नंबर',
      'village': 'गांव',
      'animal_type': 'पशु का प्रकार',
      'symptoms': 'लक्षण',
      'severity': 'गंभीरता',
      'submit': 'जमा करें',
      'cancel': 'रद्द करें',
      'next': 'अगला',
      'previous': 'पिछला',
      'required_field': 'यह फील्ड आवश्यक है',
      'cattle': 'गाय/बैल/भैंस',
      'goat': 'बकरी',
      'sheep': 'भेड़',
      'poultry': 'मुर्गी',
      'pig': 'सुअर',
      'other': 'अन्य'
    },
    mun: {
      'app_name': 'झारखंड पशु चिकित्सा सेवाएं',
      'welcome_message': 'झारखंड पशु चिकित्सा सेवाओं में आपका स्वागत है',
      'emergency_number': 'आपातकाल: 1800-XXX-XXXX',
      'report_health_issues': 'स्वास्थ्य समस्याओं की रिपोर्ट करें',
      'book_vet_visits': 'पशु चिकित्सक की यात्रा बुक करें',
      'government_schemes': 'सरकारी योजनाएं',
      'wildlife_reporting': 'वन्यजीव रिपोर्टिंग',
      'farmer_name': 'किसान का नाम',
      'phone_number': 'फोन नंबर',
      'village': 'गांव',
      'animal_type': 'पशु का प्रकार',
      'symptoms': 'लक्षण',
      'severity': 'गंभीरता',
      'submit': 'जमा करें',
      'cancel': 'रद्द करें',
      'next': 'अगला',
      'previous': 'पिछला',
      'required_field': 'यह फील्ड आवश्यक है',
      'cattle': 'गाय/बैल/भैंस',
      'goat': 'बकरी',
      'sheep': 'भेड़',
      'poultry': 'मुर्गी',
      'pig': 'सुअर',
      'other': 'अन्य'
    }
  };

  return mockTranslations[language] || mockTranslations['en'];
}

export { languages };
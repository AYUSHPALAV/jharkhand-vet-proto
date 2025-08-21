-- Jharkhand Veterinary Services Database Schema

-- Users table for authentication and user management
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255),
    village VARCHAR(255),
    district VARCHAR(100),
    role VARCHAR(50) DEFAULT 'farmer' CHECK (role IN ('farmer', 'doctor', 'admin', 'forest_officer')),
    language_preference VARCHAR(10) DEFAULT 'en' CHECK (language_preference IN ('en', 'hi', 'sat', 'mun')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Animal types reference table
CREATE TABLE IF NOT EXISTS animal_types (
    id VARCHAR(50) PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100),
    name_sat VARCHAR(100),
    name_mun VARCHAR(100),
    icon VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health reports table
CREATE TABLE IF NOT EXISTS health_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id VARCHAR(20) UNIQUE NOT NULL,
    farmer_id UUID REFERENCES users(id),
    farmer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    village VARCHAR(255) NOT NULL,
    animal_type VARCHAR(50) REFERENCES animal_types(id),
    animal_count INTEGER NOT NULL DEFAULT 1,
    symptoms TEXT NOT NULL,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    duration VARCHAR(50),
    location_coordinates TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'resolved', 'closed')),
    assigned_doctor_id UUID REFERENCES users(id),
    priority_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Health report photos
CREATE TABLE IF NOT EXISTS health_report_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES health_reports(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    photo_name VARCHAR(255),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Veterinary appointments table
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id VARCHAR(20) UNIQUE NOT NULL,
    farmer_id UUID REFERENCES users(id),
    farmer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    village VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    service_type VARCHAR(50) NOT NULL,
    visit_type VARCHAR(50) NOT NULL,
    animal_type VARCHAR(50) REFERENCES animal_types(id),
    animal_count INTEGER NOT NULL DEFAULT 1,
    description TEXT,
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    alternate_date DATE,
    alternate_time TIME,
    urgency VARCHAR(20) DEFAULT 'normal' CHECK (urgency IN ('normal', 'urgent', 'emergency')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    assigned_doctor_id UUID REFERENCES users(id),
    actual_date DATE,
    actual_time TIME,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Government schemes table
CREATE TABLE IF NOT EXISTS schemes (
    id VARCHAR(50) PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_hi VARCHAR(255),
    name_sat VARCHAR(255),
    name_mun VARCHAR(255),
    description_en TEXT,
    description_hi TEXT,
    description_sat TEXT,
    description_mun TEXT,
    category VARCHAR(100) NOT NULL,
    subsidy_amount DECIMAL(12,2),
    eligibility_criteria_en TEXT,
    eligibility_criteria_hi TEXT,
    eligibility_criteria_sat TEXT,
    eligibility_criteria_mun TEXT,
    required_documents_en TEXT[],
    required_documents_hi TEXT[],
    required_documents_sat TEXT[],
    required_documents_mun TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scheme applications table
CREATE TABLE IF NOT EXISTS scheme_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id VARCHAR(20) UNIQUE NOT NULL,
    scheme_id VARCHAR(50) REFERENCES schemes(id),
    applicant_id UUID REFERENCES users(id),
    applicant_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    aadhaar_number VARCHAR(12) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    village VARCHAR(255) NOT NULL,
    block VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    pincode VARCHAR(6) NOT NULL,
    project_cost DECIMAL(12,2) NOT NULL,
    requested_amount DECIMAL(12,2) NOT NULL,
    animal_type VARCHAR(50) REFERENCES animal_types(id),
    current_animals INTEGER DEFAULT 0,
    proposed_animals INTEGER NOT NULL,
    experience VARCHAR(20),
    bank_name VARCHAR(255) NOT NULL,
    account_number VARCHAR(50) NOT NULL,
    ifsc_code VARCHAR(11) NOT NULL,
    has_land BOOLEAN DEFAULT false,
    land_area DECIMAL(8,2),
    previous_scheme BOOLEAN DEFAULT false,
    category VARCHAR(20) DEFAULT 'general',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'disbursed')),
    reviewed_by UUID REFERENCES users(id),
    review_notes TEXT,
    approved_amount DECIMAL(12,2),
    disbursement_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scheme application documents
CREATE TABLE IF NOT EXISTS scheme_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES scheme_applications(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    document_url TEXT NOT NULL,
    document_name VARCHAR(255),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wildlife sightings table
CREATE TABLE IF NOT EXISTS wildlife_sightings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id VARCHAR(20) UNIQUE NOT NULL,
    reporter_id UUID REFERENCES users(id),
    reporter_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    village VARCHAR(255) NOT NULL,
    animal_type VARCHAR(50) NOT NULL,
    number_of_animals INTEGER NOT NULL DEFAULT 1,
    behavior_description TEXT NOT NULL,
    threat_level VARCHAR(20) NOT NULL CHECK (threat_level IN ('low', 'medium', 'high', 'immediate')),
    exact_location TEXT NOT NULL,
    gps_coordinates TEXT,
    sighting_date DATE NOT NULL,
    sighting_time TIME NOT NULL,
    witness_count INTEGER DEFAULT 0,
    previous_sightings BOOLEAN DEFAULT false,
    damage_reported BOOLEAN DEFAULT false,
    damage_description TEXT,
    people_at_risk INTEGER DEFAULT 0,
    evacuation_needed BOOLEAN DEFAULT false,
    immediate_help BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved', 'closed')),
    assigned_officer_id UUID REFERENCES users(id),
    response_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wildlife sighting photos
CREATE TABLE IF NOT EXISTS wildlife_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sighting_id UUID REFERENCES wildlife_sightings(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    photo_name VARCHAR(255),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctors/Veterinarians table
CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    specialization VARCHAR(255),
    experience_years INTEGER,
    qualification VARCHAR(255),
    available_districts TEXT[],
    mobile_clinic BOOLEAN DEFAULT false,
    consultation_fee DECIMAL(8,2),
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Doctor availability schedule
CREATE TABLE IF NOT EXISTS doctor_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title_en VARCHAR(255) NOT NULL,
    title_hi VARCHAR(255),
    title_sat VARCHAR(255),
    title_mun VARCHAR(255),
    message_en TEXT NOT NULL,
    message_hi TEXT,
    message_sat TEXT,
    message_mun TEXT,
    type VARCHAR(50) NOT NULL,
    reference_id UUID,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings for multilingual content
CREATE TABLE IF NOT EXISTS system_settings (
    key VARCHAR(100) PRIMARY KEY,
    value_en TEXT,
    value_hi TEXT,
    value_sat TEXT,
    value_mun TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log for tracking changes
CREATE TABLE IF NOT EXISTS audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action VARCHAR(20) NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    old_values JSONB,
    new_values JSONB,
    user_id UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_health_reports_status ON health_reports(status);
CREATE INDEX IF NOT EXISTS idx_health_reports_created_at ON health_reports(created_at);
CREATE INDEX IF NOT EXISTS idx_health_reports_farmer_phone ON health_reports(phone);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_preferred_date ON appointments(preferred_date);
CREATE INDEX IF NOT EXISTS idx_scheme_applications_status ON scheme_applications(status);
CREATE INDEX IF NOT EXISTS idx_wildlife_sightings_threat_level ON wildlife_sightings(threat_level);
CREATE INDEX IF NOT EXISTS idx_wildlife_sightings_created_at ON wildlife_sightings(created_at);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- Insert initial data
INSERT INTO animal_types (id, name_en, name_hi, name_sat, name_mun, icon) VALUES
('cattle', 'Cattle (Cow/Bull/Buffalo)', 'गाय/बैल/भैंस', 'गाय/बैल/भैंस', 'गाय/बैल/भैंस', '🐄'),
('goat', 'Goat', 'बकरी', 'बकरी', 'बकरी', '🐐'),
('sheep', 'Sheep', 'भेड़', 'भेड़', 'भेड़', '🐑'),
('poultry', 'Poultry', 'मुर्गी', 'मुर्गी', 'मुर्गी', '🐔'),
('pig', 'Pig', 'सुअर', 'सुअर', 'सुअर', '🐷'),
('other', 'Other', 'अन्य', 'अन्य', 'अन्य', '🐾')
ON CONFLICT (id) DO NOTHING;

-- Insert sample schemes
INSERT INTO schemes (id, name_en, name_hi, category, subsidy_amount, description_en, description_hi, eligibility_criteria_en, eligibility_criteria_hi, required_documents_en, required_documents_hi) VALUES
('breed-improvement', 'Breed Improvement Program', 'नस्ल सुधार कार्यक्रम', 'livestock-development', 50000.00, 
 'Financial assistance for purchasing high-quality breeding animals', 
 'उच्च गुणवत्ता वाले प्रजनन पशुओं की खरीद के लिए वित्तीय सहायता',
 'Small/Marginal farmer, Minimum 2 animals, Valid Aadhaar',
 'छोटे/सीमांत किसान, न्यूनतम 2 पशु, वैध आधार',
 ARRAY['Aadhaar Card', 'Land Records', 'Bank Details', 'Farmer Certificate'],
 ARRAY['आधार कार्ड', 'भूमि रिकॉर्ड', 'बैंक विवरण', 'किसान प्रमाणपत्र']),
('dairy-development', 'Dairy Development Scheme', 'डेयरी विकास योजना', 'livestock-development', 100000.00,
 'Support for establishing small dairy units',
 'छोटी डेयरी इकाइयों की स्थापना के लिए सहायता',
 'Rural resident, Experience in animal husbandry, Land ownership',
 'ग्रामीण निवासी, पशुपालन में अनुभव, भूमि स्वामित्व',
 ARRAY['Land Certificate', 'Aadhaar Card', 'Bank Statement', 'Project Report'],
 ARRAY['भूमि प्रमाणपत्र', 'आधार कार्ड', 'बैंक स्टेटमेंट', 'परियोजना रिपोर्ट'])
ON CONFLICT (id) DO NOTHING;

-- Insert system settings for multilingual support
INSERT INTO system_settings (key, value_en, value_hi, value_sat, value_mun) VALUES
('app_name', 'Jharkhand Veterinary Services', 'झारखंड पशु चिकित्सा सेवाएं', 'झारखंड पशु चिकित्सा सेवाएं', 'झारखंड पशु चिकित्सा सेवाएं'),
('emergency_number', '1800-XXX-XXXX', '1800-XXX-XXXX', '1800-XXX-XXXX', '1800-XXX-XXXX'),
('welcome_message', 'Welcome to Jharkhand Veterinary Services', 'झारखंड पशु चिकित्सा सेवाओं में आपका स्वागत है', 'झारखंड पशु चिकित्सा सेवाओं में आपका स्वागत है', 'झारखंड पशु चिकित्सा सेवाओं में आपका स्वागत है')
ON CONFLICT (key) DO NOTHING;
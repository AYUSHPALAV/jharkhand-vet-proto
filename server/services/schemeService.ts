import { executeQuery, executeTransaction } from '../database/connection';
import { generateReportId } from '../utils/idGenerator';
import { sendNotification } from './notificationService';

export interface SchemeApplicationData {
  // Personal Information
  applicantName: string;
  fatherName: string;
  aadhaarNumber: string;
  phone: string;
  email?: string;
  village: string;
  block: string;
  district: string;
  pincode: string;
  
  // Scheme Details
  schemeId: string;
  projectCost: number;
  requestedAmount: number;
  
  // Livestock Details
  animalType: string;
  currentAnimals: number;
  proposedAnimals: number;
  experience: string;
  
  // Bank Details
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  
  // Additional Info
  hasLand: boolean;
  landArea?: number;
  previousScheme: boolean;
  category: string;
  
  // Documents
  documents?: Array<{ type: string; url: string; name: string }>;
}

export async function createSchemeApplication(data: SchemeApplicationData) {
  const applicationId = generateReportId('SCH');
  
  try {
    const queries = [
      {
        query: `
          INSERT INTO scheme_applications (
            application_id, scheme_id, applicant_name, father_name, aadhaar_number,
            phone, email, village, block, district, pincode, project_cost,
            requested_amount, animal_type, current_animals, proposed_animals,
            experience, bank_name, account_number, ifsc_code, has_land,
            land_area, previous_scheme, category
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
          RETURNING id, application_id
        `,
        params: [
          applicationId, data.schemeId, data.applicantName, data.fatherName,
          data.aadhaarNumber, data.phone, data.email, data.village, data.block,
          data.district, data.pincode, data.projectCost, data.requestedAmount,
          data.animalType, data.currentAnimals, data.proposedAnimals,
          data.experience, data.bankName, data.accountNumber, data.ifscCode,
          data.hasLand, data.landArea, data.previousScheme, data.category
        ]
      }
    ];

    // Add document entries if provided
    if (data.documents && data.documents.length > 0) {
      data.documents.forEach(doc => {
        queries.push({
          query: `
            INSERT INTO scheme_documents (application_id, document_type, document_url, document_name)
            SELECT id, $1, $2, $3 FROM scheme_applications WHERE application_id = $4
          `,
          params: [doc.type, doc.url, doc.name, applicationId]
        });
      });
    }

    const results = await executeTransaction(queries);
    const applicationResult = results[0].rows[0];

    // Send confirmation notification
    await sendNotification({
      type: 'scheme_application_created',
      title: 'Scheme Application Submitted',
      message: `Your scheme application ${applicationId} has been submitted successfully. Processing time: 15-30 working days.`,
      phone: data.phone
    });

    return {
      success: true,
      applicationId,
      message: 'Scheme application submitted successfully'
    };
  } catch (error) {
    console.error('Error creating scheme application:', error);
    throw new Error('Failed to create scheme application');
  }
}

export async function getSchemes(language: string = 'en') {
  try {
    const query = `
      SELECT id, 
             name_${language} as name,
             description_${language} as description,
             category, subsidy_amount,
             eligibility_criteria_${language} as eligibility_criteria,
             required_documents_${language} as required_documents,
             is_active
      FROM schemes
      WHERE is_active = true
      ORDER BY category, name_${language}
    `;
    
    const result = await executeQuery(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching schemes:', error);
    throw new Error('Failed to fetch schemes');
  }
}

export async function getSchemeApplications(filters: any = {}) {
  try {
    let query = `
      SELECT sa.*, s.name_en as scheme_name, at.name_en as animal_name,
             u.name as reviewer_name
      FROM scheme_applications sa
      LEFT JOIN schemes s ON sa.scheme_id = s.id
      LEFT JOIN animal_types at ON sa.animal_type = at.id
      LEFT JOIN users u ON sa.reviewed_by = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 0;

    if (filters.status) {
      paramCount++;
      query += ` AND sa.status = $${paramCount}`;
      params.push(filters.status);
    }

    if (filters.phone) {
      paramCount++;
      query += ` AND sa.phone = $${paramCount}`;
      params.push(filters.phone);
    }

    if (filters.district) {
      paramCount++;
      query += ` AND sa.district = $${paramCount}`;
      params.push(filters.district);
    }

    if (filters.schemeId) {
      paramCount++;
      query += ` AND sa.scheme_id = $${paramCount}`;
      params.push(filters.schemeId);
    }

    query += ` ORDER BY sa.created_at DESC`;

    if (filters.limit) {
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      params.push(filters.limit);
    }

    const result = await executeQuery(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching scheme applications:', error);
    throw new Error('Failed to fetch scheme applications');
  }
}

export async function updateSchemeApplicationStatus(
  applicationId: string, 
  status: string, 
  reviewerId: string, 
  reviewNotes?: string, 
  approvedAmount?: number
) {
  try {
    const query = `
      UPDATE scheme_applications 
      SET status = $1, reviewed_by = $2, review_notes = $3, 
          approved_amount = $4, updated_at = NOW()
      WHERE application_id = $5
      RETURNING *
    `;
    
    const result = await executeQuery(query, [status, reviewerId, reviewNotes, approvedAmount, applicationId]);
    
    if (result.rows.length === 0) {
      throw new Error('Scheme application not found');
    }

    const application = result.rows[0];

    // Send notification to applicant
    let message = `Your scheme application ${applicationId} has been ${status}.`;
    if (status === 'approved' && approvedAmount) {
      message += ` Approved amount: ₹${approvedAmount.toLocaleString()}`;
    }

    await sendNotification({
      type: 'scheme_application_updated',
      title: 'Scheme Application Update',
      message,
      phone: application.phone
    });

    return {
      success: true,
      message: 'Scheme application updated successfully',
      application
    };
  } catch (error) {
    console.error('Error updating scheme application:', error);
    throw new Error('Failed to update scheme application');
  }
}

export async function trackSchemeApplication(applicationId: string, aadhaarNumber: string) {
  try {
    const query = `
      SELECT sa.*, s.name_en as scheme_name, u.name as reviewer_name
      FROM scheme_applications sa
      LEFT JOIN schemes s ON sa.scheme_id = s.id
      LEFT JOIN users u ON sa.reviewed_by = u.id
      WHERE sa.application_id = $1 AND sa.aadhaar_number = $2
    `;
    
    const result = await executeQuery(query, [applicationId, aadhaarNumber]);
    
    if (result.rows.length === 0) {
      throw new Error('Application not found or invalid credentials');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error tracking scheme application:', error);
    throw new Error('Failed to track scheme application');
  }
}
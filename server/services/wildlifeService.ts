import { executeQuery, executeTransaction } from '../database/connection';
import { generateReportId } from '../utils/idGenerator';
import { sendNotification } from './notificationService';

export interface WildlifeSightingData {
  reporterName: string;
  phone: string;
  village: string;
  animalType: string;
  numberOfAnimals: number;
  behaviorDescription: string;
  threatLevel: string;
  exactLocation: string;
  gpsCoordinates?: string;
  sightingDate: string;
  sightingTime: string;
  witnessCount: number;
  previousSightings: boolean;
  damageReported: boolean;
  damageDescription?: string;
  peopleAtRisk: number;
  evacuationNeeded: boolean;
  immediateHelp: boolean;
  photos?: string[];
}

export async function createWildlifeSighting(data: WildlifeSightingData) {
  const reportId = generateReportId('WLF');
  
  try {
    const queries = [
      {
        query: `
          INSERT INTO wildlife_sightings (
            report_id, reporter_name, phone, village, animal_type, number_of_animals,
            behavior_description, threat_level, exact_location, gps_coordinates,
            sighting_date, sighting_time, witness_count, previous_sightings,
            damage_reported, damage_description, people_at_risk, evacuation_needed,
            immediate_help
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
          RETURNING id, report_id
        `,
        params: [
          reportId, data.reporterName, data.phone, data.village, data.animalType,
          data.numberOfAnimals, data.behaviorDescription, data.threatLevel,
          data.exactLocation, data.gpsCoordinates, data.sightingDate, data.sightingTime,
          data.witnessCount, data.previousSightings, data.damageReported,
          data.damageDescription, data.peopleAtRisk, data.evacuationNeeded,
          data.immediateHelp
        ]
      }
    ];

    // Add photo entries if provided
    if (data.photos && data.photos.length > 0) {
      data.photos.forEach(photoUrl => {
        queries.push({
          query: `
            INSERT INTO wildlife_photos (sighting_id, photo_url, photo_name)
            SELECT id, $1, $2 FROM wildlife_sightings WHERE report_id = $3
          `,
          params: [photoUrl, `wildlife_${Date.now()}.jpg`, reportId]
        });
      });
    }

    const results = await executeTransaction(queries);
    const sightingResult = results[0].rows[0];

    // Auto-assign forest officer based on threat level and location
    if (data.threatLevel === 'immediate' || data.threatLevel === 'high') {
      await autoAssignForestOfficer(sightingResult.id, data.village, data.threatLevel);
    }

    // Send emergency alerts if needed
    if (data.threatLevel === 'immediate') {
      await sendEmergencyAlert(data);
    }

    // Send confirmation notification
    await sendNotification({
      type: 'wildlife_sighting_created',
      title: 'Wildlife Sighting Reported',
      message: `Your wildlife sighting report ${reportId} has been submitted. ${getResponseMessage(data.threatLevel)}`,
      phone: data.phone
    });

    return {
      success: true,
      reportId,
      message: 'Wildlife sighting reported successfully'
    };
  } catch (error) {
    console.error('Error creating wildlife sighting:', error);
    throw new Error('Failed to create wildlife sighting');
  }
}

export async function getWildlifeSightings(filters: any = {}) {
  try {
    let query = `
      SELECT ws.*, u.name as assigned_officer_name, u.phone as officer_phone
      FROM wildlife_sightings ws
      LEFT JOIN users u ON ws.assigned_officer_id = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramCount = 0;

    if (filters.threatLevel) {
      paramCount++;
      query += ` AND ws.threat_level = $${paramCount}`;
      params.push(filters.threatLevel);
    }

    if (filters.status) {
      paramCount++;
      query += ` AND ws.status = $${paramCount}`;
      params.push(filters.status);
    }

    if (filters.phone) {
      paramCount++;
      query += ` AND ws.phone = $${paramCount}`;
      params.push(filters.phone);
    }

    if (filters.village) {
      paramCount++;
      query += ` AND ws.village ILIKE $${paramCount}`;
      params.push(`%${filters.village}%`);
    }

    if (filters.animalType) {
      paramCount++;
      query += ` AND ws.animal_type = $${paramCount}`;
      params.push(filters.animalType);
    }

    // Order by threat level priority and creation time
    query += ` ORDER BY 
      CASE ws.threat_level 
        WHEN 'immediate' THEN 1 
        WHEN 'high' THEN 2 
        WHEN 'medium' THEN 3 
        ELSE 4 
      END, 
      ws.created_at DESC`;

    if (filters.limit) {
      paramCount++;
      query += ` LIMIT $${paramCount}`;
      params.push(filters.limit);
    }

    const result = await executeQuery(query, params);
    return result.rows;
  } catch (error) {
    console.error('Error fetching wildlife sightings:', error);
    throw new Error('Failed to fetch wildlife sightings');
  }
}

export async function updateWildlifeSightingStatus(
  reportId: string, 
  status: string, 
  officerId?: string, 
  responseNotes?: string
) {
  try {
    const query = `
      UPDATE wildlife_sightings 
      SET status = $1, assigned_officer_id = $2, response_notes = $3, updated_at = NOW()
      WHERE report_id = $4
      RETURNING *
    `;
    
    const result = await executeQuery(query, [status, officerId, responseNotes, reportId]);
    
    if (result.rows.length === 0) {
      throw new Error('Wildlife sighting not found');
    }

    const sighting = result.rows[0];

    // Send notification to reporter
    await sendNotification({
      type: 'wildlife_sighting_updated',
      title: 'Wildlife Report Update',
      message: `Your wildlife report ${reportId} status has been updated to ${status}.`,
      phone: sighting.phone
    });

    return {
      success: true,
      message: 'Wildlife sighting updated successfully',
      sighting
    };
  } catch (error) {
    console.error('Error updating wildlife sighting:', error);
    throw new Error('Failed to update wildlife sighting');
  }
}

export async function getWildlifeStatistics(filters: any = {}) {
  try {
    const queries = [
      // Total sightings by threat level
      `SELECT threat_level, COUNT(*) as count 
       FROM wildlife_sightings 
       WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
       GROUP BY threat_level`,
      
      // Sightings by animal type
      `SELECT animal_type, COUNT(*) as count 
       FROM wildlife_sightings 
       WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
       GROUP BY animal_type 
       ORDER BY count DESC`,
      
      // Recent high-priority sightings
      `SELECT * FROM wildlife_sightings 
       WHERE threat_level IN ('immediate', 'high') 
       AND created_at >= CURRENT_DATE - INTERVAL '7 days'
       ORDER BY created_at DESC 
       LIMIT 10`
    ];

    const results = await Promise.all(
      queries.map(query => executeQuery(query))
    );

    return {
      threatLevelStats: results[0].rows,
      animalTypeStats: results[1].rows,
      recentHighPriority: results[2].rows
    };
  } catch (error) {
    console.error('Error fetching wildlife statistics:', error);
    throw new Error('Failed to fetch wildlife statistics');
  }
}

async function autoAssignForestOfficer(sightingId: string, village: string, threatLevel: string) {
  try {
    // Find available forest officers in the area
    const query = `
      SELECT u.id, u.name, u.phone
      FROM users u
      WHERE u.role = 'forest_officer'
      AND u.village = $1
      ORDER BY u.created_at
      LIMIT 1
    `;
    
    const result = await executeQuery(query, [village]);
    
    if (result.rows.length > 0) {
      const officer = result.rows[0];
      
      await executeQuery(
        'UPDATE wildlife_sightings SET assigned_officer_id = $1, status = $2 WHERE id = $3',
        [officer.id, 'investigating', sightingId]
      );

      // Notify forest officer
      await sendNotification({
        type: 'wildlife_sighting_assigned',
        title: 'Wildlife Sighting Assigned',
        message: `A ${threatLevel} priority wildlife sighting has been assigned to you in ${village}.`,
        userId: officer.id
      });
    }
  } catch (error) {
    console.error('Error auto-assigning forest officer:', error);
  }
}

async function sendEmergencyAlert(data: WildlifeSightingData) {
  try {
    // Send alert to all forest officers in the district
    const query = `
      SELECT u.id, u.name, u.phone
      FROM users u
      WHERE u.role = 'forest_officer'
    `;
    
    const result = await executeQuery(query);
    
    for (const officer of result.rows) {
      await sendNotification({
        type: 'emergency_wildlife_alert',
        title: 'EMERGENCY: Wildlife Threat',
        message: `IMMEDIATE THREAT: ${data.animalType} sighted in ${data.village}. ${data.numberOfAnimals} animals. Location: ${data.exactLocation}`,
        userId: officer.id
      });
    }
  } catch (error) {
    console.error('Error sending emergency alert:', error);
  }
}

function getResponseMessage(threatLevel: string): string {
  switch (threatLevel) {
    case 'immediate':
      return 'Emergency response team has been notified and is en route.';
    case 'high':
      return 'Response team will be dispatched within 2 hours.';
    case 'medium':
      return 'Forest team will monitor the area.';
    default:
      return 'Your report has been logged for wildlife tracking.';
  }
}
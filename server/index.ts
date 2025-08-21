import "dotenv/config";
import express from "express";
import cors from "cors";
import { testConnection, initializeDatabase } from "./database/connection";
import { handleDemo } from "./routes/demo";
import { createHealthReportHandler, getHealthReportsHandler, updateHealthReportHandler } from "./routes/healthReports";
import { createAppointmentHandler, getAppointmentsHandler, updateAppointmentHandler, getDoctorAvailabilityHandler } from "./routes/appointments";
import { createSchemeApplicationHandler, getSchemesHandler, getSchemeApplicationsHandler, updateSchemeApplicationHandler, trackSchemeApplicationHandler } from "./routes/schemes";
import { createWildlifeSightingHandler, getWildlifeSightingsHandler, updateWildlifeSightingHandler, getWildlifeStatisticsHandler } from "./routes/wildlife";
import { getTranslationsHandler, getSystemSettingsHandler, updateUserLanguageHandler, getUserLanguageHandler, getLocalizedSchemesHandler, getLocalizedAnimalTypesHandler, getLocalizedNotificationsHandler } from "./routes/language";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Initialize database connection
  testConnection().then(connected => {
    if (connected) {
      initializeDatabase();
    }
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Health Reports API
  app.post("/api/health-reports", createHealthReportHandler);
  app.get("/api/health-reports", getHealthReportsHandler);
  app.put("/api/health-reports/:reportId", updateHealthReportHandler);

  // Appointments API
  app.post("/api/appointments", createAppointmentHandler);
  app.get("/api/appointments", getAppointmentsHandler);
  app.put("/api/appointments/:bookingId", updateAppointmentHandler);
  app.get("/api/doctors/:doctorId/availability", getDoctorAvailabilityHandler);

  // Schemes API
  app.post("/api/scheme-applications", createSchemeApplicationHandler);
  app.get("/api/schemes", getSchemesHandler);
  app.get("/api/scheme-applications", getSchemeApplicationsHandler);
  app.put("/api/scheme-applications/:applicationId", updateSchemeApplicationHandler);
  app.post("/api/scheme-applications/track", trackSchemeApplicationHandler);

  // Wildlife API
  app.post("/api/wildlife-sightings", createWildlifeSightingHandler);
  app.get("/api/wildlife-sightings", getWildlifeSightingsHandler);
  app.put("/api/wildlife-sightings/:reportId", updateWildlifeSightingHandler);
  app.get("/api/wildlife-statistics", getWildlifeStatisticsHandler);

  // Language & Localization API
  app.get("/api/translations", getTranslationsHandler);
  app.get("/api/system-settings", getSystemSettingsHandler);
  app.put("/api/user-language", updateUserLanguageHandler);
  app.get("/api/users/:userId/language", getUserLanguageHandler);
  app.get("/api/localized/schemes", getLocalizedSchemesHandler);
  app.get("/api/localized/animal-types", getLocalizedAnimalTypesHandler);
  app.get("/api/users/:userId/notifications", getLocalizedNotificationsHandler);

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      version: "1.0.0"
    });
  });
  return app;
}

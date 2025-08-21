// Utility functions for generating unique IDs

export function generateReportId(prefix: string): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}${random}`;
}

export function generateUserId(): string {
  return `USER-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function generateSessionId(): string {
  return `SESSION-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
// Event-related types
export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Non-Technical';
  date: string; // Format: "YYYY-MM-DD" or "YYYY-MM-DD to YYYY-MM-DD"
  time: string; // Format: "HH:MM AM/PM - HH:MM AM/PM"
  duration?: string;
  location?: string;
  speaker?: string;
  speakers?: string; // Alternative field name used in some components
  prerequisites?: string;
  registrationLink?: string;
  posterUrl?: string;
}

// Member-related types
export interface Member {
  name: string;
  role: string;
  photo: string;
  quote: string;
  linkedin: string;
  instagram: string;
}

export interface TeamStructure {
  core: Member[];
  technical: Member[];
  design: Member[];
  events: Member[];
  marketing: Member[];
  social: Member[];
  website: Member[];
}

// Form-related types
export interface EventFormData {
  title: string;
  description: string;
  category: 'Technical' | 'Non-Technical';
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  speakers: string;
  prerequisites: string;
  registrationLink: string;
  posterUrl: string;
  apiKey: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  message: string;
  success: boolean;
}

export interface AdminVerificationResponse {
  message: string;
  authenticated: boolean;
}

// Component prop types
export interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

export interface MemberCardProps extends Member {}

// Statistics and mission types
export interface Statistic {
  value: string;
  label: string;
}

export interface Mission {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Navigation and UI types
export interface NavItem {
  href: string;
  label: string;
  external?: boolean;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Error types
export interface ErrorInfo {
  componentStack: string;
  errorBoundary: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Utility types
export type EventCategory = Event['category'];
export type TeamName = keyof TeamStructure;

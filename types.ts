export enum AppView {
  DASHBOARD = 'DASHBOARD',
  BOOKING = 'BOOKING',
  DIAGNOSIS = 'DIAGNOSIS',
  FEEDBACK = 'FEEDBACK',
  SCRIPT = 'SCRIPT',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AnalysisResult {
  issue: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  estimatedCost: string;
  timeRequired: string;
  recommendation: string;
}

export interface Review {
  id: number;
  customer: string;
  rating: number;
  content: string;
  date: string;
}

export interface FeedbackAnalysis {
  sentiment: string;
  keyTopics: string[];
  summary: string;
  actionItems: string[];
}
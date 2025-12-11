import { LucideIcon } from 'lucide-react';

export interface ActionItem {
  id: string;
  text: string;
  detail?: string;
  important?: boolean;
}

export interface Reference {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: string;
  url?: string;
}

export type ChartType = 'sleep' | 'diet' | 'dopamine' | 'focus' | 'longevity';

export interface AssessmentQuestion {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect';
  options?: string[]; // For select/multiselect
  placeholder?: string;
}

export interface SectionContent {
  title: string;
  id: string;
  icon: LucideIcon;
  summary: string;
  science: string;
  chartType: ChartType;
  actions: ActionItem[];
  warnings?: string[];
  references: Reference[];
  assessmentQuestions: AssessmentQuestion[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface SavedReport {
  id: string;
  sectionId: string;
  sectionTitle: string;
  date: string;
  content: string; // HTML content
}

export interface DailyTask {
  id: string;
  text: string;
  time: string;
  category: 'sleep' | 'diet' | 'focus' | 'movement';
  completed: boolean;
}
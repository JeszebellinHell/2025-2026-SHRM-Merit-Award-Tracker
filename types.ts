export interface Requirement {
  id: string;
  title: string;
  description: string;
}

export interface RequirementCategory {
  title: string;
  requirements: Requirement[];
}

export interface AwardSection {
  title: string;
  description: string;
  categories: RequirementCategory[];
  isPrerequisite: boolean;
}

export interface AwardLevel {
  name: string;
  minActivities: number;
  maxActivities?: number;
  className: string;
}

export interface ChapterEvent {
  id: string;
  title: string;
  date: string; // Using string for simplicity, e.g., 'YYYY-MM-DD'
  attendees: string[];
  pdcs: number;
}

export interface ChapterMeeting {
  id: string;
  title: string;
  date: string;
  attendees: string[];
  notes: string;
}
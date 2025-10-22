
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

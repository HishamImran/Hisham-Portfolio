export interface Project {
  id: string;
  title: string;
  oneLiner: string;
  role: string;
  featured: boolean;
  category: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
  metrics: string;
  problem: string;
  approach: string;
  result: string;
  architectureHighlights: string[];
}

export interface Stat {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  type: 'Education' | 'Research' | 'Experience' | 'Achievement';
  description: string;
  highlights: string[];
  badge?: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: string; // e.g. 'Advanced', 'Proficient'
    iconName?: string;
    projectIds: string[]; // connects skills to projects for hover highlighting!
  }[];
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  university: string;
  degree: string;
  roles: string[];
  oneSentenceBio: string;
  fullBio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  stats: Stat[];
}

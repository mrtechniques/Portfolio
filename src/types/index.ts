export type PhotoCategory = 'All' | 'Weddings' | 'Events' | 'Automotive' | 'Portraits' | 'Editorial';

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  category: 'Weddings' | 'Events' | 'Automotive' | 'Portraits' | 'Editorial';
  width: number;
  height: number;
  location?: string;
  year?: string;
  camera?: string;
  lens?: string;
  focalLength?: string;
  aperture?: string;
  iso?: string;
  shutterSpeed?: string;
  caption?: string;
  blurDataURL?: string;
}

export type VideoCategory = 'All' | 'Weddings' | 'Events' | 'Automotive' | 'Edits';

export interface VideoItem {
  id: string;
  title: string;
  category: 'Weddings' | 'Events' | 'Automotive' | 'Edits';
  reelUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  duration?: string;
  year?: string;
  location?: string;
  client?: string;
  description?: string;
  isFeatured?: boolean;
}

export type ProjectStatus = 'PRODUCTION' | 'RESEARCH' | 'PROTOTYPE' | 'OPEN-SOURCE';

export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  pitch: string;
  description: string;
  tags: string[];
  category: 'AI/ML & Vision' | 'Full Stack Web' | 'Creative Automation' | 'Developer Tools';
  screenshots: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: ProjectStatus;
  stars?: number;
  language?: string;
  updatedYear?: string;
  metrics?: { label: string; value: string }[];
}

export interface RadarAxis {
  label: string;
  value: number;
  fullMark: number;
  key: string;
}

export interface SkillItem {
  name: string;
  category: string;
  icon: string;
  level: number;
  radarKey: string;
  experience: string;
  tags: string[];
}

export interface SkillsData {
  radarAxes: RadarAxis[];
  categories: string[];
  skills: SkillItem[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'creative' | 'software';
  tagline: string;
  description: string;
  deliverables: string[];
  turnaround: string;
  accent: 'gold' | 'red' | 'blue';
  popular?: boolean;
}

export interface GearItem {
  category: string;
  description: string;
  items: {
    name: string;
    details: string;
    badge: string;
  }[];
}

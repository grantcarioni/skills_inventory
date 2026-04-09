export interface Skill {
  skill: string;
  category: string;
  experience: string;
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  years: string;
}

export interface Language {
  language: string;
  confidence: string;
}

export interface Employee {
  name: string;
  title: string;
  location: string;
  skills: Skill[];
  education: Education[];
  languages: Language[];
  totalExperience: string;
  linkedInUrl: string;
}

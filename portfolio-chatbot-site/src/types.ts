export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  client?: string;
  period: string;
  location?: string;
  isCurrent?: boolean;
  isLead?: boolean;
  bulletPoints: string[];
  tags: string[];
  domain?: string;
}

export interface SkillItem {
  name: string;
  proficiency?: number; // percentage out of 100 for high-level core skills
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  description: string;
  skills: SkillItem[];
  tags?: string[];
}

export interface EducationItem {
  type: "formal" | "certification";
  degreeOrName: string;
  institution: string;
  location?: string;
  period?: string;
  description?: string;
  bullets?: string[];
  tags?: string[];
}

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
  mode?: "simplify" | "dita" | "apidoc";
  improvedText?: string;
  explanation?: string;
  isLoading?: boolean;
}

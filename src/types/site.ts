export interface NavigationItem {
  label: string;
  href: string;
}

export interface Capability {
  id: 'metacognitive-ai' | 'custom-runtimes' | 'digital-products' | 'computers-integrations';
  title: string;
  description: string;
  tags: readonly string[];
}

export interface ProofMetric {
  value: string;
  label: string;
  qualifier: string;
}

export interface ProcessStep {
  id: 'discover' | 'architect' | 'build' | 'deploy';
  title: string;
  description: string;
}

export interface ProfileLink {
  label: 'LinkedIn' | 'GitHub';
  href: string;
}

export interface FounderProfile {
  id: 'noah-lee';
  name: 'Noah Lee';
  role: 'Founder & Principal Engineer';
  initials: 'NL';
  lead: string;
  biography: string;
  credentials: readonly string[];
  links: readonly ProfileLink[];
}

export interface CoFounder {
  name: 'Mitchell Ray' | 'Larone Williamson';
  role: 'Co-founder';
  initials: 'MR' | 'LW';
}

export type SelectedSystemId =
  | 'omega-browser-agent'
  | 'devcard-ai'
  | 'omega-runtime'
  | 'omega-memory-mcp'
  | 'nanoagent';

export interface SelectedSystem {
  id: SelectedSystemId;
  title: string;
  tier: 'featured' | 'supporting';
  status: string;
  summary: string;
  evidence: readonly string[];
  href: string;
  linkLabel: 'View source' | 'Open live app';
}

export type ProjectCategory =
  | 'Metacognitive or agentic AI'
  | 'Custom AI runtime, local AI, or edge AI'
  | 'Website, web application, or Android application'
  | 'Custom computer, Linux, or hardware integration'
  | 'Unsure or another type of project';

export interface ProjectInquiryPayload {
  name: string;
  email: string;
  company: string;
  category: ProjectCategory | '';
  description: string;
  'bot-field': string;
}

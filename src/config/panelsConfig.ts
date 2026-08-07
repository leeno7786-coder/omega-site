export interface PanelItem {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  badge?: string;
  subSections: Array<{
    id: string;
    label: string;
  }>;
}

export const PANELS: PanelItem[] = [
  {
    id: 'overview',
    title: 'Overview & Mission',
    shortTitle: 'Overview',
    description: 'Autonomous AI Agent Engine, local-first cognition & core metrics',
    iconName: 'Sparkles',
    badge: 'Live',
    subSections: [
      { id: 'hero', label: 'Hero' },
      { id: 'trustbar', label: 'Metrics' },
      { id: 'demo', label: 'Autonomous Demo' },
    ],
  },
  {
    id: 'products',
    title: 'Products & Architecture',
    shortTitle: 'Products',
    description: 'Omega 3.0 Flagship, 13-Model Cascade, Episodic Memory Graph & Agent Layer',
    iconName: 'Cpu',
    badge: '13 Models',
    subSections: [
      { id: 'showcase', label: 'Omega 3.0' },
      { id: 'ecosystem', label: 'Ecosystem Suite' },
      { id: 'architecture', label: 'Architecture' },
      { id: 'agent-layer', label: 'Agent Layer' },
      { id: 'memory-graph', label: 'Memory Graph' },
      { id: 'image-gen', label: 'Image Gen' },
    ],
  },
  {
    id: 'benchmarks',
    title: 'Benchmarks & Performance',
    shortTitle: 'Benchmarks',
    description: 'LongMemEval-S 86.4% score, latency analysis & hardware efficiency specs',
    iconName: 'BarChart3',
    badge: '86.4%',
    subSections: [
      { id: 'benchmarks-chart', label: 'Scores' },
      { id: 'runtime', label: 'Model Specs' },
    ],
  },
  {
    id: 'solutions',
    title: 'Solutions & Services',
    shortTitle: 'Solutions',
    description: 'Custom AI Agent buildouts, hardware portability & deployment process',
    iconName: 'Layers',
    subSections: [
      { id: 'services', label: 'Services' },
      { id: 'portability', label: 'Portability' },
      { id: 'process', label: 'Process' },
    ],
  },
  {
    id: 'company',
    title: 'Company & Contact',
    shortTitle: 'Company',
    description: 'About Omega AI LLC, frequently asked questions & direct consultation',
    iconName: 'Building2',
    subSections: [
      { id: 'about', label: 'About' },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact' },
    ],
  },
];

export const DEFAULT_PANEL_ID = 'overview';

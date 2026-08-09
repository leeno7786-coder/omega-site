import type {
  Capability,
  Founder,
  NavigationItem,
  ProcessStep,
  ProjectCategory,
  ProofMetric,
} from '../types/site';

export const CONTACT_EMAILS = [
  'noahlee@omega2ai.com',
  'mitchellray@omega2ai.com',
] as const;

export const SITE_NAV = [
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Omega 3.0', href: '/omega-3/' },
  { label: 'How we work', href: '/#process' },
  { label: 'Company', href: '/#company' },
] as const satisfies readonly NavigationItem[];

export const HERO_CONTENT = {
  eyebrow: 'Metacognitive systems engineering',
  headline: 'We build AI systems that think beyond the prompt.',
  description:
    'Omega AI engineers autonomous intelligence—and the custom runtimes, applications, Linux systems, and hardware it needs to operate in the real world.',
  primaryAction: 'Start a project',
  secondaryAction: 'See Omega 3.0 proof',
} as const;

export const CAPABILITIES = [
  {
    id: 'metacognitive-ai',
    title: 'Metacognitive & agentic AI',
    description:
      'Autonomous systems that remember, evaluate their own work, coordinate tools, and act across long-running goals.',
    tags: [
      'Autonomous cognitive systems',
      'Agent orchestration',
      'Persistent memory',
      'Self-evaluation and metacognition',
      'Multi-agent workflows',
      'AI automation',
    ],
  },
  {
    id: 'custom-runtimes',
    title: 'Custom AI runtimes',
    description:
      'Private, hardware-aware runtime systems designed around the models, latency, data, and deployment constraints that matter.',
    tags: [
      'Local and private inference',
      'Edge AI',
      'Linux deployment and support',
      'Model orchestration',
      'Hardware-aware optimization',
      'GPU and NPU integration',
    ],
  },
  {
    id: 'digital-products',
    title: 'Applications & digital products',
    description:
      'Professional interfaces and dependable software that turn advanced technology into something people can actually use.',
    tags: [
      'Professional websites',
      'Web applications and platforms',
      'Android applications',
      'Dashboards and operator interfaces',
      'APIs and integrations',
      'Workflow automation',
    ],
  },
  {
    id: 'computers-integrations',
    title: 'Custom computers & integrations',
    description:
      'Purpose-built machines and complete deployments engineered from operating system through application behavior.',
    tags: [
      'Purpose-built computers',
      'Linux system configuration',
      'Hardware integration',
      'GPU/NPU-focused systems',
      'Complete deployment and system tuning',
      'Software-to-hardware integration',
    ],
  },
] as const satisfies readonly Capability[];

export const CAPABILITY_FLOW = [
  'Intelligence',
  'Runtime',
  'Application',
  'Machine',
] as const;

export const HOME_PROOF_METRICS = [
  {
    value: '13',
    label: 'Specialized models orchestrated',
    qualifier: 'Validated in the Omega 3.0 architecture',
  },
  {
    value: '8 GB',
    label: 'Validated runtime footprint',
    qualifier: 'Measured for the local Omega 3.0 runtime',
  },
  {
    value: '0',
    label: 'Required cloud calls',
    qualifier: 'For the validated local architecture',
  },
  {
    value: 'Linux',
    label: 'Support available',
    qualifier: 'For custom systems and deployments',
  },
] as const satisfies readonly ProofMetric[];

export const PROCESS_STEPS = [
  {
    id: 'discover',
    title: 'Discover',
    description: 'Define goals, constraints, users, data, environment, hardware, and success criteria.',
  },
  {
    id: 'architect',
    title: 'Architect',
    description: 'Design intelligence, runtime, application, infrastructure, and deployment as one system.',
  },
  {
    id: 'build',
    title: 'Build',
    description: 'Deliver focused milestones, working demonstrations, testing, and transparent progress.',
  },
  {
    id: 'deploy',
    title: 'Deploy',
    description: 'Launch, document, train, optimize, and support the finished system.',
  },
] as const satisfies readonly ProcessStep[];

export const FOUNDERS = [
  { name: 'Noah Lee', role: 'Co-founder', initials: 'NL' },
  { name: 'Mitchell Ray', role: 'Co-founder', initials: 'MR' },
  { name: 'Larone Williamson', role: 'Co-founder', initials: 'LW' },
] as const satisfies readonly Founder[];

export const PROJECT_CATEGORIES = [
  'Metacognitive or agentic AI',
  'Custom AI runtime, local AI, or edge AI',
  'Website, web application, or Android application',
  'Custom computer, Linux, or hardware integration',
  'Unsure or another type of project',
] as const satisfies readonly ProjectCategory[];

export const OMEGA_PROOF_CONTENT = {
  heading: 'One system. Multiple disciplines proven.',
  statement:
    'Omega 3.0 is not the only thing the company sells. It is the working system that demonstrates our ability to solve cognition, runtime, interface, operating-system, and hardware constraints together.',
  headlineBenchmark: '86.4% headline LongMemEval-S (mistral-large)',
  localBenchmark: 'Up to 78.0% with a local 4B model',
} as const;

export const COMPANY_CONTENT = {
  eyebrow: 'Research-minded. Deployment-ready.',
  heading: 'The hard problems rarely fit inside one discipline.',
  description:
    'Omega AI combines autonomous AI research with software, Linux, hardware, and product development for work that does not fit an off-the-shelf product.',
} as const;

import type {
  Capability,
  CoFounder,
  FounderProfile,
  NavigationItem,
  ProcessStep,
  ProjectCategory,
  ProofMetric,
  SelectedSystem,
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
  {
    id: 'autonomous-systems',
    title: 'Autonomous Systems & Drone Robotics',
    description:
      'Planning, coordination, and decision systems for drones and robotic fleets operating across changing missions, constrained hardware, and unreliable communications.',
    tags: [
      'Autonomous mission planning',
      'Dynamic replanning',
      'Swarm and fleet coordination',
      'Degraded-network operation',
      'Simulation and digital twins',
      'Edge AI integration',
    ],
    href: '/autonomous-systems/',
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

export const FOUNDER_PROFILE = {
  id: 'noah-lee',
  name: 'Noah Lee',
  role: 'Founder & Principal Engineer',
  initials: 'NL',
  lead: 'Clients work directly with Noah from technical direction and architecture through implementation, testing, deployment, and support.',
  biography:
    "Noah architects and builds private, local-first AI systems across cognitive control, persistent memory, model orchestration, APIs, product interfaces, Linux deployment, and hardware-aware inference. He created Omega 2.5 and Omega 3.0 and leads the hands-on engineering behind Omega's runtime, agent, memory, browser automation, and full-stack product work.",
  credentials: [
    'End-to-end engineering: intelligence → runtime → application → machine',
    'Creator of Omega 2.5 and Omega 3.0',
    'Co-inventor and co-filer of U.S. Provisional Patent Application No. 63/965,475',
    "Bachelor of Science in Cybersecurity in progress; President's List honoree in 2026",
  ],
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/noah-lee-omegaai/' },
    { label: 'GitHub', href: 'https://github.com/leeno7786-coder' },
  ],
} as const satisfies FounderProfile;

export const COFOUNDERS = [
  { name: 'Mitchell Ray', role: 'Co-founder', initials: 'MR' },
  { name: 'Larone Williamson', role: 'Co-founder', initials: 'LW' },
] as const satisfies readonly CoFounder[];

export const SELECTED_SYSTEMS = [
  {
    id: 'omega-browser-agent',
    title: 'Omega Browser Agent',
    tier: 'featured',
    status: 'Working build · Edge MV3',
    summary:
      'A chat-style autonomous browser agent built to operate with a local 4B model. It plans tasks, navigates, clicks, types, reads page structure and screenshots, and can expand to cloud models when greater capability is needed.',
    evidence: [
      'Local-first 4B inference',
      'Optional OpenRouter cloud models',
      'Autonomous planning and execution',
      'Navigation, interaction, extraction, screenshots, and OCR',
      'Isolated multi-tab workspace',
      'Action confirmation controls',
    ],
    action: 'inquiry',
    href: '#project-inquiry',
    linkLabel: 'Request a demo',
  },
  {
    id: 'devcard-ai',
    title: 'DevCard AI',
    tier: 'featured',
    status: 'Live SaaS product',
    summary:
      'A full-stack AI application that turns GitHub profiles and résumés into customizable developer portfolios, then exports the result as portable web code and profile assets.',
    evidence: [
      'Live Vercel deployment',
      'Next.js application',
      'Clerk authentication',
      'Stripe subscription and webhook flow',
      'AI-assisted profile generation',
      'Ten visual themes',
      'HTML, README, and React/Next.js exports',
    ],
    action: 'external',
    href: 'https://www.omega-dev.uk/',
    linkLabel: 'Open live app',
  },
  {
    id: 'omega-runtime',
    title: 'Omega Runtime',
    tier: 'supporting',
    status: 'Portable AI infrastructure',
    summary:
      'Hardware-aware inference infrastructure spanning model discovery, streaming APIs, process supervision, packaged runtimes, and CPU/GPU/NPU execution paths.',
    evidence: ['Python', 'FastAPI', 'PowerShell', 'ONNX and GGUF'],
    action: 'external',
    href: 'https://github.com/leeno7786-coder/Omega-NPU-Runtime',
    linkLabel: 'View source',
  },
  {
    id: 'omega-memory-mcp',
    title: 'Omega Memory MCP',
    tier: 'supporting',
    status: 'Private memory infrastructure',
    summary:
      'Cross-platform persistent-memory infrastructure with typed MCP access, verified recall, graph projections, embeddings, packaging, and acceptance tests.',
    evidence: ['Python', 'MCP', 'ONNX', 'Verified recall'],
    action: 'inquiry',
    href: '#project-inquiry',
    linkLabel: 'Discuss this system',
  },
  {
    id: 'nanoagent',
    title: 'NanoAgent',
    tier: 'supporting',
    status: 'Local-model coding agent',
    summary:
      'A local-model coding agent with a chat/TUI workflow, MCP connectivity, concurrent sub-agents, workspace sandboxing, validation, and npm packaging.',
    evidence: ['TypeScript', 'React TUI', 'Bun', 'MCP'],
    action: 'external',
    href: 'https://github.com/leeno7786-coder/nanoagent',
    linkLabel: 'View source',
  },
] as const satisfies readonly SelectedSystem[];

export const PROJECT_CATEGORIES = [
  'Metacognitive or agentic AI',
  'Custom AI runtime, local AI, or edge AI',
  'Website, web application, or Android application',
  'Custom computer, Linux, or hardware integration',
  'Autonomous systems and drone robotics',
  'Unsure or another type of project',
] as const satisfies readonly ProjectCategory[];

export const AUTONOMOUS_SYSTEMS_PAGE = {
  path: '/autonomous-systems/',
  title: 'Autonomous Systems & Drone Robotics',
  copy:
    'Planning, coordination, and decision systems for drones and robotic fleets operating across changing missions, constrained hardware, and unreliable communications.',
  disciplines: [
    {
      title: 'Autonomous mission planning',
      body: 'Generate and sequence multi-agent mission plans as objectives, constraints, and available assets change.',
    },
    {
      title: 'Dynamic replanning',
      body: 'Recalculate tasking when the environment, the fleet, or the communications picture shifts mid-mission.',
    },
    {
      title: 'Swarm and fleet coordination',
      body: 'Keep many agents aligned on shared intent without depending on a single control node.',
    },
    {
      title: 'Degraded-network operation',
      body: 'Preserve useful planning and coordination when links are delayed, lossy, or unavailable.',
    },
    {
      title: 'Simulation and digital twins',
      body: 'Exercise plans against modeled conditions before and during operations.',
    },
    {
      title: 'Edge AI integration',
      body: 'Run decision systems on constrained, local hardware rather than distant cloud services.',
    },
  ],
  sbirStatus: 'Proposal submitted',
  sbirYear: '2026',
  sbirStatement:
    'In 2026, Omega AI LLC submitted an SBIR proposal addressing autonomous planning for a 200-agent UAS swarm operating under degraded conditions.',
  sbirNote:
    'This page is limited to cleared, nonproprietary information. It describes a submitted SBIR proposal and does not represent a government award or official endorsement.',
} as const;

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

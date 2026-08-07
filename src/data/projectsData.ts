export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Core & Cognition' | 'Developer Tools' | 'MCP & Memory' | 'Hardware & NPU';
  badge: string;
  description: string;
  techStack: string[];
  metrics?: Array<{ label: string; value: string }>;
  installCommand?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'omega-3',
    title: 'Omega 3.0',
    subtitle: 'Flagship Autonomous Cognitive Architecture',
    category: 'Core & Cognition',
    badge: 'Flagship',
    description:
      'Fully portable, local-first autonomous cognitive runtime. Orchestrates 13 specialized models within an 8 GB RAM footprint with zero cloud calls, deterministic 8-layer cognition cascade, and metacognitive self-reflection loops.',
    techStack: ['Python 3.13', 'FastAPI', 'PyTorch', 'ONNX', 'Three.js', 'GSAP'],
    metrics: [
      { label: 'LongMemEval-S', value: '86.4%' },
      { label: 'RAM Footprint', value: '8 GB' },
      { label: 'Model Cascade', value: '13 Models' },
      { label: 'Cloud Latency', value: '0 ms' },
    ],
    githubUrl: 'https://github.com/leeno7786-coder/Omega3.0',
    featured: true,
  },
  {
    id: 'nanoagent',
    title: 'NanoAgent',
    subtitle: 'Tiny-Model First Autonomous CLI/TUI Coding Agent',
    category: 'Developer Tools',
    badge: 'NPM Package',
    description:
      'Ultra-lightweight, scalable CLI/TUI coding agent engineered specifically to empower 2B–8B local models (Qwen 3.5, Phi-3, Llama 3) while scaling to cloud APIs. Features a full OpenTUI terminal UI, concurrent sub-agent exploration swarms, native MCP integration, and sandboxed security.',
    techStack: ['TypeScript', 'Node.js', 'OpenTUI', 'MCP Protocol', 'Commander'],
    installCommand: 'npx @omega3_0/nanoagent',
    githubUrl: 'https://github.com/leeno7786-coder/nanoagent',
    featured: true,
  },
  {
    id: 'omega-memory-mcp',
    title: 'Omega Memory MCP',
    subtitle: 'Universal Local-First Agent Memory Server',
    category: 'MCP & Memory',
    badge: 'MCP Standard',
    description:
      'Standalone Model Context Protocol (MCP) memory server implementing Dewey taxonomy filesystem layout, graph projections, Decoupled Memory Engine (DME), and verified recall. Features automated single-command scaffolding for Cursor, Claude Desktop, Antigravity, and VS Code.',
    techStack: ['Python 3.12+', 'MCP Protocol', 'Dewey Classification', 'Harrier Embeddings', 'spaCy'],
    installCommand: 'uvx --from "omega-memory-mcp[embeddings] @ git+https://github.com/leeno7786-coder/omega-memory-mcp.git" omega-memory setup --setup-models',
    githubUrl: 'https://github.com/leeno7786-coder/omega-memory-mcp',
    featured: true,
  },
  {
    id: 'npu-runtime',
    title: 'AMD Ryzen AI & NPU Runtime',
    subtitle: 'On-Device NPU Acceleration & Linux Enablement',
    category: 'Hardware & NPU',
    badge: 'On-Device NPU',
    description:
      'Portable runtime execution engine and Linux enablement layer targeting AMD Ryzen AI Neural Processing Units (NPUs) and XDNA architecture. Enables zero-latency local matrix multiplication and model offloading on modern laptop APUs.',
    techStack: ['C++', 'AMD XDNA / NPU SDK', 'Python', 'Linux Driver APIs'],
    githubUrl: 'https://github.com/leeno7786-coder/Omega-NPU-Runtime',
    featured: false,
  },
  {
    id: 'devcard-ai',
    title: 'DevCard AI',
    subtitle: 'AI Developer Portfolio & Identity Generator',
    category: 'Developer Tools',
    badge: 'SaaS Platform',
    description:
      'Modern web platform that generates interactive developer cards, technical portfolio showcases, and verified skill badges powered by Next.js 16, Clerk authentication, and Stripe payments.',
    techStack: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Clerk Auth', 'Stripe API'],
    githubUrl: 'https://github.com/leeno7786-coder/devcard-ai',
    featured: false,
  },
  {
    id: 'omega-browser-agent',
    title: 'Omega Browser Agent',
    subtitle: 'Autonomous Browser Automation Extension',
    category: 'Developer Tools',
    badge: 'Edge / Chrome Extension',
    description:
      'Microsoft Edge & Chromium extension running an autonomous web browsing agent against local inference backends (Omega-Portable Lite, LM Studio) or OpenRouter. Executes in an isolated agent workspace tab with streaming tool-call cards, page structure extraction, form filling, and automated screenshots.',
    techStack: ['Manifest V3', 'Chromium SidePanel API', 'Chrome Storage API', 'Omega-Portable Lite', 'OpenRouter API'],
    metrics: [
      { label: 'Platform', value: 'Edge / Chrome' },
      { label: 'Backends', value: 'Local / Cloud' },
      { label: 'UI Layout', value: 'Side Panel' },
      { label: 'Isolation', value: 'Dedicated Tab' },
    ],
    githubUrl: 'https://github.com/leeno7786-coder/Omega3.0',
    featured: true,
  },
];

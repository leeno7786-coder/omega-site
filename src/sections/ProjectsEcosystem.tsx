import { useState } from 'react';
import { PROJECTS, ProjectItem } from '../data/projectsData';
import { Terminal, Github, ExternalLink, Copy, Check, Sparkles, Cpu, Layers, HardDrive } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Core & Cognition': Sparkles,
  'Developer Tools': Terminal,
  'MCP & Memory': Layers,
  'Hardware & NPU': HardDrive,
};

export default function ProjectsEcosystem() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Core & Cognition', 'Developer Tools', 'MCP & Memory', 'Hardware & NPU'];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  const handleCopy = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="ecosystem" className="relative z-10 py-16" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-label">ECOSYSTEM & OPEN SOURCE</span>
            <h2 className="section-heading mt-3">Projects & Technology Suite</h2>
            <p className="mt-4 text-[#8A8A8E] text-base max-w-2xl leading-relaxed">
              Explore our suite of autonomous cognition engines, lightweight developer CLI tools, Model Context Protocol (MCP) servers, and NPU hardware execution layers.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-[#111827]/80 p-1.5 rounded-2xl border border-[#2A5A8A]/30">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#4A9EFF]/20 text-[#4A9EFF] border border-[#4A9EFF]/40 font-semibold shadow-[0_0_12px_rgba(74,158,255,0.2)]'
                    : 'text-[#8A8A8E] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project: ProjectItem) => {
            const CategoryIcon = CATEGORY_ICONS[project.category] || Cpu;

            return (
              <div
                key={project.id}
                className="glass-panel gradient-border corner-accent p-6 md:p-8 flex flex-col justify-between relative group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 flex items-center justify-center text-[#4A9EFF]">
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs text-[#5A6A8A] uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {project.badge && (
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#00E5C7]/10 text-[#00E5C7] border border-[#00E5C7]/30">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl md:text-2xl text-white font-normal group-hover:text-[#4A9EFF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-[#8A8A8E] mt-1 mb-4">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#E5E5E7]/80 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Metrics Grid (if available) */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 p-3 rounded-xl bg-[#0A0A0B]/60 border border-[#2A5A8A]/20">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center">
                          <div className="text-base font-semibold text-[#4A9EFF]">{m.value}</div>
                          <div className="text-[9px] font-mono text-[#5A6A8A] uppercase">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Terminal One-Liner (if available) */}
                  {project.installCommand && (
                    <div className="mb-6">
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#5A6A8A] uppercase mb-1.5">
                        <span className="flex items-center gap-1">
                          <Terminal className="w-3 h-3 text-[#4A9EFF]" /> Quick Install
                        </span>
                        <span>Terminal</span>
                      </div>
                      <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#111827] border border-[#2A5A8A]/40 font-mono text-xs text-[#00E5C7] overflow-x-auto no-scrollbar">
                        <code className="whitespace-nowrap">{project.installCommand}</code>
                        <button
                          onClick={() => handleCopy(project.installCommand!, project.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#8A8A8E] hover:text-white transition-colors shrink-0"
                          title="Copy command"
                        >
                          {copiedId === project.id ? (
                            <Check className="w-3.5 h-3.5 text-[#00E5C7]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer: Tech Stack Chips & GitHub Link */}
                <div className="pt-4 border-t border-[#2A5A8A]/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#8A8A8E] border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-xl bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 text-[#4A9EFF] hover:bg-[#4A9EFF] hover:text-[#0A0A0B] transition-all font-semibold"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

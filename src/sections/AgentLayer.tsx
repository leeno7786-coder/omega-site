import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOCAL_AGENTS = [
  { name: 'Claude Code Opus', role: 'Architect', provider: 'Anthropic' },
  { name: 'Cursor', role: 'Engineer', provider: 'Anysphere' },
  { name: 'Devin / SWE-1.6', role: 'Mapping / Audit', provider: 'Cognition' },
  { name: 'Operator', role: 'Spec Authority', provider: 'Human' },
];

const CLOUD_PROVIDERS = [
  'OpenRouter', 'Anthropic', 'OpenAI', 'Google', 'Cohere',
  'Mistral', 'Groq', 'Together', 'DeepSeek', 'xAI',
  'Fireworks', 'AI21', 'Perplexity', 'Replicate', 'Azure',
  'AWS Bedrock', 'Vertex AI', 'Cloudflare Workers',
];

export default function AgentLayer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.al-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.al-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="al-label section-label">AGENT LAYER</span>
        <h2 className="al-heading section-heading mt-3">Your Agents, Your Choice</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[680px] leading-relaxed">
          Omega 3.0&apos;s agent layer is fully customizable. Plug in any combination of local
          and cloud agents — from Claude to Cursor to custom operators — across 15-20 supported
          cloud providers. The agent bus coordinates them all, routing tasks to the right agent
          for the right job. Local-first, cloud when you want it.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {/* Local agents */}
          <div className="rounded-xl p-6 md:p-8 bg-[#111827] border border-[#2A5A8A]">
            <h3 className="text-lg text-white font-normal tracking-tight mb-1">Local Agent Roster</h3>
            <p className="text-xs text-[#5A6A8A] font-mono mb-6">Agents with direct system access</p>

            <div className="space-y-3">
              {LOCAL_AGENTS.map((a) => (
                <div key={a.name} className="flex items-center justify-between p-4 rounded-lg bg-[#0A0A0B] border border-[#1A2A3A]">
                  <div>
                    <span className="text-sm text-white font-medium">{a.name}</span>
                    <span className="block text-xs text-[#8A8A8E] mt-0.5">{a.role}</span>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[rgba(74,158,255,0.08)] text-[#4A9EFF] uppercase">
                    {a.provider}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[rgba(0,229,199,0.04)] border border-[#1A3A3A]">
              <span className="font-mono text-[10px] text-[#00E5C7] uppercase tracking-wider">Agent Bus Protocol</span>
              <p className="text-xs text-[#8A8A8E] mt-2 leading-relaxed">
                Agents communicate over the agent bus at .agents/bus.jsonl — status messages,
                handoffs, and task routing. Each agent reads/writes to AGENTS.md to stay
                coordinated across concurrent workstreams.
              </p>
            </div>
          </div>

          {/* Cloud providers */}
          <div className="rounded-xl p-6 md:p-8 bg-[#111827] border border-[#2A5A8A]">
            <h3 className="text-lg text-white font-normal tracking-tight mb-1">Cloud Provider Ecosystem</h3>
            <p className="text-xs text-[#5A6A8A] font-mono mb-6">15-20+ supported backends</p>

            <div className="flex flex-wrap gap-2">
              {CLOUD_PROVIDERS.map((p) => (
                <span
                  key={p}
                  className="font-mono text-[11px] px-3 py-1.5 rounded border border-[#2A5A8A] bg-[#0A0A0B] text-[#8A8A8E] hover:border-[#4A9EFF] hover:text-[#E5E5E7] transition-colors duration-200"
                >
                  {p}
                </span>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-[rgba(245,166,35,0.04)] border border-[#3A2A1A]">
              <span className="font-mono text-[10px] text-[#F5A623] uppercase tracking-wider">OpenRouter Integration</span>
              <p className="text-xs text-[#8A8A8E] mt-2 leading-relaxed">
                Full OpenRouter backend with pricing-sorted model discovery, user-supplied API
                key storage, and automatic fallback from local to cloud when models drop.
                Switch providers mid-session without restarting.
              </p>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-[rgba(139,92,246,0.04)] border border-[#2A1A3A]">
              <span className="font-mono text-[10px] text-[#A78BFA] uppercase tracking-wider">Configurable Fallback Chain</span>
              <p className="text-xs text-[#8A8A8E] mt-2 leading-relaxed">
                Define fallback chains: local gemma_e4b first, then OpenRouter Claude,
                then OpenAI GPT — with automatic failover and cost-aware routing.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#4A9EFF]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">Agent Bus</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00E5C7]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">Local-First</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#F5A623]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">Cloud Fallback</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#A78BFA]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">15-20+ Providers</span></div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1024 from '../assets/ab_1024.png';
import img1152 from '../assets/ab_1152.png';
import img1280 from '../assets/ab_1280.png';
import memoryGraphImg from '../assets/memory-graph.png';

gsap.registerPlugin(ScrollTrigger);

const MODELS = [
  { name: 'gemma_e4b', role: 'Primary Cognition', type: 'LLM', cap: 'AUTO / Omega reasoning' },
  { name: 'embedding_gemma', role: 'Embeddings', type: 'Encoder', cap: 'Memory retrieval vectors' },
  { name: 'whisper_large_v3_turbo_q4', role: 'Speech-to-Text', type: 'Audio', cap: 'Voice input transcription' },
  { name: 'kokoro', role: 'Text-to-Speech', type: 'Audio', cap: 'Voice output synthesis' },
  { name: 'flux2-klein', role: 'Image Generation', type: 'Diffusion', cap: '1024-1280 resolution' },
  { name: 'cosmos_reason2_8b', role: 'Vision Reasoning', type: 'Vision', cap: 'Spatial awareness + VQA' },
  { name: 'qwopus-4b-v3', role: 'Code + Multimodal', type: 'LLM', cap: 'CLI / build / browser agent' },
  { name: 'face_det_10g', role: 'Face Detection', type: 'Vision', cap: 'Bounding box extraction' },
  { name: 'face_w600k_r50', role: 'Face Embedding', type: 'Vision', cap: 'Identity vector + memory' },
  { name: 'face_2d106det', role: '2D Landmarks', type: 'Vision', cap: '106-point face mesh' },
  { name: 'face_1k3d68', role: '3D Landmarks', type: 'Vision', cap: '68-point depth-aware mesh' },
  { name: 'face_genderage', role: 'Demographics', type: 'Vision', cap: 'Age + gender estimation' },
  { name: 'dme_overlap_matmul', role: 'Semantic Overlap', type: 'Encoder', cap: 'DME coordinate SRAM' },
];

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  LLM: { bg: 'rgba(74,158,255,0.12)', text: '#4A9EFF' },
  Encoder: { bg: 'rgba(0,229,199,0.08)', text: '#00E5C7' },
  Audio: { bg: 'rgba(245,166,35,0.08)', text: '#F5A623' },
  Diffusion: { bg: 'rgba(229,229,231,0.06)', text: '#E5E5E7' },
  Vision: { bg: 'rgba(139,92,246,0.1)', text: '#A78BFA' },
};

const TIERS = [
  { src: img1024, res: '1024\u00d71024', label: 'Standard', px: '1.05 MP' },
  { src: img1152, res: '1152\u00d71152', label: 'High', px: '1.33 MP' },
  { src: img1280, res: '1280\u00d71280', label: 'Ultra', px: '1.64 MP' },
];

const CATEGORIES = [
  { name: 'Temporal Reasoning', r2: 70.7, now: 78.9, delta: '+8.3' },
  { name: 'Multi-Session', r2: 54.1, now: 66.9, delta: '+12.8' },
  { name: 'Single-Session Assistant', r2: 80.4, now: 96.4, delta: '+16.0' },
  { name: 'Knowledge Update', r2: 71.8, now: 80.8, delta: '+9.0' },
  { name: 'Single-Session User', r2: 92.9, now: 94.3, delta: '+1.4' },
  { name: 'Single-Session Preference', r2: 46.7, now: 43.3, delta: '−3.4' },
];

const CAPABILITIES = [
  { title: 'Autonomous Cognition', desc: 'Self-directing metacognitive loops — the system thinks about its own thinking, evaluates performance, and adapts behavior.' },
  { title: 'Episodic Memory v2', desc: 'Deterministic recall with parallel graph-hopping. 0.2ms aggressive recall, zero noise churn, source-ledgered provenance.' },
  { title: '13-Model Orchestration', desc: 'LLMs, encoders, audio, vision, diffusion — all hot-swapped and GPU-leased within 8 GB RAM. Zero OOM.' },
  { title: 'Substantive Dialogue', desc: 'The conversation itself becomes an actuator. Ask, learn, theorize, apply — through code and through dialogue.' },
  { title: 'Edge & Local-First', desc: 'Runs on a $400 laptop with integrated GPU. No cloud. No API keys. Full voice I/O, vision, and image generation.' },
  { title: 'LongMemEval-S: 78.0%', desc: '78% on the industry-standard long-context benchmark using only a local 4B parameter model — +8.8pp from the retrieval rebuild alone.' },
];

export default function OmegaShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.show-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.show-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="showcase" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="show-label section-label">FLAGSHIP PRODUCT</span>
        <h2 className="show-heading section-heading mt-3">Omega 3.0</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[680px] leading-relaxed">
          A fully portable autonomous cognitive architecture — metacognition, episodic memory, 13-model orchestration, and zero cloud dependency. This is what we build. This is what we can build for you.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[{ val: '13', label: 'Model Slots', color: '#4A9EFF' }, { val: '8 GB', label: 'Total RAM', color: '#00E5C7' }, { val: '78.0%', label: 'LongMemEval-S', color: '#F5A623' }, { val: '0', label: 'Cloud Calls', color: '#A78BFA' }].map((s) => (
            <div key={s.label} className="glass-panel float-3d p-6 text-center">
              <div className="text-[40px] font-normal" style={{ color: s.color, textShadow: `0 0 25px ${s.color}40` }}>{s.val}</div>
              <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-panel gradient-border corner-accent p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 rounded-full bg-[#4A9EFF]" style={{ boxShadow: '0 0 10px rgba(74,158,255,0.4)' }} />
            <span className="font-mono text-[10px] text-[#4A9EFF] uppercase tracking-[0.12em]">8-Layer Cognition Cascade</span>
          </div>
          <p className="text-sm text-[#8A8A8E] leading-relaxed">
            Every decision flows through a deterministic cascade: <span className="text-[#E5E5E7]">Pressure</span> (ignition) → <span className="text-[#E5E5E7]">Global A</span> (intent routing) → <span className="text-[#E5E5E7]">Meta A</span> (action pack) → <span className="text-[#E5E5E7]">AUTO</span> (model execution) → <span className="text-[#E5E5E7]">Meta B</span> (reflection) → <span className="text-[#E5E5E7]">Global B</span> (outcome) → <span className="text-[#E5E5E7]">OMEGA</span> (metacognition) → <span className="text-[#E5E5E7]">DeepSleep</span> (consolidation).
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['Episode Gate', 'Intent Routing', 'Tool Dispatch', 'Model Execution', 'Outcome Validation', '5W1H Analysis', 'Memory Consolidation'].map((tag) => (
              <span key={tag} className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(74,158,255,0.1)] text-[#4A9EFF]">{tag}</span>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl text-white font-normal tracking-tight mb-1">Thirteen Models, One Runtime</h3>
          <p className="text-xs text-[#5A6A8A] font-mono mb-6">All hot-swappable, GPU-leased, failure-soft — zero cloud inference</p>
          <div className="rounded-xl border border-[#2A5A8A] bg-[#111827] overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-2 px-6 py-3 border-b border-[#2A5A8A] font-mono text-[10px] uppercase tracking-wider text-[#5A6A8A]">
              <span className="col-span-4">Model Slot</span>
              <span className="col-span-3">Role</span>
              <span className="col-span-2">Type</span>
              <span className="col-span-3">Capability</span>
            </div>
            {MODELS.map((m) => {
              const tc = TYPE_COLORS[m.type] || { bg: 'rgba(74,158,255,0.08)', text: '#4A9EFF' };
              return (
                <div key={m.name} className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-2 px-6 py-3 border-b border-[#1A1A1E] items-center hover:bg-[rgba(74,158,255,0.03)] transition-colors">
                  <div className="md:col-span-4"><span className="font-mono text-sm text-white">{m.name}</span></div>
                  <div className="md:col-span-3 text-sm text-[#E5E5E7]">{m.role}</div>
                  <div className="md:col-span-2"><span className="font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider" style={{ backgroundColor: tc.bg, color: tc.text }}>{m.type}</span></div>
                  <div className="md:col-span-3 text-sm text-[#8A8A8E]">{m.cap}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl text-white font-normal tracking-tight mb-1">LongMemEval-S: 78.0%</h3>
          <p className="text-xs text-[#5A6A8A] font-mono mb-6">78% on the industry-standard long-context benchmark — local 4B model · mistral-large 86.4%</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[{ val: '78.0%', label: 'LongMemEval-S', sub: '390/500 · gemma-4B', color: '#00E5C7' }, { val: '+8.8', label: 'Retrieval Rebuild', sub: '69.2% to 78.0%', color: '#4A9EFF' }, { val: '+26.2', label: 'R1 to Now', sub: '51.8% to 78.0%', color: '#F5A623' }, { val: '86.4%', label: 'mistral-large', sub: 'same judge · same bench', color: '#E5E5E7' }].map((s) => (
              <div key={s.label} className="glass-panel float-3d p-6 text-center">
                <div className="text-[36px] font-normal" style={{ color: s.color, textShadow: `0 0 20px ${s.color}40` }}>{s.val}</div>
                <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">{s.label}</div>
                <div className="font-mono text-[10px] text-[#5A6A8A] mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-6 bg-[rgba(74,158,255,0.04)] border border-[#2A5A8A] mb-8">
            <div className="flex items-start gap-3">
              <span className="text-[#4A9EFF] text-xl leading-none mt-0.5">&ldquo;</span>
              <p className="text-base text-[#E5E5E7] leading-relaxed italic">Same 4B model, same benchmark, same judge. +8.8pp purely from the retrieval rebuild.</p>
            </div>
            <p className="text-xs text-[#5A6A8A] mt-2 ml-6">— Omega LongMemEval, R2 to Now</p>
          </div>
          <div className="rounded-xl border border-[#2A5A8A] bg-[#111827] overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-6 py-3 border-b border-[#2A5A8A] font-mono text-[10px] uppercase tracking-wider text-[#5A6A8A]">
              <span className="col-span-4">Category</span>
              <span className="col-span-2 text-right">Round 2</span>
              <span className="col-span-3 text-right">Now</span>
              <span className="col-span-3 text-right">Δ</span>
            </div>
            {CATEGORIES.map((cat) => (
              <div key={cat.name} className="grid grid-cols-12 gap-2 px-6 py-3 border-b border-[#1A1A1E] items-center">
                <span className="col-span-4 text-sm text-[#E5E5E7]">{cat.name}</span>
                <span className="col-span-2 text-right font-mono text-sm text-[#8A8A8E]">{cat.r2}%</span>
                <span className="col-span-3 text-right font-mono text-sm text-[#00E5C7]">{cat.now}%</span>
                <span className={`col-span-3 text-right font-mono text-sm ${cat.delta.startsWith('−') ? 'text-[#8A8A8E]' : 'text-[#4A9EFF]'}`}>{cat.delta}</span>
              </div>
            ))}
            <div className="grid grid-cols-12 gap-2 px-6 py-4 bg-[rgba(74,158,255,0.06)]">
              <span className="col-span-4 text-sm font-medium text-white">Overall</span>
              <span className="col-span-2 text-right font-mono text-sm text-[#8A8A8E]">69.2%</span>
              <span className="col-span-3 text-right font-mono text-sm text-[#4A9EFF] font-medium">78.0%</span>
              <span className="col-span-3 text-right font-mono text-sm text-[#4A9EFF]">+8.8</span>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl text-white font-normal tracking-tight mb-1">Local Diffusion, Three Resolution Tiers</h3>
          <p className="text-xs text-[#5A6A8A] font-mono mb-6">Generate images at up to 1280x1280 within 8 GB RAM — zero cloud</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIERS.map((tier) => (
              <div key={tier.res} className="glass-panel float-3d overflow-hidden">
                <div className="aspect-square overflow-hidden"><img src={tier.src} alt={`Generated at ${tier.res}`} className="w-full h-full object-cover" loading="lazy" /></div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#4A9EFF] uppercase tracking-[0.12em]">{tier.label}</span>
                    <span className="block font-mono text-sm text-white mt-0.5">{tier.res}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#5A6A8A]">{tier.px}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 glass-panel gradient-border corner-accent p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 rounded-full bg-[#A78BFA]" style={{ boxShadow: '0 0 10px rgba(167,139,250,0.4)' }} />
            <span className="font-mono text-[10px] text-[#A78BFA] uppercase tracking-[0.12em]">Vision & Spatial Reasoning</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-base text-white font-medium mb-3">Visual Inference & Robotic Path Planning</h4>
              <p className="text-sm text-[#8A8A8E] leading-relaxed">Omega performs common-sense visual reasoning for 2D/3D spatial awareness, bounding box detection, and robotic path planning — all from a single image or video frame. No external vision API.</p>
              <div className="mt-4 p-4 rounded-lg bg-[#0A0A0B] border border-[#1A2A3A]">
                <span className="font-mono text-[10px] text-[#4A9EFF] uppercase tracking-wider">Example: Warehouse Navigation</span>
                <p className="text-xs text-[#8A8A8E] mt-2">Detected a stationary forklift (hazard) and a crumpled cardboard box (obstruction). Generated a safe path vector with three ROS2 waypoints.</p>
              </div>
            </div>
            <div>
              <h4 className="text-base text-white font-medium mb-3">Facial Recognition Through Memory</h4>
              <div className="space-y-2">
                {[{ step: 'Detect', model: 'face_det_10g', desc: 'Locate faces in frame' }, { step: 'Embed', model: 'face_w600k_r50', desc: 'Generate identity vector' }, { step: 'Match', model: 'Memory Cortex', desc: 'Recall from face memory' }].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#A78BFA] flex items-center justify-center flex-shrink-0"><span className="font-mono text-[9px] text-white font-bold">{i + 1}</span></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2"><span className="text-xs text-white font-medium">{s.step}</span><span className="font-mono text-[9px] text-[#A78BFA]">{s.model}</span></div>
                      <span className="text-[10px] text-[#8A8A8E]">{s.desc}</span>
                    </div>
                    {i < 2 && <div className="text-[#5A6A8A] text-xs">{'\u2193'}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl text-white font-normal tracking-tight mb-1">Watch It Think in Real Time</h3>
          <p className="text-xs text-[#5A6A8A] font-mono mb-6">Interactive 3D memory node graph</p>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 glass-panel overflow-hidden">
              <img src={memoryGraphImg} alt="Live memory node graph" className="w-full h-auto" loading="lazy" />
              <div className="px-5 py-3 border-t border-[#1A2A3A] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider">Live Memory Graph</span>
                <span className="font-mono text-[10px] text-[#4A9EFF]">current_trajectory · 3,988 bytes</span>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-3">
              {[{ title: 'Force-Directed Layout', desc: 'Memories self-organize by semantic proximity in real time' }, { title: 'Click to Expand', desc: 'Any node reveals its full memory record' }, { title: 'Live Growth', desc: 'Watch the graph expand as Omega learns' }, { title: 'Terminal Nodes', desc: 'Deepest memories open live memory files' }].map((f) => (
                <div key={f.title} className="glass-panel p-5">
                  <h4 className="text-sm text-white font-medium">{f.title}</h4>
                  <p className="text-xs text-[#8A8A8E] mt-1 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 glass-panel gradient-border corner-accent p-6 md:p-8" style={{ boxShadow: '0 0 30px rgba(74,158,255,0.15)' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 rounded-full bg-[#00E5C7]" style={{ boxShadow: '0 0 10px rgba(0,229,199,0.4)' }} />
            <span className="font-mono text-[10px] text-[#00E5C7] uppercase tracking-[0.12em]">Live Demonstration — Unprompted</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[#0A0A0B] border border-[#2A3A1A]">
              <span className="font-mono text-[10px] text-[#F5A623] uppercase tracking-wider">Turn 1 — Proactive</span>
              <p className="text-xs text-[#8A8A8E] mt-2 leading-relaxed italic">&ldquo;Should I prioritize finding resources that build up from basic probability axioms through to the core principles of statistical inference?&rdquo;</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0A0A0B] border border-[#1A3A3A]">
              <span className="font-mono text-[10px] text-[#00E5C7] uppercase tracking-wider">Turn 2 — Post-Reboot</span>
              <p className="text-xs text-[#8A8A8E] mt-2 leading-relaxed italic">&ldquo;The current results are too advanced for the foundational goal. I need simpler, introductory materials.&rdquo;</p>
            </div>
            <div className="p-4 rounded-lg bg-[#0A0A0B] border border-[#2A3A5A]">
              <span className="font-mono text-[10px] text-[#4A9EFF] uppercase tracking-wider">Turn 3 — Synthesis</span>
              <p className="text-xs text-[#8A8A8E] mt-2 leading-relaxed italic">&ldquo;I will focus on defining each distribution — n and p for Binomial, &lambda; for Poisson, &mu; and &sigma; for Normal — and learn them in the sequence you prescribed.&rdquo;</p>
            </div>
          </div>
        </div>

        <div className="mt-12 glass-panel gradient-border corner-accent p-6 md:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 rounded-full bg-[#E5E5E7]" style={{ boxShadow: '0 0 10px rgba(229,229,231,0.3)' }} />
            <span className="font-mono text-[10px] text-[#E5E5E7] uppercase tracking-[0.12em]">Closing the Loop</span>
          </div>
          <h4 className="text-lg text-white font-normal tracking-tight mb-3">The Fifth Channel: Substantive Dialogue</h4>
          <p className="text-sm text-[#8A8A8E] leading-relaxed mb-4">Omega applies learned knowledge by initiating dialogue: presenting findings, proposing next steps, requesting confirmation. The conversation is the motor program. All on a $400 laptop with a single AMD 860M iGPU.</p>
          <div className="flex flex-wrap gap-2">
            {['Ask', 'Learn', 'Theorize', 'Apply — Code', 'Apply — Substantive Dialogue'].map((step, i) => (
              <span key={step} className="font-mono text-[11px] px-3 py-1 rounded" style={{ background: i === 4 ? 'rgba(229,229,231,0.1)' : 'rgba(74,158,255,0.08)', color: i === 4 ? '#E5E5E7' : '#4A9EFF', border: i === 4 ? '1px solid rgba(229,229,231,0.2)' : 'none' }}>{i === 4 && <span className="mr-1 text-[9px]">NEW</span>}{step}</span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {CAPABILITIES.map((cap) => (
            <div key={cap.title} className="glass-panel p-6">
              <h4 className="text-sm text-white font-medium">{cap.title}</h4>
              <p className="text-xs text-[#8A8A8E] mt-2 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

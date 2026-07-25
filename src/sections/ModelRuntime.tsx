import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MODELS = [
  { name: 'gemma_e4b', role: 'Primary Cognition', type: 'LLM', cap: 'AUTO / Omega reasoning' },
  { name: 'embedding_gemma', role: 'Embeddings', type: 'Encoder', cap: 'Memory retrieval vectors' },
  { name: 'whisper_large_v3_turbo_q4', role: 'Speech-to-Text', type: 'Audio', cap: 'Voice input transcription' },
  { name: 'kokoro', role: 'Text-to-Speech', type: 'Audio', cap: 'Voice output synthesis' },
  { name: 'flux2-klein', role: 'Image Generation', type: 'Diffusion', cap: '1024-1280 resolution' },
  { name: 'cosmos_reason2_8b', role: 'Vision Reasoning', type: 'Vision', cap: 'Spatial awareness + VQA' },
  { name: 'qwopus-4b-v3', role: 'Code + Multimodal', type: 'LLM', cap: 'CLI / build / browser agent driver' },
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

export default function ModelRuntime() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mr-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.mr-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#141415' }}>
      <div className="content-max section-pad-x">
        <span className="mr-label section-label">MULTI-MODEL RUNTIME</span>
        <h2 className="mr-heading section-heading mt-3">Thirteen Models, One Mind</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[640px] leading-relaxed">
          Omega 3.0 orchestrates thirteen specialized models through a single local runtime. Each model is hot-swappable, GPU-leased, and failure-soft — cognition continues even if individual models drop.
        </p>

        <div className="mt-12 rounded-xl border border-[#2A5A8A] bg-[#111827] overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-2 px-6 py-3 border-b border-[#2A5A8A] font-mono text-[10px] uppercase tracking-wider text-[#5A6A8A]">
            <span className="col-span-4">Model Slot</span>
            <span className="col-span-3">Role</span>
            <span className="col-span-2">Type</span>
            <span className="col-span-3">Capability</span>
          </div>
          {MODELS.map((m) => {
            const tc = TYPE_COLORS[m.type] || { bg: 'rgba(74,158,255,0.08)', text: '#4A9EFF' };
            return (
              <div key={m.name} className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-2 px-6 py-3 border-b border-[#1A1A1E] items-center hover:bg-[rgba(74,158,255,0.03)] transition-colors duration-200">
                <div className="md:col-span-4"><span className="font-mono text-sm text-white">{m.name}</span></div>
                <div className="md:col-span-3 text-sm text-[#E5E5E7]">{m.role}</div>
                <div className="md:col-span-2"><span className="font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-wider" style={{ backgroundColor: tc.bg, color: tc.text }}>{m.type}</span></div>
                <div className="md:col-span-3 text-sm text-[#8A8A8E]">{m.cap}</div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#4A9EFF]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">GPU Lease Management</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00E5C7]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">Hot-Swap Slots</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#F5A623]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">Failure-Soft</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#A78BFA]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">Zero Cloud</span></div>
        </div>
      </div>
    </section>
  );
}

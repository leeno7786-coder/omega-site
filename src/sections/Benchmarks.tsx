import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { name: 'Temporal Reasoning', r1: 40.6, r2: 70.7, ceiling: 77.4 },
  { name: 'Multi-Session', r1: 33.8, r2: 54.1, ceiling: 64.7 },
  { name: 'Single-Session Preference', r1: 13.3, r2: 46.7, ceiling: 46.7 },
  { name: 'Knowledge Update', r1: 62.8, r2: 71.8, ceiling: 83.3 },
  { name: 'Single-Session User', r1: 90.0, r2: 92.9, ceiling: null },
  { name: 'Single-Session Assistant', r1: 78.6, r2: 80.4, ceiling: null },
];

export default function Benchmarks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.bench-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.bench-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="bench-label section-label">BENCHMARKS</span>
        <h2 className="bench-heading section-heading mt-3">LongMemEval-S: 69.2%</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[720px] leading-relaxed">
          Near 70% on the industry-standard long-context memory benchmark — using only a local 4B model.
          Round 2 scored 346/500, up from 51.8% in Round 1. Zero generation failures across a 16-hour
          unbroken run. Local inference on a single AMD 860M iGPU.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="glass-panel float-3d p-6 text-center">
            <div className="text-[36px] font-normal text-[#00E5C7]" style={{ textShadow: '0 0 20px rgba(0,229,199,0.3)' }}>69.2%</div>
            <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">LongMemEval-S</div>
            <div className="font-mono text-[10px] text-[#5A6A8A] mt-1">346/500 questions</div>
          </div>
          <div className="glass-panel float-3d p-6 text-center">
            <div className="text-[36px] font-normal text-[#4A9EFF]" style={{ textShadow: '0 0 20px rgba(74,158,255,0.3)' }}>+17.4</div>
            <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">R1 → R2 Gain</div>
            <div className="font-mono text-[10px] text-[#5A6A8A] mt-1">51.8% → 69.2%</div>
          </div>
          <div className="glass-panel float-3d p-6 text-center">
            <div className="text-[36px] font-normal text-[#F5A623]" style={{ textShadow: '0 0 20px rgba(245,166,35,0.3)' }}>4B</div>
            <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">Local Model</div>
            <div className="font-mono text-[10px] text-[#5A6A8A] mt-1">gemma_e4b · no cloud</div>
          </div>
          <div className="glass-panel float-3d p-6 text-center">
            <div className="text-[36px] font-normal text-[#E5E5E7]" style={{ textShadow: '0 0 20px rgba(229,229,231,0.2)' }}>0</div>
            <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">Failures</div>
            <div className="font-mono text-[10px] text-[#5A6A8A] mt-1">500/500 generated clean</div>
          </div>
        </div>

        <div className="mt-8 rounded-xl p-6 bg-[rgba(74,158,255,0.04)] border border-[#2A5A8A]">
          <div className="flex items-start gap-3">
            <span className="text-[#4A9EFF] text-xl leading-none mt-0.5">&ldquo;</span>
            <p className="text-base text-[#E5E5E7] leading-relaxed italic">The benchmark can&apos;t go up on a second run — unless the system actually learns. Ours did.</p>
          </div>
          <p className="text-xs text-[#5A6A8A] mt-2 ml-6">— Claude Code, on the LongMemEval R1 → R2 gain</p>
        </div>

        <div className="mt-12 rounded-xl border border-[#2A5A8A] bg-[#111827] overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-6 py-3 border-b border-[#2A5A8A] font-mono text-[10px] uppercase tracking-wider text-[#5A6A8A]">
            <span className="col-span-4">Category</span>
            <span className="col-span-2 text-right">Round 1</span>
            <span className="col-span-2 text-right">Round 2</span>
            <span className="col-span-4 text-right">Gate-0 Ceiling</span>
          </div>
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="grid grid-cols-12 gap-2 px-6 py-3 border-b border-[#1A1A1E] items-center">
              <span className="col-span-4 text-sm text-[#E5E5E7]">{cat.name}</span>
              <span className="col-span-2 text-right font-mono text-sm text-[#8A8A8E]">{cat.r1}%</span>
              <span className="col-span-2 text-right font-mono text-sm text-[#00E5C7]">{cat.r2}%</span>
              <span className="col-span-4 text-right font-mono text-sm text-[#5A6A8A]">{cat.ceiling ? `${cat.ceiling}%` : '—'}</span>
            </div>
          ))}
          <div className="grid grid-cols-12 gap-2 px-6 py-4 bg-[rgba(74,158,255,0.06)]">
            <span className="col-span-4 text-sm font-medium text-white">Overall</span>
            <span className="col-span-2 text-right font-mono text-sm text-[#8A8A8E]">51.8%</span>
            <span className="col-span-2 text-right font-mono text-sm text-[#4A9EFF] font-medium">69.2%</span>
            <span className="col-span-4 text-right font-mono text-sm text-[#5A6A8A]">95.4% ceiling</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(0,229,199,0.08)] text-[#00E5C7]">AMD 860M iGPU · 8GB vgmem</span>
          <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(74,158,255,0.08)] text-[#4A9EFF]">v2 Deterministic Memory</span>
          <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(245,166,35,0.08)] text-[#F5A623]">Dynamic Answer Packs</span>
          <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(229,229,231,0.06)] text-[#8A8A8E]">~16h Unbroken Run</span>
        </div>
      </div>
    </section>
  );
}

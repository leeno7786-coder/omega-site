import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { name: 'Temporal Reasoning', r2: 70.7, now: 78.9, delta: '+8.3' },
  { name: 'Multi-Session', r2: 54.1, now: 66.9, delta: '+12.8' },
  { name: 'Single-Session Assistant', r2: 80.4, now: 96.4, delta: '+16.0' },
  { name: 'Knowledge Update', r2: 71.8, now: 80.8, delta: '+9.0' },
  { name: 'Single-Session User', r2: 92.9, now: 94.3, delta: '+1.4' },
  { name: 'Single-Session Preference', r2: 46.7, now: 43.3, delta: '−3.4' },
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
    <section id="benchmarks" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="bench-label section-label">BENCHMARKS</span>
        <h2 className="bench-heading section-heading mt-3">LongMemEval-S: 86.4% Headline</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[720px] leading-relaxed">
          86.4% headline score on the industry-standard long-context memory benchmark with mistral-large, and up to 78.0% (76.7% 3-trial mean) using only a local 4B model within an 8 GB RAM budget. On identical frozen retrieval evidence, the local 4B scores within ~8 points of mistral-large — proving the memory architecture carries the score.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <div className="glass-panel float-3d p-6 text-center">
            <div className="text-[36px] font-normal text-[#00E5C7]" style={{ textShadow: '0 0 20px rgba(0,229,199,0.3)' }}>86.4%</div>
            <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">Official Headline</div>
            <div className="font-mono text-[10px] text-[#5A6A8A] mt-1">432/500 · mistral-large</div>
          </div>
          <div className="glass-panel float-3d p-6 text-center">
            <div className="text-[36px] font-normal text-[#4A9EFF]" style={{ textShadow: '0 0 20px rgba(74,158,255,0.3)' }}>76.7%</div>
            <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">Local 4B (Up to 78%)</div>
            <div className="font-mono text-[10px] text-[#5A6A8A] mt-1">3-trial mean · gemma-4B</div>
          </div>
          <div className="glass-panel float-3d p-6 text-center">
            <div className="text-[36px] font-normal text-[#F5A623]" style={{ textShadow: '0 0 20px rgba(245,166,35,0.3)' }}>+8.8</div>
            <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">Retrieval Rebuild</div>
            <div className="font-mono text-[10px] text-[#5A6A8A] mt-1">69.2% → 78.0% (Local 4B)</div>
          </div>
          <div className="glass-panel float-3d p-6 text-center">
            <div className="text-[36px] font-normal text-[#E5E5E7]" style={{ textShadow: '0 0 20px rgba(229,229,231,0.2)' }}>+26.2</div>
            <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">Local Progression</div>
            <div className="font-mono text-[10px] text-[#5A6A8A] mt-1">51.8% → 69.2% → 78.0%</div>
          </div>
        </div>

        <div className="mt-8 rounded-xl p-6 bg-[rgba(74,158,255,0.04)] border border-[#2A5A8A]">
          <div className="flex items-start gap-3">
            <span className="text-[#4A9EFF] text-xl leading-none mt-0.5">&ldquo;</span>
            <p className="text-base text-[#E5E5E7] leading-relaxed italic">On identical frozen retrieval evidence, the local 4B scores within ~8 points of mistral-large (78.0% vs 86.4%) — the memory system carries the score, and the answer model becomes nearly swappable.</p>
          </div>
          <p className="text-xs text-[#5A6A8A] mt-2 ml-6">— Evaluated with gpt-4o-2024-08-06 via official LongMemEval evaluate_qa.py</p>
        </div>

        <div className="mt-12 rounded-xl border border-[#2A5A8A] bg-[#111827] overflow-hidden">
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

        <div className="flex flex-wrap gap-2 mt-6">
          <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(0,229,199,0.08)] text-[#00E5C7]">Headline 86.4% · mistral-large</span>
          <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(74,158,255,0.08)] text-[#4A9EFF]">gemma-4B · local (up to 78%)</span>
          <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(245,166,35,0.08)] text-[#F5A623]">51.8% → 69.2% → 78.0%</span>
          <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(229,229,231,0.06)] text-[#8A8A8E]">gpt-4o-2024-08-06 judge</span>
        </div>
      </div>
    </section>
  );
}

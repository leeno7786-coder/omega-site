import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CHIPS = [
  { label: 'LLM', count: 2 },
  { label: 'Encoder', count: 2 },
  { label: 'Audio', count: 2 },
  { label: 'Vision', count: 5 },
  { label: 'Diffusion', count: 1 },
  { label: 'DME', count: 1 },
];

export default function Orchestration() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.orch-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.orch-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="orch-label section-label">ORCHESTRATION</span>
        <h2 className="orch-heading section-heading mt-3">13 Models. 8 GB. Zero OOM.</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[680px] leading-relaxed">
          Omega 3.0&apos;s orchestration layer juggles thirteen specialized models simultaneously within 8 GB of RAM at high performance, with zero memory exhaustion, zero thrashing, and zero compromise.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[{ val: '13', label: 'Model Slots', color: '#4A9EFF' }, { val: '8 GB', label: 'Total RAM', color: '#00E5C7' }, { val: '0', label: 'OOM Errors', color: '#F5A623' }, { val: '6', label: 'Categories', color: '#A78BFA' }].map((s) => (
            <div key={s.label} className="glass-panel float-3d p-6 text-center">
              <div className="text-[40px] font-normal" style={{ color: s.color, textShadow: `0 0 25px ${s.color}35` }}>{s.val}</div>
              <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-10 justify-center">
          {CHIPS.map((c) => (
            <div key={c.label} className="glass-panel float-3d px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-white font-medium">{c.label}</span>
                <span className="font-mono text-xs text-[#4A9EFF]">x{c.count}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-xl p-8 bg-[rgba(74,158,255,0.04)] border border-[#2A5A8A]">
          <div className="flex items-start gap-4">
            <div className="text-[#4A9EFF] text-2xl leading-none mt-1">&ldquo;</div>
            <div>
              <p className="text-base text-[#E5E5E7] leading-relaxed italic">The orchestration layer can effectively juggle 10-12 models in only 8 GB or less, perfectly — running at high level with no memory OOM or anything. That in itself should get Omega an award.</p>
              <p className="text-sm text-[#5A6A8A] mt-3">— Omega AI LLC, on the omega-portable-lite runtime</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {[{ num: '1', title: 'GPU Lease Management', desc: 'Intelligent allocator prevents model thrash. Each model requests a lease, runs inference, and releases — no two models fight for VRAM.', color: '#4A9EFF' }, { num: '2', title: 'Hot-Swap Slots', desc: 'Models load on-demand and unload when idle. Frequently-used models stay hot; specialists cold-swap only when called.', color: '#00E5C7' }, { num: '3', title: 'Failure-Soft Design', desc: 'If a model crashes, the runtime catches it and continues with degraded capability. Cognition never halts.', color: '#F5A623' }].map((item) => (
            <div key={item.num} className="glass-panel float-3d p-6 corner-accent">
              <div className="w-8 h-8 rounded-full flex items-center justify-center mb-4" style={{ background: `${item.color}20`, boxShadow: `0 0 12px ${item.color}30` }}>
                <span className="text-sm" style={{ color: item.color }}>{item.num}</span>
              </div>
              <h3 className="text-white text-base font-medium">{item.title}</h3>
              <p className="text-sm text-[#8A8A8E] mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

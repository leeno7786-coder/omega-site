import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REQUIREMENTS = [
  { label: 'Storage', value: '1-2 TB SSD', detail: 'Entire system + models + memory' },
  { label: 'RAM', value: '8 GB minimum', detail: '13 models orchestrated simultaneously' },
  { label: 'GPU', value: 'Integrated OK', detail: 'AMD 860M iGPU validated · no dGPU required' },
  { label: 'OS', value: 'Windows 10/11', detail: 'Linux support coming soon' },
];

export default function Portability() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.port-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.port-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-16 lg:py-20" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <div className="glass-panel gradient-border corner-accent p-8 md:p-12 float-3d">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="lg:max-w-[500px]">
              <span className="port-label font-mono text-[10px] text-[#4A9EFF] uppercase tracking-[0.15em]">PORTABILITY</span>
              <h2 className="port-heading text-[clamp(28px,4vw,42px)] text-white font-normal leading-[1.1] tracking-[-0.02em] mt-3">Plug It In. Boot It Up. Run.</h2>
              <p className="mt-4 text-[#8A8A8E] text-base leading-relaxed">
                Omega 3.0 is fully portable across almost any Windows machine — including a $400 laptop with a single AMD 860M integrated GPU. The entire system lives on a single 1-2 TB SSD. No cloud setup. No dependency hell. Just plug in the drive and boot.
              </p>
            </div>
            <div className="lg:max-w-[440px] w-full">
              <div className="space-y-3">
                {REQUIREMENTS.map((r) => (
                  <div key={r.label} className="flex items-center gap-4 p-4 rounded-lg bg-[#0A0A0B] border border-[#1A2A3A]">
                    <div className="flex-shrink-0 w-20"><span className="font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider">{r.label}</span></div>
                    <div>
                      <span className="text-sm text-white font-medium">{r.value}</span>
                      <span className="block text-xs text-[#8A8A8E] mt-0.5">{r.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-[#1A2A3A]">
            {[{ c: '#00E5C7', l: '1-2 TB SSD' }, { c: '#4A9EFF', l: 'Any Windows Machine' }, { c: '#F5A623', l: 'Zero Cloud Required' }, { c: '#A78BFA', l: 'Linux Coming Soon' }].map((t) => (
              <div key={t.l} className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ background: t.c }} /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">{t.l}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

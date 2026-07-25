import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1024 from '../assets/ab_1024.png';
import img1152 from '../assets/ab_1152.png';
import img1280 from '../assets/ab_1280.png';

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  { src: img1024, res: '1024\u00d71024', label: 'Standard', px: '1.05 MP' },
  { src: img1152, res: '1152\u00d71152', label: 'High', px: '1.33 MP' },
  { src: img1280, res: '1280\u00d71280', label: 'Ultra', px: '1.64 MP' },
];

export default function ImageGeneration() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.img-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.img-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="img-label section-label">IMAGE GENERATION</span>
        <h2 className="img-heading section-heading mt-3">Local Diffusion, Three Resolution Tiers</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[640px] leading-relaxed">
          Generate images at up to 1280&times;1280 resolution entirely on local hardware. No cloud API calls, no data leaves your machine. All three tiers run comfortably within 8&nbsp;GB of system RAM.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {TIERS.map((tier) => (
            <div key={tier.res} className="rounded-xl overflow-hidden border border-[#2A5A8A] bg-[#111827] hover:border-[#4A9EFF] transition-all duration-300">
              <div className="aspect-square overflow-hidden">
                <img src={tier.src} alt={`Generated image at ${tier.res} resolution`} className="w-full h-full object-cover" loading="lazy" />
              </div>
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

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#00E5C7]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">8 GB RAM</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#4A9EFF]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">Zero Cloud</span></div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#F5A623]" /><span className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide">Same Prompt, Three Tiers</span></div>
        </div>
      </div>
    </section>
  );
}

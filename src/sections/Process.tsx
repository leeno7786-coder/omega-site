import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { num: '01', title: 'Discovery', body: 'We start with understanding your environment, constraints, and objectives. On-site or remote assessment of your hardware, data policies, and operational requirements. No two deployments are the same.', tags: ['Requirements', 'Assessment', 'Feasibility'], color: '#4A9EFF' },
  { num: '02', title: 'Architecture', body: 'We design a system architecture tailored to your hardware and use case — model selection, memory planning, GPU leasing strategy, and integration points. You review before we build.', tags: ['System Design', 'Model Selection', 'Integration Plan'], color: '#00E5C7' },
  { num: '03', title: 'Development', body: 'We build your system — from close-to-metal configuration to application layer. Each component is tested individually and as an integrated whole. Weekly progress updates throughout.', tags: ['Build', 'Test', 'Iterate'], color: '#F5A623' },
  { num: '04', title: 'Deployment & Support', body: 'We deploy on your hardware and validate everything works in your environment. Training for your team. Ongoing support with SLA-backed response times. We stand behind what we build.', tags: ['On-Site Deploy', 'Training', 'Ongoing Support'], color: '#A78BFA' },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proc-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.proc-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="proc-label section-label">OUR PROCESS</span>
        <h2 className="proc-heading section-heading mt-3">How We Work</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[640px] leading-relaxed">
          Every engagement follows a proven four-phase approach. We bring clarity, structure, and transparency to complex AI deployments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {STEPS.map((step) => (
            <div key={step.num} className="glass-panel p-8">
              <div className="text-4xl font-mono font-medium" style={{ color: step.color }}>{step.num}</div>
              <h3 className="text-xl text-white font-medium mt-4 tracking-tight">{step.title}</h3>
              <p className="text-sm text-[#8A8A8E] mt-3 leading-relaxed">{step.body}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {step.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[11px] px-3 py-1 rounded" style={{ background: `${step.color}15`, color: step.color }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-panel p-5 border-l-2 border-[#00E5C7] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#00E5C7]" />
            <span className="text-sm text-[#E5E5E7]">Ready to begin phase one?</span>
            <span className="text-xs text-[#8A8A8E] hidden sm:inline">All discovery evaluations begin with a free, no-obligation technical assessment.</span>
          </div>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="font-mono text-xs text-[#00E5C7] hover:underline">Schedule Discovery &rarr;</a>
        </div>
      </div>
    </section>
  );
}

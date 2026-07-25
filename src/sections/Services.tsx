import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function BrainIcon() { return <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 4C12.5 4 10 6.5 10 9C10 10.5 10.5 11.5 11.5 12.5C9 13 7 15 7 18C7 21 9.5 23.5 12.5 24C13 26 15 28 16 28C17 28 19 26 19.5 24C22.5 23.5 25 21 25 18C25 15 23 13 20.5 12.5C21.5 11.5 22 10.5 22 9C22 6.5 19.5 4 16 4Z" stroke="#4A9EFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 9C12 9 13 11 16 11C19 11 20 9 20 9M11 17C11 17 13 19 16 19C19 19 21 17 21 17M16 11V19M13 14H19" stroke="#4A9EFF" strokeWidth="1.2" strokeLinecap="round"/></svg>; }
function ChipIcon() { return <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect x="8" y="8" width="16" height="16" rx="2" stroke="#00E5C7" strokeWidth="1.5"/><path d="M12 4V8M16 4V8M20 4V8M12 24V28M16 24V28M20 24V28M4 12H8M4 16H8M4 20H8M24 12H28M24 16H28M24 20H28M14 14H18V18H14V14Z" stroke="#00E5C7" strokeWidth="1.2" strokeLinecap="round"/></svg>; }
function LinuxIcon() { return <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16 3C14 3 12 4 11 6C10 8 10 10 11 12C9 13 8 15 8 17C8 20 9 22 11 23C12 25 14 27 16 27C18 27 20 25 21 23C23 22 24 20 24 17C24 15 23 13 21 12C22 10 22 8 21 6C20 4 18 3 16 3Z" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 18C13 18 14 20 16 20C18 20 19 18 19 18M14 14V15M18 14V15" stroke="#F5A623" strokeWidth="1.2" strokeLinecap="round"/></svg>; }
function EdgeIcon() { return <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M5 8C5 6.895 5.895 6 7 6H25C26.105 6 27 6.895 27 8V24C27 25.105 26.105 26 25 26H7C5.895 26 5 25.105 5 24V8Z" stroke="#A78BFA" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 22H22M12 26V28M20 26V28M12 12H20V18H12V12Z" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round"/></svg>; }

const SERVICES = [
  { icon: <BrainIcon />, title: 'Autonomous Cognitive Systems', body: 'Design and deploy metacognitive AI runtimes with episodic memory, deterministic cognition loops, and evidence-grounded learning. Systems that think about their own thinking.', tags: ['Metacognition', 'Episodic Memory', 'Self-Direction'], color: '#4A9EFF' },
  { icon: <ChipIcon />, title: 'Close-to-Metal & Custom Builds', body: 'From custom Linux kernels to chipset-level control. We build the foundation others build on — bootloader to userspace, firmware to application layer.', tags: ['Custom Kernels', 'Firmware', 'GPU Optimization'], color: '#00E5C7' },
  { icon: <EdgeIcon />, title: 'Edge & Local AI Deployment', body: 'Deploy AI where data cannot leave the building. Multi-model orchestration within 8GB RAM, zero cloud dependency, full voice I/O, computer vision, and diffusion.', tags: ['Local Inference', 'Zero Cloud', 'Edge Deploy'], color: '#A78BFA' },
  { icon: <LinuxIcon />, title: 'AI-Native Application Development', body: 'Full-stack applications with deep AI integration — real-time cognition dashboards, voice interfaces, autonomous agent coordination, and multi-modal I/O.', tags: ['Full-Stack', 'Voice UI', 'Agentic Systems'], color: '#F5A623' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.svc-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#141415' }}>
      <div className="content-max section-pad-x">
        <span className="svc-label section-label">SERVICES</span>
        <h2 className="svc-heading section-heading mt-3">What We Build</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[640px] leading-relaxed">
          Omega AI LLC offers deep technical expertise in autonomous systems, edge AI, and custom infrastructure. We partner with organizations that need more than off-the-shelf solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {SERVICES.map((svc) => (
            <div key={svc.title} className="glass-panel float-3d corner-accent p-8">
              <div style={{ color: svc.color }}>{svc.icon}</div>
              <h3 className="text-xl text-white font-medium mt-5 tracking-tight">{svc.title}</h3>
              <p className="text-sm text-[#8A8A8E] mt-3 leading-relaxed">{svc.body}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {svc.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[11px] px-3 py-1 rounded" style={{ background: `${svc.color}15`, color: svc.color }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-panel p-6 border-l-2 border-[#F5A623]">
          <div className="flex items-start gap-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 flex-shrink-0">
              <circle cx="10" cy="10" r="9" stroke="#F5A623" strokeWidth="1.5" />
              <path d="M10 6V10M10 13V14" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div>
              <p className="text-sm text-[#E5E5E7] font-medium">Pricing varies depending on project scope</p>
              <p className="text-sm text-[#8A8A8E] mt-1 leading-relaxed">Every engagement is unique. We do not publish fixed price lists because each project involves different hardware requirements, integration complexity, timeline constraints, and ongoing support needs. All engagements begin with a free consultation — we will provide a detailed proposal tailored to your specific situation.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

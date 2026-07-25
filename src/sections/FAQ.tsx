import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  { q: 'Is my data secure? Does anything leave our premises?', a: 'Nothing leaves your hardware unless you explicitly configure it to. Omega runs entirely on local infrastructure — no cloud inference, no data transmission, no third-party API calls. Your data never touches the internet.' },
  { q: 'What hardware do we need?', a: 'Minimum: 8 GB RAM and any modern integrated GPU (we have validated on a $400 laptop with an AMD 860M iGPU). For larger deployments, we recommend 16-32 GB RAM and a dedicated GPU. We assess your existing hardware during Discovery and design accordingly.' },
  { q: 'How long does a typical deployment take?', a: 'Edge AI deployments typically take 4-8 weeks from Discovery to production, depending on scope. Close-to-metal custom builds may take 8-16 weeks. We provide detailed timelines during the Architecture phase.' },
  { q: 'Do you offer ongoing support after deployment?', a: 'Yes. All engagements include a 90-day warranty period post-deployment. Extended support contracts with SLA-backed response times are available. We also offer quarterly system health reviews and performance optimization.' },
  { q: 'Can you work with our existing infrastructure?', a: 'Absolutely. We specialize in integrating with existing systems — industrial controllers, ROS2 robotic stacks, healthcare IT infrastructure, defense networks. We design around your constraints, not against them.' },
  { q: 'Do we need AI expertise in-house?', a: 'No. We handle the full stack — from hardware configuration to user-facing applications. We do recommend having at least one technical point of contact on your side, but no prior AI or ML experience is required.' },
  { q: 'How is pricing structured?', a: 'Every project is scoped individually based on complexity, hardware requirements, timeline, and integration needs. We provide detailed proposals after the Discovery phase. All engagements begin with a free consultation.' },
  { q: 'What industries do you work with?', a: 'Defense, robotics, industrial automation, healthcare, and research organizations. If your AI needs to run where the cloud cannot reach — we are who you call.' },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.faq-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggle = (index: number) => { setOpenIndex(openIndex === index ? null : index); };

  return (
    <section id="faq" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#141415' }}>
      <div className="content-max section-pad-x">
        <span className="faq-label section-label">FAQ</span>
        <h2 className="faq-heading section-heading mt-3">Common Questions</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[640px] leading-relaxed">
          Straight answers to the questions we hear most often. If you do not see what you are looking for, reach out — we are happy to discuss your specific situation.
        </p>

        <div className="mt-12 space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="glass-panel overflow-hidden transition-all duration-300">
                <button onClick={() => toggle(index)} className="w-full flex items-center justify-between gap-4 p-6 text-left">
                  <span className="text-[15px] text-[#E5E5E7] font-medium leading-snug">{faq.q}</span>
                  <span className="flex-shrink-0 text-[#5A6A8A] text-xl font-light transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                <div className="transition-all duration-300 ease-out" style={{ maxHeight: isOpen ? '300px' : '0px', opacity: isOpen ? 1 : 0, overflow: 'hidden' }}>
                  <div className="px-6 pb-6">
                    <p className="text-sm text-[#8A8A8E] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

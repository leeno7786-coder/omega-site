import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 py-32 lg:py-40" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="contact-content max-w-[600px] mx-auto text-center px-6">
        <span className="section-label">GET IN TOUCH</span>
        <h2 className="text-[clamp(36px,5vw,56px)] text-white font-normal tracking-[-0.02em] leading-[1.1] mt-4">Let's Build the Future</h2>
        <p className="text-base text-[#8A8A8E] mt-5 leading-relaxed">
          Whether you need a custom AI system, edge deployment, or a close-to-metal build, we'd love to hear about your project.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a href="mailto:noahlee@omega2ai.com" className="relative inline-block text-[clamp(20px,3vw,28px)] text-[#4A9EFF] font-normal hover:text-[#A8D8FF] transition-colors duration-300" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            noahlee@omega2ai.com
            <span className="absolute left-0 bottom-0 h-px bg-[#4A9EFF] transition-all duration-300 ease-out" style={{ width: hovered ? '100%' : '0%' }} />
          </a>
          <a href="mailto:mitchellray@omega2ai.com" className="relative inline-block text-[clamp(16px,2vw,20px)] text-[#5A6A8A] font-normal hover:text-[#4A9EFF] transition-colors duration-300">
            mitchellray@omega2ai.com
          </a>
        </div>

        <div className="flex items-center justify-center gap-12 mt-12">
          <span className="font-mono text-xs text-[#8A8A8E]">Based in US</span>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.about-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="about-label section-label">ABOUT</span>
        <h2 className="about-heading section-heading mt-3">Built on the Edge,<br />Designed for Autonomy</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10 max-w-[900px]">
          <div>
            <p className="text-base text-[#8A8A8E] leading-relaxed">
              Omega AI LLC is an autonomous systems architecture firm specializing in
              local-first AI, edge inference, and close-to-metal optimization. We design
              cognitive systems that think, learn, and adapt — entirely on your hardware,
              with zero cloud dependency.
            </p>
            <p className="text-base text-[#8A8A8E] mt-4 leading-relaxed">
              Founded by <span className="text-[#E5E5E7]">Noah Lee</span>, <span className="text-[#E5E5E7]">Mitchell Ray</span>, and <span className="text-[#E5E5E7]">Larone Williamson</span> — Omega AI LLC operates at the intersection of machine learning, systems engineering, and hardware-level control. From custom Linux kernels to multi-model orchestration on integrated GPUs, we build the foundation that others build on top of.
            </p>
          </div>
          <div>
            <p className="text-base text-[#8A8A8E] leading-relaxed">
              Our flagship runtime — Omega 3.0 — demonstrates what is possible: thirteen
              specialized models orchestrated within 8 GB of RAM, scoring 69.2% on the
              industry-standard LongMemEval-S benchmark using only a local 4B parameter
              model. All on a $400 laptop with a single integrated GPU.
            </p>
            <p className="text-base text-[#8A8A8E] mt-4 leading-relaxed">
              We partner with organizations that need more than off-the-shelf solutions —
              defense, robotics, industrial automation, healthcare, and research. If your
              AI needs to run where the cloud cannot reach, we are who you call.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-10">
          {['Local-First AI', 'Edge Inference', 'Close-to-Metal', 'Autonomous Systems', 'Custom Linux', 'Multi-Model Orchestration', 'Patent Pending'].map((tag) => (
            <span key={tag} className="font-mono text-[11px] px-3 py-1.5 rounded bg-[rgba(74,158,255,0.08)] text-[#4A9EFF]">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

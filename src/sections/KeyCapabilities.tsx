import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  { title: 'Autonomous Cognition', body: 'A self-directing mind that sets its own goals, evaluates its own performance, and adapts its behavior through metacognitive reflection. Every episode teaches the system something new.', tags: ['Metacognition', 'Curiosity Engine', 'Self-Direction'] },
  { title: 'Episodic Memory', body: 'A structured memory cortex with deterministic recall. The v2 engine hops the entire graph with parallel recall processes — 0.2ms aggressive recall with perfect candidates and zero noise churn in the verified lane.', tags: ['Graph-Hop', 'Parallel Recall', 'Zero Noise'] },
  { title: 'Edge & Local-First', body: 'Built to run entirely on local hardware. Multi-model runtime with GPU lease management, process isolation, and zero cloud dependency. Your data never leaves your machine.', tags: ['Local Inference', 'GPU Lease', 'Zero Cloud'] },
];

export default function KeyCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cap-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.cap-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-24 lg:py-32" style={{ backgroundColor: '#141415' }}>
      <div className="content-max section-pad-x">
        <span className="cap-label section-label">CAPABILITIES</span>
        <h2 className="cap-heading section-heading mt-3">What Omega 3.0 Can Do</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {CAPABILITIES.map((cap) => (
            <div key={cap.title} className="rounded-xl p-10 border-2 border-[#374151] bg-[#111827] hover:border-[#4A9EFF] hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl text-white font-medium mt-6 tracking-tight">{cap.title}</h3>
              <p className="text-sm text-[#8A8A8E] mt-3 leading-relaxed">{cap.body}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {cap.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(0,229,199,0.08)] text-[#00E5C7]">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

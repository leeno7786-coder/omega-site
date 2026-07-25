import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import memoryGraphImg from '../assets/memory-graph.png';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { label: 'Force-Directed Layout', desc: 'Memories self-organize by semantic proximity in real time' },
  { label: 'Click to Expand', desc: 'Any node reveals its full memory record — source, timestamp, content' },
  { label: 'Live Growth', desc: 'Watch the graph grow as Omega learns — new nodes appear in real time' },
  { label: 'Terminal Nodes', desc: 'Deepest memories open live memory files directly from the graph' },
];

export default function MemoryGraph() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.mg-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.mg-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#141415' }}>
      <div className="content-max section-pad-x">
        <span className="mg-label section-label">MEMORY VISUALIZATION</span>
        <h2 className="mg-heading section-heading mt-3">Watch It Think in Real Time</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[680px] leading-relaxed">
          Omega 3.0 includes a live, interactive 3D memory node graph that visualizes the entire Dewey memory cortex as it grows. Every memory is a node. Every connection is a relationship. Click any node to see its source, timestamp, and full content.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
          <div className="lg:col-span-3 rounded-xl overflow-hidden border border-[#2A5A8A] bg-[#111827]">
            <img src={memoryGraphImg} alt="Omega 3.0 live memory node graph" className="w-full h-auto" loading="lazy" />
            <div className="px-5 py-3 border-t border-[#1A2A3A] flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider">Live Memory Graph — Settings Panel</span>
              <span className="font-mono text-[10px] text-[#4A9EFF]">current_trajectory · 3,988 bytes</span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {FEATURES.map((f) => (
              <div key={f.label} className="p-5 rounded-xl bg-[#111827] border border-[#1A2A3A]">
                <span className="text-sm text-white font-medium">{f.label}</span>
                <p className="text-xs text-[#8A8A8E] mt-1 leading-relaxed">{f.desc}</p>
              </div>
            ))}
            <div className="p-5 rounded-xl bg-[rgba(74,158,255,0.04)] border border-[#2A4A6A]">
              <span className="font-mono text-[10px] text-[#4A9EFF] uppercase tracking-wider">Dewey 3D Memory Cortex</span>
              <p className="text-xs text-[#8A8A8E] mt-2 leading-relaxed">The graph is a live projection of the Dewey filesystem — canonical truth for all memories. Every node is source-ledgered, verifier-gated, and recall-proofed.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  { name: 'PRESSURE', label: 'Ignition', description: 'The ignition layer. Gathers signal from all contributors and evaluates whether a new cognitive episode should begin.', tags: ['Episode Gate', 'Signal Aggregation', 'Neuromodulation'] },
  { name: 'GLOBAL A', label: 'Intent Router', description: 'Routes high-level intent to the appropriate cognitive pathway. Operator-directed, autonomous curiosity, or reflex.', tags: ['Intent Routing', 'Curiosity', 'Autonomy'] },
  { name: 'META A', label: 'Action Pack', description: 'Deterministic action and tool selection. Pure schema-driven dispatch. Selects skills via keyword routing.', tags: ['Skill Routing', 'Tool Dispatch', 'Deterministic'] },
  { name: 'AUTO', label: 'Model Execution', description: 'The execution layer. Dispatches to the multi-model runtime, jailed code execution, browser automation, voice I/O.', tags: ['Multi-Model', 'Code Execution', 'Browser Agent'] },
  { name: 'META B', label: 'Reflection', description: 'Post-execution analysis. Examines output, validates against schemas, prepares outcome for higher loops.', tags: ['Outcome Validation', 'Schema Check', 'Deterministic'] },
  { name: 'GLOBAL B', label: 'Outcome', description: 'Folds all loop outputs into a unified episode package. Closes the cognitive cycle for metacognitive review.', tags: ['Outcome Pack', 'Episode Closure', 'Folding'] },
  { name: 'OMEGA', label: 'Metacognition', description: 'The mind observing itself. 5W1H analysis — what happened, why, what was learned, how to adapt.', tags: ['5W1H Analysis', 'Learning', 'Adaptation'] },
  { name: 'DEEPSLEEP', label: 'Consolidation', description: 'Memory consolidation and episode closure. Promotes important memories, runs strength decay, reseeds.', tags: ['Memory Consolidation', 'Strength Decay', 'Reseed'] },
];

export default function ArchitectureOverview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.arch-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.arch-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.arch-intro', { opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const getCardStyle = (i: number) => {
    const isActive = activeIndex === i;
    const isHovered = hoveredIndex === i;
    if (isActive) {
      return { backgroundColor: '#1f2937', borderColor: '#4A9EFF', boxShadow: '0 0 20px rgba(74,158,255,0.3)' };
    }
    if (isHovered) {
      return { backgroundColor: '#1a2236', borderColor: '#4A7ACC', boxShadow: '0 0 12px rgba(74,158,255,0.15)' };
    }
    return { backgroundColor: '#111827', borderColor: '#374151', boxShadow: 'none' };
  };

  return (
    <section id="technology" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="arch-label section-label">TECHNOLOGY</span>
        <h2 className="arch-heading section-heading mt-3">An Autonomous Mind, Deconstructed</h2>
        <p className="arch-intro mt-4 text-[#8A8A8E] text-base max-w-[720px] leading-relaxed">
          Omega 3.0 is not a chatbot. It is a metacognitive runtime — a system that thinks about its own thinking. Every decision flows through a deterministic cascade of specialized cognitive loops.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-12">
          {LAYERS.map((layer, i) => (
            <button
              key={layer.name}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative w-full py-5 px-4 rounded-lg border-2 cursor-pointer transition-all duration-300 text-left"
              style={getCardStyle(i)}
            >
              <span className="font-mono text-[10px] text-[#4A9EFF] uppercase tracking-[0.12em]">{layer.label}</span>
              <span className="block font-mono text-[13px] text-white uppercase tracking-wide mt-1">{layer.name}</span>
              <span className="absolute top-2 right-3 font-mono text-[10px] text-[#4B5563]">{String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center justify-center mt-4 gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#4B5563]">Signal Flow</span>
          <span className="text-[#4A9EFF] text-lg tracking-[0.15em]">{'\u2192 \u2192 \u2192 \u2192 \u2192 \u2192 \u2192 \u2192'}</span>
        </div>

        <div className="overflow-hidden transition-all duration-500 ease-in-out" style={{ maxHeight: activeIndex !== null ? '300px' : '0px', opacity: activeIndex !== null ? 1 : 0, marginTop: activeIndex !== null ? '24px' : '0px' }}>
          {activeIndex !== null && (
            <div className="rounded-xl p-6 md:p-8 bg-[#141415] border border-[#2A5A8A]">
              <div className="flex items-center gap-3">
                <h3 className="text-xl text-white font-normal tracking-tight">{LAYERS[activeIndex].name}</h3>
                <span className="font-mono text-xs text-[#8A8A8E]">{LAYERS[activeIndex].label}</span>
              </div>
              <p className="text-sm text-[#8A8A8E] mt-3 leading-relaxed max-w-[700px]">{LAYERS[activeIndex].description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {LAYERS[activeIndex].tags.map((tag) => (
                  <span key={tag} className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(74,158,255,0.12)] text-[#4A9EFF]">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

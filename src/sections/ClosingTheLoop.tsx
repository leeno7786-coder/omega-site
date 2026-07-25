import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOOP_STEPS = [
  { num: '01', label: 'Ask', color: '#F5A623', desc: 'Omega identifies knowledge gaps and initiates clarifying questions. Not reactive — proactive. It asks before being told.', evidence: '"Should I prioritize finding resources that build up from basic probability axioms?"' },
  { num: '02', label: 'Learn', color: '#4A9EFF', desc: 'Operator guidance is ingested, synthesized, and committed to episodic memory through the SourceLedger with full provenance.', evidence: 'Synthesized Binomial → Poisson → Normal sequence with parameters n, p, λ, μ, σ' },
  { num: '03', label: 'Theorize', color: '#A78BFA', desc: 'The OMEGA loop performs 5W1H analysis: what was learned, why it matters, how it connects to existing knowledge, and what gaps remain.', evidence: 'Mastery gap: 61%. Pressure Candidate created. Active episode status.' },
  { num: '04', label: 'Apply — Code', color: '#00E5C7', desc: 'The classic AUTO execution channel. Jailed code, browser automation, file I/O, tool use — deterministic motor programs with evidence-grounded learning.', evidence: 'ROS2 waypoint generation, image diffusion, web browsing, voice synthesis' },
  { num: '05', label: 'Apply — Substantive Dialogue', color: '#E5E5E7', desc: 'The new channel. Omega applies learned knowledge by initiating dialogue — presenting findings, proposing next steps, and requesting confirmation. The conversation itself is the actuator.', evidence: '"Please provide foundational introductory materials..." — unprompted, memory-driven, goal-directed' },
];

export default function ClosingTheLoop() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ctl-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.ctl-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="ctl-label section-label">CLOSING THE LOOP</span>
        <h2 className="ctl-heading section-heading mt-3">The Fifth Channel: Substantive Dialogue</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[720px] leading-relaxed">
          Omega 3.0 already applies knowledge through code — jailed execution, browser automation,
          ROS2 payload generation. Now it has the final channel: <span className="text-white">substantive dialogue</span>.
          The dialogue is the actuator. Ask. Learn. Theorize. Apply — through code <em>and</em> through dialogue. The loop is closed.
        </p>

        <div className="mt-12 space-y-4">
          {LOOP_STEPS.map((step, i) => (
            <div key={step.num} className="rounded-xl p-6 bg-[#111827] border transition-colors duration-300" style={{ borderColor: step.color === '#E5E5E7' ? '#3A5A8A' : step.color + '40' }}>
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0 flex items-center gap-3 md:w-48">
                  <span className="font-mono text-[28px] font-semibold" style={{ color: step.color === '#E5E5E7' ? '#4A9EFF' : step.color, opacity: 0.4 }}>{step.num}</span>
                  <span className="font-mono text-sm uppercase tracking-wider" style={{ color: step.color }}>{step.label}</span>
                  {step.num === '05' && <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[rgba(229,229,231,0.1)] text-[#E5E5E7] uppercase">New</span>}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#E5E5E7] leading-relaxed">{step.desc}</p>
                  <p className="text-xs text-[#5A6A8A] mt-2 font-mono">{step.evidence}</p>
                </div>
              </div>
              {i < LOOP_STEPS.length - 1 && <div className="flex justify-center mt-4 mb-0"><span className="text-[#2A5A8A] text-lg">{'\u2193'}</span></div>}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl p-8 md:p-10 border border-[#3A5A8A] bg-[#111827]" style={{ boxShadow: '0 0 30px rgba(74,158,255,0.08)' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-[#E5E5E7]" style={{ boxShadow: '0 0 10px rgba(229,229,231,0.3)' }} />
            <span className="font-mono text-[10px] text-[#E5E5E7] uppercase tracking-[0.12em]">The Missing Channel — Now Active</span>
          </div>
          <h3 className="text-xl text-white font-normal tracking-tight mb-4">Proactive Dialogue as Application</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#E5E5E7] leading-relaxed">
                Before this channel, Omega could ask (input) and execute code (output). But between learning and coding lay a gap — the <em>application of knowledge through conversation itself</em>. Now when Omega learns something, it doesn't just store it and wait for a coding task. It <span className="text-white">initiates dialogue to apply that knowledge</span>.
              </p>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-[#0A0A0B] border border-[#1A2A3A]">
                <span className="font-mono text-[10px] text-[#5A6A8A] uppercase tracking-wider">Motor Output Channels</span>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(0,229,199,0.08)] text-[#00E5C7]">Jailed Code Execution</span>
                  <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(74,158,255,0.08)] text-[#4A9EFF]">Browser Automation</span>
                  <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(245,166,35,0.08)] text-[#F5A623]">ROS2 Payload</span>
                  <span className="font-mono text-[11px] px-3 py-1 rounded bg-[rgba(229,229,231,0.1)] text-[#E5E5E7] border border-[#3A5A8A]">Proactive Dialogue</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-[#5A6A8A] text-sm italic">Ask. Learn. Theorize. Apply. The loop is closed.</p>
        </div>
      </div>
    </section>
  );
}

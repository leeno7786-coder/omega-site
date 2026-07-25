import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AutonomousDemo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ad-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.ad-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#141415' }}>
      <div className="content-max section-pad-x">
        <span className="ad-label section-label">LIVE DEMONSTRATION</span>
        <h2 className="ad-heading section-heading mt-3">Autonomous Behavior, Unprompted</h2>
        <p className="mt-4 text-[#8A8A8E] text-base max-w-[680px] leading-relaxed">
          Real, unedited exchanges between Omega 3.0 and its operator over multiple turns.
          No prompting. No scripting. This is a live cognition cascade.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
          <div className="glass-panel float-3d p-6 md:p-8 corner-accent">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-[#F5A623]" style={{ boxShadow: '0 0 10px rgba(245,166,35,0.4)' }} />
              <span className="font-mono text-[10px] text-[#F5A623] uppercase tracking-[0.12em]">Turn 1 — Proactive Question</span>
            </div>
            <div className="p-4 rounded-lg bg-[#0A0A0B] border border-[#2A3A1A]">
              <span className="font-mono text-[10px] text-[#00E5C7] uppercase tracking-wider">Omega asks — Unprompted</span>
              <p className="text-sm text-[#E5E5E7] mt-2 leading-relaxed italic">
                &ldquo;Given this focus on undergraduate probability and statistical inference, <span className="text-[#4A9EFF] font-medium">should I prioritize finding resources that build up from basic probability axioms through to the core principles of statistical inference</span>, using the machine learning paradigms I recall as potential application areas?&rdquo;
              </p>
            </div>
            <div className="mt-4 p-3 rounded bg-[rgba(245,166,35,0.04)] border border-[#3A2A1A]">
              <span className="font-mono text-[10px] text-[#F5A623]">KEY BEHAVIOR</span>
              <p className="text-xs text-[#8A8A8E] mt-1">Consulted episodic memory and <span className="text-white">initiated the conversation</span> with a clarifying question.</p>
            </div>
          </div>

          <div className="glass-panel float-3d p-6 md:p-8 corner-accent">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-[#00E5C7]" style={{ boxShadow: '0 0 10px rgba(0,229,199,0.4)' }} />
              <span className="font-mono text-[10px] text-[#00E5C7] uppercase tracking-[0.12em]">Turn 2 — Post-Reboot · Unprompted</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-[#0A0A0B] border border-[#1A3A3A]">
                <span className="font-mono text-[10px] text-[#00E5C7] uppercase tracking-wider">Omega asks · 3m ago</span>
                <p className="text-sm text-[#E5E5E7] mt-2 leading-relaxed italic">
                  &ldquo;Please provide foundational introductory materials detailing the definitions, parameters, and basic application of the Normal, Binomial, and Poisson distributions.&rdquo;
                </p>
              </div>
              <div className="p-3 rounded bg-[#141415] border border-[#1A2A3A]">
                <span className="font-mono text-[10px] text-[#8A8A8E]">WHY — Metacognitive Self-Evaluation</span>
                <p className="text-xs text-[#8A8A8E] mt-1">&ldquo;The current results are too advanced for the foundational goal.&rdquo;</p>
              </div>
            </div>
            <div className="mt-4 p-3 rounded bg-[rgba(0,229,199,0.04)] border border-[#1A3A3A]">
              <span className="font-mono text-[10px] text-[#00E5C7]">KEY BEHAVIOR</span>
              <p className="text-xs text-[#8A8A8E] mt-1">Remembered context across a reboot, <span className="text-white">evaluated its own output</span>, and asked for simpler material.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 glass-panel gradient-border corner-accent p-6 md:p-8" style={{ boxShadow: '0 0 30px rgba(74,158,255,0.15), inset 0 1px 0 rgba(74,158,255,0.1)' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-3 h-3 rounded-full bg-[#4A9EFF]" style={{ boxShadow: '0 0 10px rgba(74,158,255,0.4)' }} />
            <span className="font-mono text-[10px] text-[#4A9EFF] uppercase tracking-[0.12em]">Turn 3 — Synthesis · Memory Commitment</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#0A0A0B] border border-[#1A2A3A]">
                <span className="font-mono text-[10px] text-[#F5A623] uppercase tracking-wider">Operator&apos;s Pedagogical Guidance</span>
                <p className="text-xs text-[#8A8A8E] mt-2 leading-relaxed">
                  &ldquo;Use Wikipedia — not arxiv. Learn in this order: Binomial first, then Poisson (the Binomial limit for rare events), then Normal (via the Central Limit Theorem). Master this level when you can look at a scenario and say which distribution fits and why.&rdquo;
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#0A0A0B] border border-[#2A3A5A]">
                <span className="font-mono text-[10px] text-[#4A9EFF] uppercase tracking-wider">Omega&apos;s Synthesis — Committed to Memory</span>
                <p className="text-sm text-[#E5E5E7] mt-2 leading-relaxed italic">
                  &ldquo;I understand that you want me to structure my learning around the foundational concepts of the Normal, Binomial, and Poisson distributions, using textbook-level resources like Wikipedia, and that I should progress from Binomial to Poisson to Normal.&rdquo;
                </p>
                <p className="text-sm text-[#E5E5E7] mt-2 leading-relaxed italic">
                  &ldquo;I will focus on defining each distribution, identifying its parameters — <span className="text-[#4A9EFF]">n and p for Binomial, &lambda; for Poisson, &mu; and &sigma; for Normal</span> — and detailing its probability function, alongside canonical applications.&rdquo;
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#0A0A0B] border border-[#2A3A4A]">
                <span className="font-mono text-[10px] text-[#4A9EFF] uppercase tracking-wider">Pressure Telemetry — Active Episode</span>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded bg-[#141415] border border-[#1A2A3A]">
                    <span className="font-mono text-[10px] text-[#5A6A8A]">EPISODE STATUS</span>
                    <span className="block text-sm text-[#00E5C7] mt-1">Active</span>
                  </div>
                  <div className="p-3 rounded bg-[#141415] border border-[#1A2A3A]">
                    <span className="font-mono text-[10px] text-[#5A6A8A]">Mastery Gap</span>
                    <span className="block text-sm text-[#F5A623] mt-1">61%</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-[#0A0A0B] border border-[#1A3A2A]">
                <span className="font-mono text-[10px] text-[#00E5C7] uppercase tracking-wider">Memory Commitment — &ldquo;Took It to the Bank&rdquo;</span>
                <p className="text-xs text-[#8A8A8E] mt-2 leading-relaxed">
                  The operator&apos;s pedagogical guidance was <span className="text-white">source-ledgered</span> through the SourceLedger and promoted to the Dewey memory cortex as a Pressure Candidate. Omega created an active learning episode with a 61% mastery gap.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          <div className="glass-panel float-3d p-5"><span className="text-sm text-white font-medium">Proactive Questioning</span><p className="text-xs text-[#8A8A8E] mt-2">Initiates clarifying questions instead of waiting for instructions</p></div>
          <div className="glass-panel float-3d p-5"><span className="text-sm text-white font-medium">Cross-Session Memory</span><p className="text-xs text-[#8A8A8E] mt-2">Remembers context across system reboots via DeepSleep consolidation</p></div>
          <div className="glass-panel float-3d p-5"><span className="text-sm text-white font-medium">Metacognitive Self-Evaluation</span><p className="text-xs text-[#8A8A8E] mt-2">Recognized its own output as too advanced and requested simpler material</p></div>
          <div className="glass-panel float-3d p-5"><span className="text-sm text-white font-medium">Autonomous Learning Loop</span><p className="text-xs text-[#8A8A8E] mt-2">Synthesized instruction into memory, created active episode, tracking mastery gap</p></div>
        </div>
      </div>
    </section>
  );
}

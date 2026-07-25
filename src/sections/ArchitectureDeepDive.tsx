import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function TerminalWindow({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-charcoal border border-muted-blue rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-muted-blue">
        <div className="w-2 h-2 rounded-full bg-red-500/80" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
        <div className="w-2 h-2 rounded-full bg-green-500/80" />
        <span className="font-mono text-xs text-warm-gray ml-2">{title}</span>
      </div>
      <div className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

const INTERFACES = [
  'HUD Web Interface (:13310)',
  'TypeScript CLI Bridge (:8092)',
  'Browser Automation Extension',
  'Voice I/O (Kokoro TTS + Whisper STT)',
  'Multi-Agent Coordination Bus',
];

export default function ArchitectureDeepDive() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.deep-label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.from('.deep-heading', { opacity: 0, y: 20, duration: 0.8, delay: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="architecture" ref={sectionRef} className="relative z-10 py-20 lg:py-28" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <span className="deep-label section-label">ARCHITECTURE</span>
        <h2 className="deep-heading section-heading mt-3">Built for Serious Work</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-16">
          <div>
            <TerminalWindow title="memory/">
              <div>
                <span className="code-keyword">SourceLedger</span>
                <span className="code-identifier"> → Dewey Corpus</span>
              </div>
              <div className="mt-1">
                <span className="code-identifier">→ Graph Projection </span>
                <span className="code-comment">(MemoryLeafV2)</span>
              </div>
              <div className="mt-1">
                <span className="code-keyword">→ ParallelRecall</span>
                <span className="code-identifier"> → GraphHop </span>
                <span className="code-comment">(entire graph)</span>
              </div>
              <div className="mt-1">
                <span className="code-keyword">→ AggressiveRecall</span>
                <span className="code-identifier"> → VerifiedLane</span>
              </div>
              <div className="mt-1">
                <span className="code-identifier">→ </span>
                <span className="code-keyword">RecallVerifier</span>
                <span className="code-identifier"> → Upstream Cognition</span>
              </div>
              <div className="mt-4">
                <span className="code-comment">{'//'} 0.2ms aggressive recall — zero noise churn</span>
              </div>
              <div>
                <span className="code-comment">{'//'} Parallel graph-hop with perfect candidates</span>
              </div>
              <div>
                <span className="code-comment">{'//'} Verified lane: deterministic, no hallucination</span>
              </div>
            </TerminalWindow>
          </div>

          <div>
            <h3 className="text-[28px] text-white font-normal tracking-tight">Memory Engine v2</h3>
            <p className="text-base text-[#8A8A8E] mt-4 leading-relaxed">
              A gate-first memory system where every write passes through the SourceLedger, every
              recall is verifier-gated with four possible verdicts, and nothing unverified ever
              reaches upstream cognition. The v2 engine can hop the entire graph while performing
              parallel recall processes — delivering perfect candidates with zero noise churn in
              the verified lane.
            </p>
            <div className="flex flex-wrap gap-8 mt-8">
              <div>
                <div className="text-[32px] text-[#00E5C7] font-normal">0.2ms</div>
                <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">Aggressive Recall</div>
              </div>
              <div>
                <div className="text-[32px] text-[#4A9EFF] font-normal">100%</div>
                <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">Zero Noise Churn</div>
              </div>
              <div>
                <div className="text-[32px] text-[#F5A623] font-normal">3,935</div>
                <div className="font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wide mt-1">Tests Passing</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-24">
          <div className="order-2 lg:order-1">
            <h3 className="text-[28px] text-white font-normal tracking-tight">Multi-Model Runtime</h3>
            <p className="text-base text-[#8A8A8E] mt-4 leading-relaxed">
              The omega-portable-lite runtime manages local model inference with intelligent GPU
              lease allocation, preventing thrash during builds. Supports multiple model slots with
              hot-swap capability, jailed code execution, and full voice I/O pipeline with Kokoro
              TTS and Whisper STT.
            </p>
            <div className="flex flex-col gap-4 mt-6">
              {INTERFACES.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#4A9EFF] flex-shrink-0" />
                  <span className="text-[15px] text-[#E5E5E7]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <TerminalWindow title="omega/">
              <div>
                <span className="code-prompt">$ </span>
                <span className="code-identifier">python boot.py</span>
              </div>
              <div className="mt-2">
                <span className="code-tag">[BOOT]</span>
                <span className="code-identifier"> Readiness: </span>
                <span className="code-success">OK</span>
              </div>
              <div className="mt-1">
                <span className="code-tag">[PRESSURE]</span>
                <span className="code-identifier"> Tick 001 — Ignition</span>
              </div>
              <div className="mt-1">
                <span className="code-tag">[GLOBAL_A]</span>
                <span className="code-identifier"> Intent: operator-chat</span>
              </div>
              <div className="mt-1">
                <span className="code-tag">[META_A]</span>
                <span className="code-identifier"> Skill: code-execution</span>
              </div>
              <div className="mt-1">
                <span className="code-tag">[AUTO]</span>
                <span className="code-identifier"> Model: gemma-e4b ✓</span>
              </div>
              <div className="mt-1">
                <span className="code-tag">[OMEGA]</span>
                <span className="code-identifier"> 5W1H analysis complete</span>
              </div>
              <div className="mt-1">
                <span className="code-tag">[DEEPSLEEP]</span>
                <span className="code-identifier"> Consolidation: 3 memories</span>
              </div>
              <div className="mt-3">
                <span className="code-prompt">omega_3.0 {'>'} running</span>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </div>
    </section>
  );
}

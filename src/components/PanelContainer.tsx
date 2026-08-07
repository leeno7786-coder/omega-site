import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from '../sections/Hero';
import TrustBar from '../sections/TrustBar';
import AutonomousDemo from '../sections/AutonomousDemo';

import OmegaShowcase from '../sections/OmegaShowcase';
import ArchitectureOverview from '../sections/ArchitectureOverview';
import ArchitectureDeepDive from '../sections/ArchitectureDeepDive';
import AgentLayer from '../sections/AgentLayer';
import MemoryGraph from '../sections/MemoryGraph';
import ImageGeneration from '../sections/ImageGeneration';

import Benchmarks from '../sections/Benchmarks';
import ModelRuntime from '../sections/ModelRuntime';

import Services from '../sections/Services';
import Portability from '../sections/Portability';
import Process from '../sections/Process';

import About from '../sections/About';
import FAQ from '../sections/FAQ';
import Contact from '../sections/Contact';

import { PANELS } from '../config/panelsConfig';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PanelContainerProps {
  activePanelId: string;
  onSelectPanel: (panelId: string) => void;
}

export default function PanelContainer({ activePanelId, onSelectPanel }: PanelContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activePanelIndex = PANELS.findIndex((p) => p.id === activePanelId);
  const nextPanel = PANELS[activePanelIndex + 1];

  useEffect(() => {
    // Reset scroll & trigger GSAP animation on panel change
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
  }, [activePanelId]);

  return (
    <div ref={containerRef} className="w-full pt-28 pb-20 min-h-screen flex flex-col">
      {/* Dynamic Panel Header Banner */}
      <div className="content-max section-pad-x mb-8">
        <div className="glass-panel p-6 md:p-8 rounded-3xl border border-[#2A5A8A]/30 relative overflow-hidden bg-gradient-to-r from-[#111827] via-[#0A0A0B] to-[#111827]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A9EFF]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 text-[#4A9EFF] font-mono text-xs mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Panel {activePanelIndex + 1} of {PANELS.length}</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-normal text-white tracking-tight">
                {PANELS[activePanelIndex]?.title}
              </h1>
              <p className="mt-2 text-sm text-[#8A8A8E] max-w-2xl leading-relaxed">
                {PANELS[activePanelIndex]?.description}
              </p>
            </div>
            
            {/* Quick Section Anchor Pills */}
            <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
              {PANELS[activePanelIndex]?.subSections.map((sub) => (
                <a
                  key={sub.id}
                  href={`#${sub.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(sub.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[#8A8A8E] hover:text-white hover:border-[#4A9EFF]/40 transition-all"
                >
                  #{sub.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Render Panel Specific Content */}
      <main className="flex-1 space-y-12">
        {activePanelId === 'overview' && (
          <>
            <div id="hero"><Hero /></div>
            <div id="trustbar"><TrustBar /></div>
            <div id="demo"><AutonomousDemo /></div>
          </>
        )}

        {activePanelId === 'products' && (
          <>
            <div id="showcase"><OmegaShowcase /></div>
            <div id="architecture">
              <ArchitectureOverview />
              <div className="mt-12"><ArchitectureDeepDive /></div>
            </div>
            <div id="agent-layer"><AgentLayer /></div>
            <div id="memory-graph"><MemoryGraph /></div>
            <div id="image-gen"><ImageGeneration /></div>
          </>
        )}

        {activePanelId === 'benchmarks' && (
          <>
            <div id="benchmarks-chart"><Benchmarks /></div>
            <div id="runtime"><ModelRuntime /></div>
          </>
        )}

        {activePanelId === 'solutions' && (
          <>
            <div id="services"><Services /></div>
            <div id="portability"><Portability /></div>
            <div id="process"><Process /></div>
          </>
        )}

        {activePanelId === 'company' && (
          <>
            <div id="about"><About /></div>
            <div id="faq"><FAQ /></div>
            <div id="contact"><Contact /></div>
          </>
        )}
      </main>

      {/* Next Panel Footer Callout */}
      {nextPanel && (
        <div className="content-max section-pad-x mt-16">
          <button
            onClick={() => onSelectPanel(nextPanel.id)}
            className="w-full glass-panel p-6 rounded-2xl border border-[#2A5A8A]/30 hover:border-[#4A9EFF]/60 transition-all flex items-center justify-between group text-left"
          >
            <div>
              <span className="font-mono text-xs text-[#5A6A8A] uppercase tracking-wider">Up Next</span>
              <h4 className="text-lg text-white font-normal group-hover:text-[#4A9EFF] transition-colors mt-0.5">
                {nextPanel.title}
              </h4>
              <p className="text-xs text-[#8A8A8E] mt-1">{nextPanel.description}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 flex items-center justify-center text-[#4A9EFF] group-hover:bg-[#4A9EFF] group-hover:text-[#0A0A0B] transition-all">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

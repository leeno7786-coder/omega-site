import { useEffect, useState } from 'react';
import { Sparkles, Cpu, BarChart3, Layers, Building2, ChevronRight, Command } from 'lucide-react';
import { PANELS } from '../config/panelsConfig';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Cpu,
  BarChart3,
  Layers,
  Building2,
};

interface PanelSwitcherNavProps {
  activePanelId: string;
  onSelectPanel: (panelId: string) => void;
  activeSubSection?: string;
  onSelectSubSection?: (subId: string) => void;
}

export default function PanelSwitcherNav({
  activePanelId,
  onSelectPanel,
  activeSubSection,
  onSelectSubSection,
}: PanelSwitcherNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const activePanel = PANELS.find((p) => p.id === activePanelId) || PANELS[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0B]/90 backdrop-blur-xl border-b border-[#2A5A8A]/40 shadow-2xl py-2'
          : 'bg-[#0A0A0B]/60 backdrop-blur-md border-b border-[#2A5A8A]/20 py-3'
      }`}
    >
      <div className="content-max section-pad-x flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Active Panel Title */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={() => onSelectPanel('overview')}
            className="flex items-center gap-2 font-mono text-sm font-semibold text-white uppercase tracking-[0.12em] hover:text-[#4A9EFF] transition-colors group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 flex items-center justify-center group-hover:border-[#4A9EFF] transition-colors">
              <Sparkles className="w-4 h-4 text-[#4A9EFF]" />
            </div>
            <span>
              OMEGA AI <span className="text-[10px] text-[#5A6A8A] font-normal normal-case">LLC</span>
            </span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#5A6A8A] bg-[#111827]/80 px-2.5 py-1 rounded-full border border-[#2A5A8A]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5C7] animate-pulse" />
            <span className="text-white/80 font-medium">{activePanel.shortTitle}</span>
            {activePanel.badge && (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#4A9EFF]/20 text-[#4A9EFF] border border-[#4A9EFF]/30 font-semibold">
                {activePanel.badge}
              </span>
            )}
          </div>
        </div>

        {/* Primary Segmented Panel Switcher */}
        <nav className="flex items-center gap-1 bg-[#111827]/90 p-1.5 rounded-2xl border border-[#2A5A8A]/40 shadow-inner overflow-x-auto max-w-full no-scrollbar">
          {PANELS.map((panel, idx) => {
            const Icon = ICON_MAP[panel.iconName] || Sparkles;
            const isActive = panel.id === activePanelId;

            return (
              <button
                key={panel.id}
                onClick={() => onSelectPanel(panel.id)}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl font-medium text-xs transition-all duration-250 whitespace-nowrap group ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#4A9EFF]/20 via-[#00E5C7]/15 to-[#4A9EFF]/10 border border-[#4A9EFF]/50 shadow-[0_0_15px_rgba(74,158,255,0.25)]'
                    : 'text-[#8A8A8E] hover:text-white hover:bg-white/5 border border-transparent'
                }`}
                title={`${panel.title} (Press ${idx + 1})`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#4A9EFF]' : 'text-[#5A6A8A] group-hover:text-white'
                  }`}
                />
                <span>{panel.shortTitle}</span>

                {panel.badge && !isActive && (
                  <span className="hidden lg:inline-block text-[9px] px-1 py-0.2 rounded bg-white/5 text-[#8A8A8E] border border-white/10">
                    {panel.badge}
                  </span>
                )}

                <span className="hidden xl:inline-block text-[9px] font-mono text-[#5A6A8A] opacity-60 ml-0.5">
                  {idx + 1}
                </span>

                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-[#4A9EFF] shadow-[0_0_8px_#4A9EFF]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => onSelectPanel('company')}
            className="flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#4A9EFF] to-[#00E5C7] text-[#0A0A0B] font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(74,158,255,0.3)]"
          >
            <span>Contact Us</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sub-Section Quick Bar */}
      {activePanel.subSections && activePanel.subSections.length > 0 && (
        <div className="border-t border-[#2A5A8A]/15 bg-[#0A0A0B]/80 py-1 px-4">
          <div className="content-max section-pad-x flex items-center gap-3 overflow-x-auto no-scrollbar text-xs font-mono">
            <span className="text-[10px] text-[#5A6A8A] uppercase tracking-wider flex items-center gap-1">
              <Command className="w-3 h-3 text-[#4A9EFF]" /> Sections:
            </span>
            {activePanel.subSections.map((sub) => (
              <button
                key={sub.id}
                onClick={() => onSelectSubSection?.(sub.id)}
                className={`px-2.5 py-0.5 rounded-md text-[11px] transition-colors whitespace-nowrap ${
                  activeSubSection === sub.id
                    ? 'bg-[#4A9EFF]/15 text-[#4A9EFF] border border-[#4A9EFF]/30 font-medium'
                    : 'text-[#8A8A8E] hover:text-white hover:bg-white/5'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

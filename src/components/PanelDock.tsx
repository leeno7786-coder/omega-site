import { Sparkles, Cpu, BarChart3, Layers, Building2, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';
import { PANELS } from '../config/panelsConfig';

const ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Cpu,
  BarChart3,
  Layers,
  Building2,
};

interface PanelDockProps {
  activePanelId: string;
  onSelectPanel: (panelId: string) => void;
}

export default function PanelDock({ activePanelId, onSelectPanel }: PanelDockProps) {
  const currentIndex = PANELS.findIndex((p) => p.id === activePanelId);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectPanel(PANELS[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < PANELS.length - 1) {
      onSelectPanel(PANELS[currentIndex + 1].id);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-2">
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0A0A0B]/85 backdrop-blur-xl border border-[#2A5A8A]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        {/* Prev Panel Button */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-[#8A8A8E] hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          title="Previous Panel"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Panel Icon Quick Selector */}
        <div className="flex items-center gap-1 px-1 border-x border-[#2A5A8A]/20">
          {PANELS.map((panel) => {
            const Icon = ICON_MAP[panel.iconName] || Sparkles;
            const isActive = panel.id === activePanelId;

            return (
              <button
                key={panel.id}
                onClick={() => onSelectPanel(panel.id)}
                className={`relative w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[#4A9EFF]/20 text-[#4A9EFF] border border-[#4A9EFF]/50 shadow-[0_0_12px_rgba(74,158,255,0.3)]'
                    : 'text-[#5A6A8A] hover:text-white hover:bg-white/5'
                }`}
                title={panel.title}
              >
                <Icon className="w-4 h-4" />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#00E5C7]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Next Panel Button */}
        <button
          onClick={handleNext}
          disabled={currentIndex === PANELS.length - 1}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-[#8A8A8E] hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
          title="Next Panel"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Scroll to top */}
        <button
          onClick={handleScrollTop}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-[#4A9EFF] bg-[#4A9EFF]/10 hover:bg-[#4A9EFF]/20 border border-[#4A9EFF]/30 transition-all"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}

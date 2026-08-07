import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AnimatedOrbs from '../sections/AnimatedOrbs';
import NeuralConstellation from '../sections/NeuralConstellation';
import CursorGlow from '../sections/CursorGlow';
import Footer from '../sections/Footer';

import PanelSwitcherNav from '../components/PanelSwitcherNav';
import PanelContainer from '../components/PanelContainer';
import PanelDock from '../components/PanelDock';
import { PANELS, DEFAULT_PANEL_ID } from '../config/panelsConfig';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [activePanelId, setActivePanelId] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    const found = PANELS.find((p) => p.id === hash);
    return found ? found.id : DEFAULT_PANEL_ID;
  });

  const [activeSubSection, setActiveSubSection] = useState<string | undefined>();
  const [constellationVisible, setConstellationVisible] = useState(true);

  // Synchronize hash in URL when panel changes
  const handleSelectPanel = (panelId: string) => {
    setActivePanelId(panelId);
    setActiveSubSection(undefined);
    window.history.pushState(null, '', `#${panelId}`);
  };

  // Sub-section scroll handler
  const handleSelectSubSection = (subId: string) => {
    setActiveSubSection(subId);
    const element = document.getElementById(subId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard navigation shortcuts (1 - 5)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= PANELS.length) {
        handleSelectPanel(PANELS[num - 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Listen to browser hash changes (Back / Forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const found = PANELS.find((p) => p.id === hash);
      if (found) {
        setActivePanelId(found.id);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // NeuralConstellation background visibility control
  useEffect(() => {
    const handleScroll = () => {
      setConstellationVisible(window.scrollY < window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-[#4A9EFF]/30 selection:text-white">
      <NeuralConstellation visible={constellationVisible} />
      <AnimatedOrbs />
      <CursorGlow />

      <PanelSwitcherNav
        activePanelId={activePanelId}
        onSelectPanel={handleSelectPanel}
        activeSubSection={activeSubSection}
        onSelectSubSection={handleSelectSubSection}
      />

      <PanelContainer
        activePanelId={activePanelId}
        onSelectPanel={handleSelectPanel}
      />

      <PanelDock
        activePanelId={activePanelId}
        onSelectPanel={handleSelectPanel}
      />

      <Footer />
    </div>
  );
}

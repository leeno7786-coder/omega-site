import { useEffect, useRef, useState } from 'react';
import { SITE_NAV } from '../../content/siteContent';

interface SiteHeaderProps {
  currentPage: 'home' | 'omega-3' | 'autonomous-systems' | 'nanoai' | 'projects';
}

export default function SiteHeader({ currentPage }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      toggleRef.current?.focus();
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <aside className="launch-bar" aria-label="NanoAI beta launch">
        <div className="content-shell launch-bar__inner">
          <span className="launch-bar__tag">Launch</span>
          <p>
            <strong>The NanoAI beta is live.</strong>
            <span className="launch-bar__detail"> Talk to your PC and let Nano work in your Windows apps.</span>
          </p>
          <a className="launch-bar__link" href="/nanoai/#beta">
            Sign up for the beta <span aria-hidden="true">→</span>
          </a>
        </div>
      </aside>
      <header className="site-header">
        <div className="content-shell site-header__inner">
          <a className="brand" href="/" aria-label="Omega AI LLC home">
            <span className="brand__mark" aria-hidden="true">
              <span />
            </span>
            <span className="brand__name">Omega AI</span>
            <span className="brand__legal">LLC</span>
          </a>

          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="site-navigation"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav id="site-navigation" className="site-navigation" data-open={isOpen} aria-label="Primary navigation">
            {SITE_NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={
                  // Each project's own page counts as part of Projects.
                  (['projects', 'omega-3', 'nanoai'].includes(currentPage) && item.href === '/projects/')
                  || (currentPage === 'autonomous-systems' && item.href === '/#capabilities')
                    ? 'page'
                    : undefined
                }
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a className="button button--compact" href="/#project-inquiry" onClick={() => setIsOpen(false)}>
              Start a project
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { SITE_NAV } from '../../content/siteContent';

interface SiteHeaderProps {
  currentPage: 'home' | 'omega-3' | 'autonomous-systems';
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
                  (currentPage === 'omega-3' && item.href === '/omega-3/')
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

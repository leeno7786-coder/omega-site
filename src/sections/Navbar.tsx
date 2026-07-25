import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => { setScrolled(window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300" style={{ backdropFilter: scrolled ? 'blur(12px)' : 'none', backgroundColor: scrolled ? 'rgba(10,10,11,0.85)' : 'transparent', borderBottom: scrolled ? '1px solid rgba(42,90,138,0.3)' : '1px solid transparent' }}>
      <div className="content-max w-full section-pad-x flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="font-mono text-sm font-semibold text-white uppercase tracking-[0.12em] hover:text-[#4A9EFF] transition-colors duration-250">
          OMEGA AI <span className="text-[10px] font-normal text-[#5A6A8A] ml-1 normal-case tracking-normal">LLC</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleClick(e, link.href)} className="text-sm font-medium text-[#8A8A8E] hover:text-white transition-colors duration-250">{link.label}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

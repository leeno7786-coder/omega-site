import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(glowRef.current, { opacity: 0, scale: 0.5, duration: 1.5, ease: 'power2.out', delay: 0.2 });

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(sectionRef.current.querySelector('.hero-3d-container'), {
        rotateY: x * 10, rotateX: -y * 6, duration: 0.6, ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (!sectionRef.current) return;
      gsap.to(sectionRef.current.querySelector('.hero-3d-container'), {
        rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out',
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center z-10 overflow-hidden" style={{ paddingTop: '64px', perspective: '1200px' }}>
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '600px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(74,158,255,0.12) 0%, rgba(74,158,255,0.04) 30%, transparent 70%)', filter: 'blur(40px)', animation: 'pulseGlow 4s ease-in-out infinite' }} />

      <div className="hero-3d-container text-center px-6 max-w-3xl mx-auto" style={{ transformStyle: 'preserve-3d' }}>
        <span className="section-label inline-block hero-float-slow" style={{ letterSpacing: '0.15em' }}>OMEGA AI LLC — AUTONOMOUS SYSTEMS ARCHITECT</span>

        <h1 className="mt-6 text-[clamp(44px,6vw,76px)] font-normal leading-[1.05] tracking-[-0.03em] hero-float" style={{ color: '#FFFFFF', textShadow: '0 0 60px rgba(74,158,255,0.3), 0 0 120px rgba(74,158,255,0.1), 0 4px 30px rgba(0,0,0,0.5)' }}>
          We Build Minds<br />That Think for Themselves
        </h1>

        <p className="mt-6 text-lg max-w-[580px] mx-auto leading-relaxed hero-float-mid" style={{ color: '#8A8A8E', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
          Omega AI LLC designs and deploys autonomous cognitive systems for organizations that need AI to operate where cloud cannot reach — on the edge, on custom hardware, on your terms.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap hero-float-cta">
          <a href="#services" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }} className="hero-cta-primary inline-block px-8 py-3.5 rounded-lg text-[15px] font-medium transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, #4A9EFF 0%, #6B8CFF 100%)', color: '#0A0A0B', boxShadow: '0 4px 25px rgba(74,158,255,0.4), 0 0 60px rgba(74,158,255,0.15)' }}>
            Explore Our Services
          </a>
          <a href="mailto:noahlee@omega2ai.com" className="inline-block px-8 py-3.5 rounded-lg text-[15px] font-medium transition-all duration-300 hover:scale-105" style={{ border: '1px solid rgba(74,158,255,0.35)', color: '#E5E5E7', boxShadow: '0 0 20px rgba(74,158,255,0.08), inset 0 0 20px rgba(74,158,255,0.02)', backdropFilter: 'blur(10px)', background: 'rgba(74,158,255,0.05)' }}>
            Work With Us
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[35vh] pointer-events-none" style={{ transform: 'perspective(800px) rotateX(60deg)', transformOrigin: 'center bottom', backgroundImage: 'linear-gradient(rgba(74,158,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.12) 1px, transparent 1px)', backgroundSize: '60px 60px', maskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 80%)' }} />
    </section>
  );
}

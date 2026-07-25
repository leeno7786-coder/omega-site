import { useEffect, useRef } from 'react';

export default function AnimatedOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const orbs = containerRef.current.querySelectorAll<HTMLDivElement>('.orb');
    let frame: number;
    let t = 0;

    function animate() {
      t += 0.003;
      orbs.forEach((orb, i) => {
        const offset = i * 2.1;
        const x = Math.sin(t + offset) * (60 + i * 20);
        const y = Math.cos(t * 0.7 + offset) * (40 + i * 15);
        const scale = 1 + Math.sin(t * 0.5 + offset) * 0.08;
        orb.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      });
      frame = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div
        className="orb absolute"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74,158,255,0.35) 0%, rgba(167,139,250,0.15) 40%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.5,
          top: '-10%',
          left: '-10%',
          willChange: 'transform',
        }}
      />
      <div
        className="orb absolute"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,229,199,0.3) 0%, rgba(74,158,255,0.1) 40%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.45,
          bottom: '-5%',
          right: '-5%',
          willChange: 'transform',
        }}
      />
      <div
        className="orb absolute"
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,166,35,0.25) 0%, rgba(255,107,107,0.08) 50%, transparent 70%)',
          filter: 'blur(80px)',
          opacity: 0.4,
          top: '40%',
          left: '50%',
          marginLeft: '-200px',
          willChange: 'transform',
        }}
      />
    </div>
  );
}

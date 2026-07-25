import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    let animationId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    function animate() {
      animationId = requestAnimationFrame(animate);
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.08;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 150}px, ${posRef.current.y - 150}px)`;
      }
    }

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-[5]"
      style={{
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(74,158,255,0.18) 0%, rgba(74,158,255,0.08) 25%, rgba(74,158,255,0.02) 50%, transparent 70%)',
        borderRadius: '50%',
        willChange: 'transform',
      }}
    />
  );
}

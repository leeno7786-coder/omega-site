import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 13, suffix: '', label: 'Models Orchestrated', sub: 'One Runtime', color: '#4A9EFF' },
  { value: 86.4, suffix: '%', label: 'LongMemEval-S Score', sub: 'Headline (Up to 78% Local 4B)', color: '#00E5C7' },
  { value: 400, prefix: '$', suffix: '', label: 'Hardware Cost', sub: 'Laptop + iGPU', color: '#A78BFA' },
  { value: 0, suffix: '', label: 'Cloud Calls Required', sub: 'Fully Local', color: '#FF6B9D' },
  { value: 8, suffix: '', label: 'GB RAM Total', sub: 'All 13 Models', color: '#F5A623' },
];

function AnimatedStat({ stat }: { stat: typeof STATS[0] }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const trigger = ScrollTrigger.create({
      trigger: ref.current, start: 'top 90%', once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, { val: stat.value, duration: 2, ease: 'power2.out', onUpdate: () => { setCount(stat.value % 1 !== 0 ? parseFloat(obj.val.toFixed(1)) : Math.round(obj.val)); } });
      },
    });
    return () => trigger.kill();
  }, [stat.value]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    e.currentTarget.style.transform = `perspective(500px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(500px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  };

  return (
    <div ref={ref} className="glass-panel p-4 text-center transition-all duration-300" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transformStyle: 'preserve-3d', cursor: 'default' }}>
      <div className="text-3xl lg:text-4xl font-medium" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}40` }}>{stat.prefix}{count}{stat.suffix}</div>
      <div className="mt-1.5 text-xs font-mono uppercase tracking-wider" style={{ color: '#8A8A8E' }}>{stat.label}</div>
      <div className="mt-0.5 text-[11px] font-mono" style={{ color: '#5A6A8A' }}>{stat.sub}</div>
    </div>
  );
}

export default function TrustBar() {
  return (
    <section id="trust-bar" className="relative z-10 py-10 lg:py-14 border-t border-[#1A1A2E]" style={{ backgroundColor: '#0A0A0B' }}>
      <div className="content-max section-pad-x">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4" style={{ perspective: '800px' }}>
          {STATS.map((stat) => <AnimatedStat key={stat.label} stat={stat} />)}
        </div>
      </div>
    </section>
  );
}

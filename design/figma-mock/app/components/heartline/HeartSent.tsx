import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { C } from './tokens';

const partColors = [C.blush, C.dustyRose, C.velvetCrimson, C.emberGold];

export function HeartSent({ onHome }: { onHome: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  const parts = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.4;
    const dist = 70 + Math.random() * 80;
    const x = Math.cos(angle) * dist;
    const y = Math.sin(angle) * dist;
    return { x, y, color: partColors[i % partColors.length], delay: (i * 20) % 180 };
  });

  return (
    <div className="relative flex flex-col items-center justify-center h-full px-6 text-center">
      <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
        {show && parts.map((p, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              width: 8, height: 8, borderRadius: 9999, background: p.color,
              transform: `translate(${p.x}px, ${p.y}px)`,
              opacity: 0,
              animation: `hl-burst 900ms cubic-bezier(0,0,0.2,1) ${p.delay}ms forwards`,
            }}
          />
        ))}
        <style>{`@keyframes hl-burst { 0%{opacity:0; transform: translate(0,0) scale(0.4)} 20%{opacity:1} 100%{opacity:0; transform: translate(var(--tx,0), var(--ty,0)) scale(1)}}`}</style>
        <div className="hl-heartbeat">
          <Heart size={72} color={C.dustyRose} fill={C.velvetCrimson} strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="hl-display mt-6 hl-fade-up" style={{ fontSize: 34, color: C.warmCream, animationDelay: '600ms' }}>
        Your heart is open.
      </h2>
      <p className="hl-sans mt-3 hl-fade-up" style={{ fontSize: 15, color: C.textSecondary, animationDelay: '800ms' }}>
        Mira will receive a gentle nudge.
      </p>

      <button
        onClick={onHome}
        className="mt-10 hl-sans hl-fade-up"
        style={{ color: C.textSecondary, fontSize: 14, textDecoration: 'underline', animationDelay: '1200ms' }}
      >
        Back to home
      </button>
    </div>
  );
}

import { ReactNode } from 'react';
import { C } from './tokens';

export function Avatar({ initial, size = 40, ring, color = C.velvetCrimson, color2 = C.dustyRose }: { initial: string; size?: number; ring?: 'rose' | 'sage' | null; color?: string; color2?: string }) {
  const ringColor = ring === 'sage' ? C.sage : ring === 'rose' ? C.dustyRose : null;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        background: `linear-gradient(135deg, ${color}, ${color2})`,
        boxShadow: ringColor ? `0 0 0 2px ${C.deepPlum}, 0 0 0 4px ${ringColor}` : undefined,
      }}
      className="hl-sans flex items-center justify-center text-[color:var(--cream)] font-semibold flex-shrink-0"
    >
      <span style={{ color: C.warmCream, fontSize: size * 0.38 }}>{initial}</span>
    </div>
  );
}

export function Chip({ color, children, filled = true }: { color: string; children: ReactNode; filled?: boolean }) {
  return (
    <span
      className="hl-chip"
      style={{
        background: filled ? `${color}26` : 'transparent',
        border: `1px solid ${color}66`,
        color: color,
      }}
    >
      {children}
    </span>
  );
}

export function SectionLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 mb-3">
      <span className="hl-micro" style={{ color: C.textSecondary }}>{children}</span>
      {right}
    </div>
  );
}

export function Particles() {
  const dots = Array.from({ length: 12 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => (
        <div
          key={i}
          className="hl-particle absolute rounded-full"
          style={{
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            left: `${(i * 83) % 100}%`,
            background: C.dustyRose,
            opacity: 0.15,
            animationDelay: `${(i * 1.3) % 14}s`,
            animationDuration: `${12 + (i % 5) * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

export function PulseDots({ color = C.dustyRose }: { color?: string }) {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block rounded-full hl-heartbeat"
          style={{
            width: 8,
            height: 8,
            background: color,
            animationDelay: `${i * 200}ms`,
          }}
        />
      ))}
    </div>
  );
}

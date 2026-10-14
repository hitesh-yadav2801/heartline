import { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Heart, MessageCircleHeart, Clock, HeartHandshake, Gift, Hand } from 'lucide-react';
import { C } from './tokens';

export const sageBtn = {
  background: `linear-gradient(135deg, rgba(122,158,142,0.75), ${C.sage})`,
  color: C.deepPlum,
  boxShadow: '0 8px 24px rgba(122,158,142,0.35)',
} as const;

export const loveLanguages = [
  { key: 'words', label: 'Words of affirmation', desc: 'Hearing it, and having it written down', Icon: MessageCircleHeart, tip: 'hearing it out loud, and in writing they can keep' },
  { key: 'time', label: 'Quality time', desc: 'Undivided, phone-away attention', Icon: Clock, tip: 'unhurried evenings with nothing else competing' },
  { key: 'service', label: 'Acts of service', desc: 'Help that shows you noticed', Icon: HeartHandshake, tip: 'small, quiet ways of lightening the load' },
  { key: 'gifts', label: 'Receiving gifts', desc: 'Thoughtful little tokens', Icon: Gift, tip: 'a tiny thing that says "I was thinking of you"' },
  { key: 'touch', label: 'Physical touch', desc: 'Closeness you can feel', Icon: Hand, tip: 'long hugs, hands held, and sitting close' },
] as const;

export function BackBtn({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      aria-label="Back"
      className={`flex items-center justify-center rounded-full flex-shrink-0 ${className}`}
      style={{ width: 40, height: 40, background: 'rgba(196,104,122,0.12)' }}
    >
      <ChevronLeft size={20} color={C.dustyRose} strokeWidth={1.5} />
    </button>
  );
}

export function Screen({ onBack, center, right, children, footer, noBack }: { onBack?: () => void; center?: ReactNode; right?: ReactNode; children: ReactNode; footer?: ReactNode; noBack?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="flex items-center justify-between px-3 pt-4 pb-2 relative z-10" style={{ minHeight: 56 }}>
        {noBack || !onBack ? <span style={{ width: 40 }} /> : <BackBtn onClick={onBack} />}
        <div className="flex-1 flex justify-center">{center}</div>
        <div style={{ minWidth: 40 }} className="flex justify-end">{right}</div>
      </div>
      <div className="flex-1 overflow-y-auto hl-scroll-hide px-5 pb-8 hl-fade-up">{children}</div>
      {footer && <div className="px-5 pb-6 pt-2">{footer}</div>}
    </div>
  );
}

export function Sheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-50 flex items-end"
          style={{ background: 'rgba(26,10,46,0.7)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            className="w-full max-h-[88%] overflow-y-auto hl-scroll-hide"
            style={{ background: C.midnightRose, borderRadius: '32px 32px 0 0', border: '1px solid rgba(196,104,122,0.2)', borderBottom: 'none', padding: '12px 24px 28px' }}
          >
            <div className="mx-auto mb-5" style={{ width: 40, height: 4, borderRadius: 4, background: 'rgba(196,104,122,0.3)' }} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Toggle({ on, onChange, color = C.dustyRose }: { on: boolean; onChange: (v: boolean) => void; color?: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative flex-shrink-0"
      style={{ width: 48, height: 28, borderRadius: 9999, background: on ? `${color}` : 'rgba(196,104,122,0.15)', border: `1px solid ${on ? color : 'rgba(196,104,122,0.25)'}`, transition: 'background 250ms' }}
    >
      <motion.span
        animate={{ x: on ? 21 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="absolute rounded-full"
        style={{ top: 2, width: 22, height: 22, background: on ? C.warmCream : C.textSecondary }}
      />
    </button>
  );
}

export function HeartReact({ active, onClick, color = C.dustyRose, size = 18 }: { active: boolean; onClick: () => void; color?: string; size?: number }) {
  return (
    <button onClick={onClick} aria-label="Send a heart" className="flex items-center justify-center rounded-full" style={{ width: 36, height: 36, background: active ? `${color}26` : 'transparent' }}>
      <span key={String(active)} className={active ? 'hl-pop flex' : 'flex'}>
        <Heart size={size} color={active ? color : C.textSecondary} fill={active ? color : 'none'} strokeWidth={1.5} />
      </span>
    </button>
  );
}

export function OpenHeart({ size = 48, color = C.dustyRose, opacity = 0.5 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}>
      <path d="M22 11.5 C19 7.5 12 7.5 9 12.5 C6 17.5 8.5 23 13 28 L24 40 L35 28 C39.5 23 42 17.5 39 12.5 C36 7.5 29 7.5 26 11.5" />
    </svg>
  );
}

export function Jar({ scale = 1, float = true, opacity = 1 }: { scale?: number; float?: boolean; opacity?: number }) {
  return (
    <div className={float ? 'hl-float' : ''} style={{ opacity }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
        <div className="relative flex items-end justify-center" style={{ width: 56, height: 70, borderRadius: '18px 18px 28px 28px', border: `1.5px solid ${C.emberGold}`, background: 'linear-gradient(180deg, rgba(200,134,58,0.1), rgba(200,134,58,0.2))', boxShadow: '0 0 24px rgba(200,134,58,0.35)' }}>
          <span className="absolute -top-[6px] left-1/2 -translate-x-1/2" style={{ width: 36, height: 8, background: C.emberGold, borderRadius: 3, opacity: 0.8 }} />
          <div className="flex gap-1 pb-3">
            {[C.dustyRose, C.emberGold, C.sage].map((c) => (
              <span key={c} className="block rounded-full" style={{ width: 6, height: 6, background: c, boxShadow: `0 0 6px ${c}` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, body, action }: { icon: ReactNode; title: string; body: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center px-8 py-14 hl-fade-up">
      <div className="mb-5 flex items-center justify-center" style={{ minHeight: 64 }}>{icon}</div>
      <p className="hl-display-reg" style={{ fontSize: 26, color: C.warmCream, lineHeight: 1.2 }}>{title}</p>
      <p className="hl-sans mt-2" style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6 }}>{body}</p>
      {action && <div className="mt-6 w-full">{action}</div>}
    </div>
  );
}

export function TextAction({ children, onClick, color = C.textSecondary, className = '' }: { children: ReactNode; onClick?: () => void; color?: string; className?: string }) {
  return (
    <button onClick={onClick} className={`hl-sans ${className}`} style={{ color, fontSize: 13, textDecoration: 'underline' }}>
      {children}
    </button>
  );
}

const confettiColors = [C.dustyRose, C.emberGold, C.sage, C.blush];
export function Confetti({ count = 20, spread = 100 }: { count?: number; spread?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ top: -10, left: `${(i * 37) % spread}%`, width: 5 + (i % 4), height: 5 + (i % 4), background: confettiColors[i % 4], borderRadius: 2 }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{ y: 520, opacity: [0, 1, 0.8, 0], rotate: 480, x: (i % 2 ? 1 : -1) * (10 + (i % 5) * 6) }}
          transition={{ duration: 1.9, delay: (i * 45) / 1000, ease: [0.4, 0, 0.6, 1] }}
        />
      ))}
    </div>
  );
}

export function useTypewriter(text: string, speed = 40, active = true) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    if (!active) return;
    const t = setInterval(() => setN((x) => (x >= text.length ? x : x + 1)), speed);
    return () => clearInterval(t);
  }, [text, speed, active]);
  return text.slice(0, n);
}

export function Ring({ progress, size = 220, children, color = C.lavender }: { progress: number; size?: number; children?: ReactNode; color?: string }) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(196,104,122,0.12)" strokeWidth="3" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ * (1 - progress)} style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.45,0.05,0.55,0.95)' }} />
      </svg>
      <div className="relative text-center">{children}</div>
    </div>
  );
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: ReactNode }) {
  return (
    <label className="block mb-4">
      <span className="hl-micro block mb-2" style={{ color: C.textSecondary }}>{label}</span>
      {children}
      {hint}
    </label>
  );
}

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { C } from './tokens';
import { Sheet, TextAction, sageBtn } from './ui';

export function WeGood({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    const t2 = setTimeout(onDone, 3200);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [onDone]);

  const msg = 'You two worked it out.';
  const confetti = Array.from({ length: 36 }).map((_, i) => ({
    left: (i * 31) % 100,
    delay: (i * 40) % 1000,
    color: [C.dustyRose, C.emberGold, C.sage, C.blush][i % 4],
    size: 5 + (i % 4),
  }));

  return (
    <div
      className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background: `radial-gradient(500px 500px at 50% 40%, rgba(122,158,142,0.25), transparent 70%), rgba(26,10,46,0.96)`,
        backdropFilter: 'blur(8px)',
      }}
    >
      {show && confetti.map((c, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            top: -10, left: `${c.left}%`, width: c.size, height: c.size,
            background: c.color, borderRadius: 2,
            animation: `hl-fall 1800ms cubic-bezier(0.4,0,0.6,1) ${c.delay}ms forwards`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`@keyframes hl-fall { 0%{opacity:0; transform: translateY(-20px) rotate(0deg)} 10%{opacity:1} 100%{opacity:0.8; transform: translateY(500px) rotate(480deg)}}`}</style>

      <div className="hl-pop relative">
        <div className="flex -space-x-4">
          <Heart size={64} color={C.sage} fill={C.sage} strokeWidth={0} style={{ opacity: 0.9 }} />
          <Heart size={64} color={C.dustyRose} fill={C.dustyRose} strokeWidth={0} style={{ opacity: 0.9 }} />
        </div>
      </div>

      <h2 className="hl-display mt-6" style={{ fontSize: 34, color: C.warmCream, lineHeight: 1.2, maxWidth: 280 }}>
        {msg.split('').map((ch, i) => (
          <span key={i} className="inline-block hl-fade-up" style={{ animationDelay: `${600 + i * 30}ms` }}>
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        ))}
      </h2>

      <p className="hl-sans mt-4 hl-fade-up" style={{ fontSize: 14, color: C.textSecondary, animationDelay: '1400ms' }}>
        This heart is now in your Memory Jar 💛
      </p>
    </div>
  );
}

export function TwinHearts({ size = 48 }: { size?: number }) {
  return (
    <div className="flex -space-x-3">
      <Heart size={size} color={C.sage} strokeWidth={1.5} />
      <Heart size={size} color={C.sage} strokeWidth={1.5} />
    </div>
  );
}

export function WeGoodSheet({ open, onClose, onYes }: { open: boolean; onClose: () => void; onYes: () => void }) {
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <TwinHearts />
        <h3 className="hl-display-reg mt-4" style={{ fontSize: 26, color: C.warmCream, lineHeight: 1.2 }}>Are you both feeling better?</h3>
        <p className="hl-sans mt-2 mb-6" style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6, maxWidth: 280 }}>
          Both of you need to say it. This Heart will go into your Memory Jar.
        </p>
        <button className="hl-primary-btn w-full" style={sageBtn} onClick={onYes}>Yes, we're good 💚</button>
        <TextAction className="mt-4" onClick={onClose}>Not yet</TextAction>
      </div>
    </Sheet>
  );
}

export function WeGoodBanner({ name, onYes, onNotYet }: { name: string; onYes: () => void; onNotYet: () => void }) {
  return (
    <div className="hl-glass hl-fade-up mt-3 p-4" style={{ borderColor: C.sage, border: `1px solid ${C.sage}`, borderRadius: 24 }}>
      <p className="hl-display-reg" style={{ fontSize: 18, color: C.warmCream, lineHeight: 1.3 }}>{name} says you're good — are you?</p>
      <div className="flex items-center gap-4 mt-3">
        <button className="hl-primary-btn" style={{ ...sageBtn, height: 40, fontSize: 14, padding: '0 20px' }} onClick={onYes}>We're good 💚</button>
        <TextAction onClick={onNotYet}>Not yet</TextAction>
      </div>
    </div>
  );
}

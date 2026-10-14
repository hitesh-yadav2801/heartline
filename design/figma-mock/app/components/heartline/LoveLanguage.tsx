import { useState } from 'react';
import { Check } from 'lucide-react';
import { C } from './tokens';
import { Avatar, Chip } from './Shared';
import { Screen, loveLanguages } from './ui';

export function LoveLanguage({ onBack, partnerSet = true }: { onBack: () => void; partnerSet?: boolean }) {
  const [sel, setSel] = useState<string>('words');
  const [saved, setSaved] = useState<string>('words');
  const cur = loveLanguages.find((l) => l.key === sel)!;
  const mine = loveLanguages.find((l) => l.key === saved)!;
  return (
    <Screen
      onBack={onBack}
      footer={
        <button className="hl-primary-btn w-full flex items-center justify-center gap-2" onClick={() => setSaved(sel)} disabled={sel === saved} style={{ opacity: sel === saved ? 0.4 : 1, boxShadow: sel === saved ? 'none' : undefined }}>
          {sel === saved ? <><Check size={18} /> Saved</> : 'Update'}
        </button>
      }
    >
      <div className="hl-glass p-5 mt-2">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="flex flex-col items-center text-center gap-2">
            <Avatar initial="E" size={48} ring="rose" />
            <span className="hl-sans" style={{ fontSize: 14, fontWeight: 500, color: C.warmCream }}>Elena</span>
            <Chip color={C.dustyRose}>{mine.label}</Chip>
          </div>
          <span className="hl-display-reg" style={{ fontSize: 26, color: C.dustyRose }}>+</span>
          <div className="flex flex-col items-center text-center gap-2">
            <Avatar initial="M" size={48} ring="rose" color={C.lavender} color2={C.dustyRose} />
            <span className="hl-sans" style={{ fontSize: 14, fontWeight: 500, color: C.warmCream }}>Mira</span>
            {partnerSet ? <Chip color={C.lavender}>Quality time</Chip> : <span className="hl-italic" style={{ fontSize: 13, color: C.textSecondary, height: 28, lineHeight: '28px' }}>Not set yet</span>}
          </div>
        </div>
        {partnerSet ? (
          <p className="hl-italic text-center mt-4" style={{ fontSize: 13, color: C.textSecondary }}>You feel loved in words. Mira feels loved in time. Both are easy to give.</p>
        ) : (
          <p className="hl-italic text-center mt-4" style={{ fontSize: 13, color: C.textSecondary }}>We'll let you know when Mira sets theirs.</p>
        )}
      </div>

      <h2 className="hl-display-reg mt-8 mb-4" style={{ fontSize: 28, color: C.warmCream }}>Your love language</h2>
      <div className="flex flex-col gap-2">
        {loveLanguages.map(({ key, label, desc, Icon }) => {
          const on = sel === key;
          return (
            <button key={key} onClick={() => setSel(key)} className="flex items-center gap-3 px-4 py-3 text-left" style={{ borderRadius: 24, minHeight: 68, background: on ? `linear-gradient(135deg, ${C.velvetCrimson}59, ${C.dustyRose}40)` : 'transparent', border: `1.5px solid ${on ? C.dustyRose : 'rgba(196,104,122,0.25)'}`, transition: 'background 300ms, border-color 300ms' }}>
              <Icon size={20} color={on ? C.blush : C.dustyRose} strokeWidth={1.5} />
              <div className="flex-1">
                <p className="hl-sans" style={{ fontSize: 15, fontWeight: 500, color: C.warmCream }}>{label}</p>
                <p className="hl-sans mt-0.5" style={{ fontSize: 12, color: C.textSecondary }}>{desc}</p>
              </div>
              {on && <Check size={18} color={C.blush} className="hl-pop" />}
            </button>
          );
        })}
      </div>
      <p key={sel} className="hl-sans hl-fade-up mt-4 px-2" style={{ fontSize: 13, color: C.textSecondary, fontStyle: 'italic', lineHeight: 1.6 }}>
        People who feel loved through {cur.label.toLowerCase()} appreciate {cur.tip}.
      </p>
    </Screen>
  );
}

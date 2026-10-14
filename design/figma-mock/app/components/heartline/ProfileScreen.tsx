import { useRef } from 'react';
import { Bell, Palette, Lock, Crown, Info, ChevronRight, Heart, Gift } from 'lucide-react';
import { C } from './tokens';
import { Avatar } from './Shared';

interface Row { label: string; Icon: any; value?: string; onClick?: () => void }

export function ProfileScreen({ plus, onSubscription, onPalette, onReferral, onLoveLanguage, onIndex }: { plus: boolean; onSubscription: () => void; onPalette: () => void; onReferral: () => void; onLoveLanguage: () => void; onIndex: () => void }) {
  const rows: { section: string; items: Row[] }[] = [
    { section: 'Notifications', items: [{ label: 'Gentle nudges', Icon: Bell, value: 'On' }] },
    { section: 'Privacy', items: [{ label: 'Lock with Face ID', Icon: Lock, value: 'Off' }] },
    { section: 'Subscription', items: [{ label: 'Heartline Plus', Icon: Crown, value: plus ? 'Plus' : 'Free', onClick: onSubscription }, { label: 'Your palette', Icon: Palette, onClick: onPalette }] },
    { section: 'About', items: [{ label: 'About Heartline', Icon: Info }, { label: 'Invite friends', Icon: Gift, onClick: onReferral }] },
  ];
  const timer = useRef<number | undefined>(undefined);
  const down = () => { timer.current = window.setTimeout(onIndex, 700); };
  const up = () => window.clearTimeout(timer.current);
  return (
    <div className="pt-14 pb-32 px-5 hl-fade-up">
      <div className="flex flex-col items-center mb-6">
        <div onPointerDown={down} onPointerUp={up} onPointerLeave={up} onContextMenu={(e) => e.preventDefault()} className="select-none">
          <Avatar initial="E" size={96} ring="rose" />
        </div>
        <h2 className="hl-display-reg mt-4" style={{ fontSize: 28, color: C.warmCream }}>Elena Ross</h2>
        <button className="hl-sans mt-1" style={{ color: C.dustyRose, fontSize: 13, textDecoration: 'underline' }}>
          Edit profile
        </button>
      </div>

      <div className="hl-glass p-4 mb-6">
        <button className="flex items-center gap-3 w-full text-left" onClick={onLoveLanguage}>
          <Avatar initial="M" size={48} color={C.lavender} color2={C.dustyRose} />
          <div className="flex-1">
            <p className="hl-sans" style={{ fontSize: 15, color: C.warmCream, fontWeight: 500 }}>Mira Chen</p>
            <p className="hl-sans" style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>
              Love language · Words of affirmation
            </p>
          </div>
          <Heart size={20} color={C.dustyRose} fill={C.dustyRose} />
        </button>
        <p className="hl-italic text-center mt-4" style={{ fontSize: 12, color: C.textSecondary }}>
          Your space since Feb 14, 2026
        </p>
      </div>

      {rows.map((s) => (
        <div key={s.section} className="mb-5">
          <p className="hl-micro mb-2 px-1" style={{ color: C.textSecondary }}>{s.section}</p>
          <div className="hl-card overflow-hidden">
            {s.items.map((row, i) => (
              <button
                key={row.label}
                onClick={row.onClick}
                className="flex items-center gap-3 px-4 w-full text-left"
                style={{
                  height: 56,
                  borderBottom: i < s.items.length - 1 ? '1px solid rgba(196,104,122,0.08)' : 'none',
                }}
              >
                <row.Icon size={18} color={C.dustyRose} strokeWidth={1.5} />
                <span className="hl-sans flex-1" style={{ fontSize: 15, color: C.warmCream }}>{row.label}</span>
                {row.value && (
                  <span className="hl-sans" style={{ fontSize: 13, color: C.textSecondary }}>{row.value}</span>
                )}
                <ChevronRight size={16} color={C.textSecondary} />
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        className="hl-sans w-full py-4 mt-2 text-center"
        style={{ color: C.dustyRose, fontSize: 13, textDecoration: 'underline' }}
      >
        Disconnect from Mira
      </button>
    </div>
  );
}

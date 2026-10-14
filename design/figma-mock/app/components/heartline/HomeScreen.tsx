import { Gift, Archive, Smile, Calendar, Plus, Activity, ChevronRight } from 'lucide-react';
import { C } from './tokens';
import { Avatar, SectionLabel } from './Shared';
import { HeartCard, HeartItem } from './HeartCard';
import { OpenHeart } from './ui';

interface Props {
  onOpenHeart: () => void;
  onOpenResolution: (id: string) => void;
  onGoto: (t: 'mood' | 'hearts' | 'us') => void;
  hearts: HeartItem[];
  onAppreciation: () => void;
  onPulse: () => void;
  partnerMood?: boolean;
}

export function HomeScreen({ onOpenHeart, onOpenResolution, onGoto, hearts, onAppreciation, onPulse, partnerMood = true }: Props) {
  const openHearts = hearts.filter((h) => h.status !== 'resolved');
  const limit = openHearts.length >= 3;
  const quickActions: { label: string; Icon: any; color: string; onClick?: () => void }[] = [
    { label: 'Appreciation', Icon: Gift, color: C.lavender, onClick: onAppreciation },
    { label: 'Memory Jar', Icon: Archive, color: C.emberGold, onClick: () => onGoto('hearts') },
    { label: 'Mood', Icon: Smile, color: C.sage, onClick: () => onGoto('mood') },
    { label: 'Us Time', Icon: Calendar, color: C.dustyRose, onClick: () => onGoto('us') },
  ];

  return (
    <div className="pt-14 pb-32 px-4 hl-fade-up">
      <div className="mb-6">
        <div className="hl-glass flex items-center gap-3 p-4" style={{ height: 100, borderRadius: 28 }}>
          <Avatar initial="E" size={48} ring="rose" />
          <div className="flex-1 text-center relative">
            <p className="hl-display-reg" style={{ fontSize: 22, color: C.warmCream, lineHeight: 1.1 }}>Your Space</p>
            <p className="hl-sans mt-1" style={{ fontSize: 12, color: C.textSecondary }}>Together for 8 months</p>
            <div className="mt-2 mx-auto relative" style={{ width: 40, height: 2, background: 'rgba(196,104,122,0.2)', borderRadius: 2 }}>
              <span
                className="absolute -top-[3px] hl-travel rounded-full"
                style={{ width: 8, height: 8, background: C.dustyRose, boxShadow: '0 0 8px rgba(196,104,122,0.8)' }}
              />
            </div>
          </div>
          <Avatar initial="M" size={48} ring="rose" color={C.lavender} color2={C.dustyRose} />
        </div>
      </div>

      {partnerMood ? (
        <div className="hl-card p-4 mb-8 flex items-center gap-3" style={{ height: 72 }}>
          <div className="relative">
            <Avatar initial="M" size={40} color={C.lavender} color2={C.dustyRose} />
            <span
              className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full"
              style={{ width: 22, height: 22, background: C.deepPlum, border: `1.5px solid ${C.midnightRose}`, fontSize: 14 }}
            >
              😌
            </span>
          </div>
          <div className="flex-1">
            <p className="hl-sans" style={{ fontSize: 14, color: C.textPrimary }}>
              <span style={{ color: C.dustyRose }}>Mira</span> is feeling <span style={{ color: C.sage }}>calm</span> today
            </p>
            <p className="hl-sans" style={{ fontSize: 11, color: C.textSecondary, marginTop: 2 }}>“Coffee &amp; slow morning with you.”</p>
          </div>
          <span className="hl-sans" style={{ fontSize: 11, color: C.textSecondary }}>12m</span>
        </div>
      ) : (
        <div className="hl-card p-4 mb-8 flex items-center gap-3" style={{ height: 72 }}>
          <Avatar initial="M" size={40} color={C.lavender} color2={C.dustyRose} />
          <Smile size={20} color={C.textSecondary} strokeWidth={1.5} />
          <p className="hl-italic flex-1" style={{ fontSize: 15, color: C.textSecondary }}>Mira hasn't checked in yet today.</p>
        </div>
      )}

      <SectionLabel
        right={
          openHearts.length > 0 && (
            <span
              className="hl-sans"
              style={{
                background: C.velvetCrimson, color: C.warmCream,
                fontSize: 11, padding: '2px 10px', borderRadius: 9999, fontWeight: 500,
              }}
            >
              {openHearts.length} open
            </span>
          )
        }
      >
        Open Hearts
      </SectionLabel>

      {openHearts.length === 0 ? (
        <div className="hl-glass mx-2 mb-6 flex flex-col items-center justify-center text-center py-6 px-4">
          <OpenHeart size={48} />
          <p className="hl-display-reg mt-2" style={{ fontSize: 22, color: C.warmCream }}>All is well 💚</p>
          <p className="hl-sans mt-1" style={{ fontSize: 13, color: C.textSecondary }}>No open hearts right now. Things feel good.</p>
        </div>
      ) : (
        <div className="px-2 mb-6 flex flex-col gap-3">
          {openHearts.map((h) => (
            <HeartCard key={h.id} item={h} onClick={() => onOpenResolution(h.id)} />
          ))}
        </div>
      )}

      <div className="px-2 mb-2">
        <button
          className="hl-primary-btn w-full flex items-center justify-center gap-2"
          onClick={limit ? undefined : onOpenHeart}
          disabled={limit}
          aria-disabled={limit}
          style={limit ? { opacity: 0.4, boxShadow: 'none', cursor: 'not-allowed' } : undefined}
        >
          <Plus size={18} strokeWidth={2} />
          Open a Heart
        </button>
        <p
          className="hl-italic text-center mt-3"
          style={{ fontSize: 12, color: C.textSecondary }}
        >
          {limit ? "3 Hearts are open. Let's give these some love first." : "Share what's on your mind, gently."}
        </p>
      </div>

      <button onClick={onPulse} className="hl-glass w-full mt-6 flex items-center gap-3 p-3 text-left" style={{ border: `1px solid ${C.lavender}55` }}>
        <span className="flex items-center justify-center rounded-full hl-heartbeat" style={{ width: 40, height: 40, background: `${C.lavender}26` }}><Activity size={18} color={C.lavender} strokeWidth={1.5} /></span>
        <div className="flex-1">
          <p className="hl-display-reg" style={{ fontSize: 17, color: C.warmCream, lineHeight: 1.2 }}>Your weekly pulse is here</p>
          <p className="hl-sans" style={{ fontSize: 11, color: C.textSecondary }}>3 questions. 3 minutes.</p>
        </div>
        <ChevronRight size={16} color={C.textSecondary} />
      </button>

      <div className="mt-4 grid grid-cols-4 gap-2 px-2">
        {quickActions.map(({ label, Icon, color, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="flex flex-col items-center gap-2 py-2"
          >
            <span
              className="flex items-center justify-center rounded-full"
              style={{
                width: 48, height: 48,
                background: `${color}20`,
                border: `1px solid ${color}40`,
              }}
            >
              <Icon size={20} color={color} strokeWidth={1.5} />
            </span>
            <span className="hl-sans" style={{ fontSize: 10, color: C.textSecondary }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

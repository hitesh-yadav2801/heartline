import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Image as ImageIcon, X } from 'lucide-react';
import { C, feelings } from './tokens';
import { Chip } from './Shared';
import { BackBtn, TextAction } from './ui';
import { HeartItem } from './HeartCard';

const thread = [
  { from: 'them', text: "Thank you for the hug. It's been a long week and I felt invisible last night." },
  { from: 'me', text: "I'm so sorry. I was tired and I let the evening slip away from us. You were not invisible to me." },
  { from: 'them', text: 'I know. I just needed a soft moment with you.' },
  { from: 'me', text: "Tomorrow, phones away, and I'll make the slow dinner you love. Just us." },
  { from: 'them', text: 'That sounds perfect. I love you.' },
  { from: 'me', text: 'I love you more. Thank you for telling me.' },
] as const;

const photoUrl = 'https://images.unsplash.com/photo-1566568307024-efd181254414?fit=crop&auto=format&w=800&h=520&q=70';

export function MemoryDetail({ heart, onBack }: { heart: HeartItem; onBack: () => void }) {
  const feeling = feelings.find((f) => f.key === heart.feeling)!;
  const [photo, setPhoto] = useState(false);
  const date = heart.resolvedDate ?? 'Today';
  return (
    <motion.div
      className="absolute inset-0 flex flex-col"
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
    >
      <div className="flex items-center justify-between px-3 pt-4 pb-2">
        <BackBtn onClick={onBack} />
        <div className="flex items-center gap-2">
          <Chip color={feeling.color}><span>{feeling.emoji}</span><span>{feeling.label}</span></Chip>
          <span className="hl-sans" style={{ fontSize: 12, color: C.textSecondary }}>{date}</span>
        </div>
        <span style={{ width: 40 }} />
      </div>
      <div className="flex-1 overflow-y-auto hl-scroll-hide px-5 pb-8">
        {heart.note && (
          <div className="hl-glass relative p-5 pt-8 mt-2 overflow-hidden">
            <span className="hl-display absolute" style={{ top: -4, left: 14, fontSize: 64, lineHeight: 1, color: C.dustyRose, opacity: 0.3 }}>“</span>
            <p className="hl-display-reg" style={{ fontSize: 18, color: C.warmCream, lineHeight: 1.7 }}>{heart.note}</p>
          </div>
        )}

        <div className="my-6 hl-divider" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,104,122,0.25), transparent)' }} />
        <p className="hl-micro text-center mb-4" style={{ color: C.textSecondary }}>How you worked it out</p>

        <div className="flex flex-col gap-3">
          {thread.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="hl-sans"
                style={{
                  maxWidth: '76%', padding: '12px 16px', fontSize: 14, color: C.warmCream, lineHeight: 1.5,
                  background: m.from === 'me' ? `linear-gradient(135deg, ${C.velvetCrimson}, ${C.dustyRose})` : C.midnightRose,
                  border: m.from === 'them' ? '1px solid rgba(196,104,122,0.15)' : 'none',
                  borderRadius: m.from === 'me' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  opacity: 0, animation: `hl-pop 600ms cubic-bezier(0,0,0.2,1) ${300 + i * 140}ms both`,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="my-6 hl-divider" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,134,58,0.3), transparent)' }} />
        {!photo ? (
          <button
            onClick={() => setPhoto(true)}
            className="w-full flex flex-col items-center justify-center gap-2"
            style={{ height: 120, borderRadius: 24, border: `1.5px dashed ${C.emberGold}80`, background: 'rgba(200,134,58,0.06)' }}
          >
            <Camera size={22} color={C.emberGold} strokeWidth={1.5} />
            <span className="hl-sans" style={{ fontSize: 14, color: C.emberGold, fontWeight: 500 }}>Add a photo to this memory</span>
            <span className="hl-italic" style={{ fontSize: 12, color: C.textSecondary }}>Something from the day you came back together</span>
          </button>
        ) : (
          <div className="hl-card hl-pop p-3 relative" style={{ borderColor: `${C.emberGold}40` }}>
            <div className="relative overflow-hidden" style={{ borderRadius: 16, height: 190, background: C.deepPlum }}>
              <img src={photoUrl} alt="Elena and Mira holding hands" className="w-full h-full object-cover" style={{ filter: 'sepia(0.5) saturate(1.2)' }} />
              <span className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, rgba(26,10,46,0.75)), ${C.velvetCrimson}33`, mixBlendMode: 'normal' }} />
              <span className="absolute left-3 bottom-2 hl-italic" style={{ fontSize: 14, color: C.petal }}>The night we came back to us</span>
            </div>
            <div className="flex items-center justify-between mt-3 px-1">
              <span className="hl-sans flex items-center gap-2" style={{ fontSize: 12, color: C.textSecondary }}><ImageIcon size={14} color={C.emberGold} strokeWidth={1.5} /> Added by you · just now</span>
              <button aria-label="Remove photo" onClick={() => setPhoto(false)}><X size={16} color={C.textSecondary} strokeWidth={1.5} /></button>
            </div>
          </div>
        )}
        {photo && <div className="text-center mt-2"><TextAction onClick={() => setPhoto(false)}>Change photo</TextAction></div>}

        <div className="flex justify-center mt-8">
          <span className="hl-chip" style={{ background: `${C.sage}26`, border: `1px solid ${C.sage}66`, color: C.sage }}>💚 We're Good · {date}</span>
        </div>
      </div>
    </motion.div>
  );
}

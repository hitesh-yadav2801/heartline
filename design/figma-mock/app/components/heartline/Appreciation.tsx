import { useState } from 'react';
import { Mail, Send, Sparkles, Plus } from 'lucide-react';
import { C } from './tokens';
import { Avatar } from './Shared';
import { EmptyState, HeartReact, Screen } from './ui';

const starters = ['The way you hummed while cooking', 'You stayed up to listen', 'You remembered my favourite tea'];

export function AppreciationCompose({ onBack, onSent }: { onBack: () => void; onSent: () => void }) {
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <Screen onBack={onBack}>
        <div className="flex flex-col items-center text-center pt-24">
          <div className="hl-pop hl-float relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
            <span className="absolute rounded-full" style={{ inset: 10, background: `${C.lavender}40`, filter: 'blur(22px)' }} />
            <span style={{ fontSize: 64 }}>💌</span>
          </div>
          <h2 className="hl-display mt-6" style={{ fontSize: 30, color: C.warmCream }}>Dropped.</h2>
          <p className="hl-sans mt-2" style={{ fontSize: 14, color: C.textSecondary }}>Mira will find it on your Gratitude Wall.</p>
          <button className="hl-primary-btn w-full mt-10" onClick={onSent}>See the Gratitude Wall</button>
          <button className="hl-secondary-btn w-full mt-3" onClick={onBack}>Back to Home</button>
        </div>
      </Screen>
    );
  }
  return (
    <Screen
      onBack={onBack}
      footer={<button className="hl-primary-btn w-full" disabled={!text.trim()} style={{ opacity: text.trim() ? 1 : 0.4 }} onClick={() => setSent(true)}>Drop it 💌</button>}
    >
      <div className="flex justify-center mt-2 mb-2"><Mail size={72} color={C.dustyRose} strokeWidth={1} style={{ opacity: 0.15 }} /></div>
      <h2 className="hl-display-reg text-center" style={{ fontSize: 28, color: C.warmCream, lineHeight: 1.2 }}>Leave something for Mira</h2>
      <p className="hl-sans text-center mt-2 mb-5" style={{ fontSize: 13, color: C.textSecondary }}>An Appreciation Drop. They'll find it on your Gratitude Wall.</p>
      <textarea
        className="hl-input hl-italic"
        style={{ minHeight: 180, fontSize: 16, lineHeight: 1.7, borderRadius: 16 }}
        placeholder="I noticed something today that made me love you more..."
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, 500))}
      />
      <p className="hl-sans text-right mt-2" style={{ fontSize: 11, color: C.textSecondary }}>{text.length}/500</p>
      <div className="flex items-center gap-2 mt-4 mb-2">
        <Sparkles size={14} color={C.lavender} strokeWidth={1.5} />
        <span className="hl-micro" style={{ color: C.lavender }}>Need a spark?</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {starters.map((s) => (
          <button key={s} className="hl-chip" style={{ height: 32, background: `${C.lavender}1A`, border: `1px solid ${C.lavender}66`, color: C.lavender }} onClick={() => setText(s + ' — ')}>{s}</button>
        ))}
      </div>
    </Screen>
  );
}

interface Drop { id: string; from: 'E' | 'M'; text: string; date: string; unread?: boolean; liked?: boolean }
const initialDrops: Drop[] = [
  { id: 'd1', from: 'M', text: 'You turned the whole worst Tuesday into something soft just by sitting next to me and saying nothing at all.', date: 'Today', unread: true },
  { id: 'd2', from: 'E', text: 'I love how you hum when you think no one is listening. It is my favourite sound in our home.', date: 'Oct 9', liked: true },
  { id: 'd3', from: 'M', text: 'Thank you for driving across the city just to bring me soup. I felt held, completely.', date: 'Oct 2', unread: true },
  { id: 'd4', from: 'E', text: 'You remembered the name of my childhood dog. I am still smiling about it.', date: 'Sep 24', liked: true },
];

export function GratitudeWall({ onBack, onCompose, empty }: { onBack: () => void; onCompose: () => void; empty?: boolean }) {
  const [drops, setDrops] = useState<Drop[]>(empty ? [] : initialDrops);
  const upd = (id: string, patch: Partial<Drop>) => setDrops((d) => d.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  return (
    <Screen onBack={onBack} right={<button onClick={onCompose} aria-label="Leave something" className="flex items-center justify-center rounded-full" style={{ width: 40, height: 40, background: `${C.lavender}26`, border: `1px solid ${C.lavender}66` }}><Plus size={18} color={C.lavender} strokeWidth={1.5} /></button>}>
      <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream }}>Gratitude Wall</h2>
      <p className="hl-italic mt-1 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>All the little things you've said to each other.</p>
      {drops.length === 0 ? (
        <EmptyState
          icon={<Mail size={48} color={C.lavender} strokeWidth={1.5} style={{ opacity: 0.6 }} />}
          title="Nothing yet."
          body="Be the first to leave something."
          action={<button className="hl-primary-btn w-full" onClick={onCompose}>Leave something</button>}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {drops.map((d, i) => {
            const mine = d.from === 'E';
            return (
              <div
                key={d.id}
                onClick={() => d.unread && upd(d.id, { unread: false })}
                className="relative overflow-hidden hl-fade-up"
                style={{
                  animationDelay: `${i * 70}ms`, borderRadius: 24, padding: '28px 20px 14px',
                  background: `linear-gradient(160deg, ${C.midnightRose}, ${C.deepPlum})`,
                  border: '1px solid rgba(196,104,122,0.10)',
                  [i % 2 ? 'borderRight' : 'borderLeft']: `3px solid ${mine ? C.dustyRose : C.lavender}`,
                }}
              >
                <span className="hl-display absolute" style={{ top: -8, left: 12, fontSize: 80, lineHeight: 1, color: C.velvetCrimson, opacity: 0.2 }}>“</span>
                {d.unread && <span className="absolute hl-heartbeat rounded-full" style={{ top: 14, right: 14, width: 8, height: 8, background: C.dustyRose, boxShadow: '0 0 8px rgba(196,104,122,0.8)' }} aria-label="Unread" />}
                <p className="hl-display-reg relative" style={{ fontSize: 16, lineHeight: 1.75, color: C.warmCream }}>{d.text}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Avatar initial={d.from} size={32} color={mine ? C.velvetCrimson : C.lavender} color2={C.dustyRose} />
                  <span className="hl-sans" style={{ fontSize: 13, fontWeight: 500, color: C.warmCream }}>{mine ? 'You' : 'Mira'}</span>
                  <span className="hl-sans flex-1" style={{ fontSize: 11, color: C.textSecondary }}>{d.date}</span>
                  <HeartReact active={!!d.liked} onClick={() => upd(d.id, { liked: !d.liked, unread: false })} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Screen>
  );
}

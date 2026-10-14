import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { MapPin, Clock, Sparkles, RefreshCw } from 'lucide-react';
import { C } from './tokens';
import { Chip } from './Shared';
import { Screen, TextAction, Field } from './ui';
import { Plan } from './UsTime';

const emojis = ['🍷', '🚶', '🎬', '🍝', '🌅', '🎲', '☕', '🎶', '🧺', '✨'];

export function PlanCreate({ onBack, onSave, prefill }: { onBack: () => void; onSave: (p: Plan) => void; prefill?: { title: string; emoji: string } }) {
  const [title, setTitle] = useState(prefill?.title ?? '');
  const [desc, setDesc] = useState('');
  const [loc, setLoc] = useState('');
  const [emoji, setEmoji] = useState(prefill?.emoji ?? '🍷');
  const [day, setDay] = useState(2);
  const [time, setTime] = useState('19:30');
  const days = Array.from({ length: 14 }).map((_, i) => addDays(new Date(), i));
  const save = () => {
    const d = days[day];
    const [h, m] = time.split(':').map(Number);
    const dt = new Date(d); dt.setHours(h, m);
    onSave({ id: 'p' + Date.now(), emoji, title: title.trim(), date: `${format(d, 'EEE')} · ${format(dt, 'h:mmaaa')}`, by: 'You', desc, location: loc });
  };
  return (
    <Screen onBack={onBack} footer={<button className="hl-primary-btn w-full" disabled={!title.trim()} style={{ opacity: title.trim() ? 1 : 0.4 }} onClick={save}>Plan it</button>}>
      <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream }}>Plan something</h2>
      <p className="hl-italic mt-1 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>Mira will see it the moment you save.</p>

      <p className="hl-micro mb-2" style={{ color: C.textSecondary }}>Pick a little emoji</p>
      <div className="flex gap-2 overflow-x-auto hl-scroll-hide mb-5 py-1">
        {emojis.map((e) => (
          <button key={e} onClick={() => setEmoji(e)} className="flex-shrink-0 flex items-center justify-center rounded-full" style={{ width: 48, height: 48, fontSize: 24, background: emoji === e ? `${C.emberGold}26` : C.midnightRose, border: `1.5px solid ${emoji === e ? C.emberGold : 'rgba(196,104,122,0.10)'}`, transform: emoji === e ? 'scale(1.08)' : 'scale(1)', transition: 'transform 250ms cubic-bezier(0.34,1.56,0.64,1)' }}>{e}</button>
        ))}
      </div>

      <Field label="What are you planning?">
        <input className="hl-input" placeholder="Slow dinner at home" value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field label="A few words (optional)">
        <textarea className="hl-input" style={{ minHeight: 80 }} placeholder="Candles, that playlist, no phones." value={desc} onChange={(e) => setDesc(e.target.value)} />
      </Field>

      <p className="hl-micro mb-2" style={{ color: C.textSecondary }}>When</p>
      <div className="flex gap-2 overflow-x-auto hl-scroll-hide pb-1 mb-3">
        {days.map((d, i) => (
          <button key={i} onClick={() => setDay(i)} className="flex-shrink-0 flex flex-col items-center justify-center" style={{ width: 54, height: 66, borderRadius: 20, background: day === i ? `${C.emberGold}26` : C.midnightRose, border: `1.5px solid ${day === i ? C.emberGold : 'rgba(196,104,122,0.10)'}`, transition: 'background 200ms, border-color 200ms' }}>
            <span className="hl-micro" style={{ fontSize: 10, color: day === i ? C.emberGold : C.textSecondary }}>{i === 0 ? 'Today' : format(d, 'EEE')}</span>
            <span className="hl-display" style={{ fontSize: 24, color: C.warmCream, lineHeight: 1.1 }}>{format(d, 'd')}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 mb-5">
        <Clock size={18} color={C.emberGold} strokeWidth={1.5} />
        <input type="time" className="hl-input" aria-label="Time" style={{ colorScheme: 'dark', height: 48 }} value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      <Field label="Where (optional)">
        <div className="relative">
          <MapPin size={18} color={C.emberGold} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input className="hl-input" style={{ paddingLeft: 44 }} placeholder="Our balcony" value={loc} onChange={(e) => setLoc(e.target.value)} />
        </div>
      </Field>
    </Screen>
  );
}

const ideas = [
  { emoji: '🌅', title: 'Sunset on the terrace', line: 'Chai, a blanket, and no agenda but each other.', time: '1 hr', vibe: 'Cozy', color: C.emberGold },
  { emoji: '🍝', title: 'Cook a recipe neither of you knows', line: 'Pick it blindfolded and laugh through the mistakes.', time: '2 hrs', vibe: 'Playful', color: C.dustyRose },
  { emoji: '🎶', title: 'Swap three songs that are yours', line: 'Listen together and say why each one matters.', time: '45 min', vibe: 'Tender', color: C.lavender },
];

export function UsTimeIdeas({ onBack, onPlan }: { onBack: () => void; onPlan: (i: { title: string; emoji: string }) => void }) {
  const [round, setRound] = useState(0);
  const list = round % 2 ? [...ideas].reverse() : ideas;
  return (
    <Screen onBack={onBack}>
      <div className="flex items-center gap-2 mb-1">
        <Sparkles size={18} color={C.lavender} strokeWidth={1.5} />
        <span className="hl-micro" style={{ color: C.lavender }}>Ideas for you two</span>
      </div>
      <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream, lineHeight: 1.15 }}>Something gentle, together</h2>
      <p className="hl-italic mt-1 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>Picked for Elena & Mira, from what you both love.</p>
      <div key={round} className="flex flex-col gap-3">
        {list.map((idea, i) => (
          <div key={idea.title} className="hl-card p-4 hl-fade-up" style={{ animationDelay: `${i * 90}ms`, border: `1px solid ${C.lavender}33` }}>
            <div className="flex items-start gap-3">
              <span style={{ fontSize: 30 }}>{idea.emoji}</span>
              <div className="flex-1">
                <p className="hl-display-reg" style={{ fontSize: 20, color: C.warmCream, lineHeight: 1.25 }}>{idea.title}</p>
                <p className="hl-sans mt-1" style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5 }}>{idea.line}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Chip color={C.emberGold}><Clock size={12} strokeWidth={1.5} />{idea.time}</Chip>
              <Chip color={idea.color}>{idea.vibe}</Chip>
              <button className="hl-secondary-btn ml-auto" style={{ height: 36, padding: '0 18px', fontSize: 13 }} onClick={() => onPlan({ title: idea.title, emoji: idea.emoji })}>Plan this</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button className="flex items-center gap-2 hl-sans" style={{ color: C.lavender, fontSize: 13 }} onClick={() => setRound(round + 1)}><RefreshCw size={14} strokeWidth={1.5} /> <span style={{ textDecoration: 'underline' }}>Show me different ideas</span></button>
      </div>
    </Screen>
  );
}

const reactions = [{ e: '🥰', l: 'Loved it' }, { e: '😊', l: 'Lovely' }, { e: '😌', l: 'Calm' }, { e: '😅', l: 'A bit rushed' }, { e: '🥲', l: 'Meh' }];

export function UsTimeReflect({ plan, onBack, onDone }: { plan: Plan; onBack: () => void; onDone: () => void }) {
  const [sel, setSel] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <Screen onBack={onDone} noBack>
        <div className="flex flex-col items-center text-center pt-28">
          <span className="hl-pop" style={{ fontSize: 72 }}>{sel !== null ? reactions[sel].e : '💛'}</span>
          <h2 className="hl-display mt-6" style={{ fontSize: 30, color: C.warmCream }}>Saved with love</h2>
          <p className="hl-sans mt-2" style={{ fontSize: 14, color: C.textSecondary }}>Mira can see how it felt for you.</p>
          <button className="hl-primary-btn w-full mt-10" onClick={onDone}>Back to Us Time</button>
        </div>
      </Screen>
    );
  }
  return (
    <Screen onBack={onBack} footer={<div className="flex flex-col items-center gap-3"><button className="hl-primary-btn w-full" disabled={sel === null} style={{ opacity: sel === null ? 0.4 : 1 }} onClick={() => setSent(true)}>Share with Mira</button><TextAction onClick={onDone}>Skip</TextAction></div>}>
      <div className="text-center pt-4">
        <span style={{ fontSize: 44 }}>{plan.emoji}</span>
        <h2 className="hl-display mt-3" style={{ fontSize: 30, color: C.warmCream, lineHeight: 1.15 }}>How was your Us Time?</h2>
        <p className="hl-italic mt-1" style={{ fontSize: 14, color: C.emberGold }}>{plan.title}</p>
      </div>
      <div className="flex justify-between mt-8">
        {reactions.map((r, i) => (
          <button key={r.l} onClick={() => setSel(i)} className="flex flex-col items-center gap-1" style={{ width: 60 }}>
            <span className="flex items-center justify-center rounded-full" style={{ width: 52, height: 52, fontSize: 28, background: sel === i ? `${C.emberGold}26` : C.midnightRose, border: `1.5px solid ${sel === i ? C.emberGold : 'rgba(196,104,122,0.10)'}`, transform: sel === i ? 'scale(1.12)' : 'scale(1)', transition: 'transform 250ms cubic-bezier(0.34,1.56,0.64,1)' }}>{r.e}</span>
            <span className="hl-sans" style={{ fontSize: 10, color: sel === i ? C.emberGold : C.textSecondary }}>{r.l}</span>
          </button>
        ))}
      </div>
      <textarea className="hl-input mt-8" style={{ minHeight: 100 }} placeholder="Anything you want to remember? (optional)" value={note} onChange={(e) => setNote(e.target.value.slice(0, 200))} />
    </Screen>
  );
}

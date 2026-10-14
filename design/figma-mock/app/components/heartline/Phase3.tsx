import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { addMonths, differenceInCalendarDays, eachDayOfInterval, endOfMonth, format, getDay, isAfter, startOfMonth, subMonths } from 'date-fns';
import { Plus, Check, Archive, ChevronLeft, ChevronRight, Sparkles, Share2, Copy, Gift, Undo2, Heart, Users } from 'lucide-react';
import { C, moods } from './tokens';
import { Avatar, Chip } from './Shared';
import { EmptyState, Screen, Sheet, TextAction, Toggle, Field } from './ui';

/* ───────── Bucket list ───────── */
interface Dream { id: string; title: string; done?: string; tucked?: boolean }
const dreams0: Dream[] = [
  { id: 'b1', title: 'Watch the sunrise from Nandi Hills' },
  { id: 'b2', title: 'Take a pottery class together' },
  { id: 'b3', title: 'Cook a full Sunday feast for friends' },
  { id: 'b4', title: 'See the northern lights', done: 'Sep 14' },
  { id: 'b5', title: 'Learn a duet', tucked: true },
];

function GoldBurst() {
  return (
    <span className="absolute pointer-events-none" style={{ left: 24, top: 24 }}>
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <motion.span key={i} className="absolute rounded-full" style={{ width: 5, height: 5, background: i % 2 ? C.emberGold : C.blush }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }} animate={{ x: Math.cos(a) * 34, y: Math.sin(a) * 34, opacity: 0, scale: 0.4 }} transition={{ duration: 0.9, ease: [0, 0, 0.2, 1] }} />
        );
      })}
    </span>
  );
}

export function BucketList({ onBack, empty }: { onBack: () => void; empty?: boolean }) {
  const [items, setItems] = useState<Dream[]>(empty ? [] : dreams0);
  const [text, setText] = useState('');
  const [burst, setBurst] = useState<string | null>(null);
  const [showTucked, setShowTucked] = useState(false);
  const active = items.filter((i) => !i.tucked);
  const tucked = items.filter((i) => i.tucked);
  const add = () => { if (!text.trim()) return; setItems((x) => [{ id: 'b' + Date.now(), title: text.trim() }, ...x]); setText(''); };
  const toggle = (id: string) => {
    setItems((x) => x.map((i) => (i.id === id ? { ...i, done: i.done ? undefined : format(new Date(), 'MMM d') } : i)));
    const it = items.find((i) => i.id === id);
    if (it && !it.done) { setBurst(id); setTimeout(() => setBurst(null), 1000); }
  };
  return (
    <Screen onBack={onBack}>
      <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream }}>Our bucket list</h2>
      <p className="hl-italic mt-1 mb-5" style={{ fontSize: 14, color: C.textSecondary }}>Dreams for the two of you, saved for someday.</p>
      <div className="flex items-center gap-2 mb-6">
        <input className="hl-input flex-1" style={{ height: 52 }} placeholder="Add something you want to do together..." value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} />
        <button onClick={add} aria-label="Add" className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 52, height: 52, background: `${C.emberGold}26`, border: `1px solid ${C.emberGold}`, opacity: text.trim() ? 1 : 0.6 }}><Plus size={20} color={C.emberGold} strokeWidth={1.5} /></button>
      </div>
      {active.length === 0 && (
        <EmptyState icon={<Sparkles size={44} color={C.emberGold} strokeWidth={1.5} style={{ opacity: 0.6 }} />} title="Dream a little." body="What have you always wanted to do together?" />
      )}
      <div className="flex flex-col gap-3">
        {active.map((it, i) => (
          <div key={it.id} className="hl-card relative p-4 flex items-center gap-3 hl-fade-up" style={{ animationDelay: `${i * 50}ms`, borderLeft: `4px solid ${it.done ? C.emberGold : 'rgba(200,134,58,0.35)'}` }}>
            <button onClick={() => toggle(it.id)} aria-label={it.done ? 'Mark as not done' : 'Mark as done'} className="relative flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 28, height: 28, border: `1.5px solid ${C.emberGold}`, background: it.done ? C.emberGold : 'transparent', transition: 'background 250ms' }}>
              {it.done && <Check size={16} color={C.deepPlum} strokeWidth={2} className="hl-pop" />}
              {burst === it.id && <GoldBurst />}
            </button>
            <div className="flex-1">
              <p className="hl-sans" style={{ fontSize: 15, color: it.done ? C.textSecondary : C.warmCream, textDecoration: it.done ? 'line-through' : 'none', textDecorationColor: C.textMuted }}>{it.title}</p>
              {it.done && <p className="hl-italic hl-fade-up mt-0.5" style={{ fontSize: 12, color: C.emberGold }}>Done together · {it.done}</p>}
            </div>
            <button onClick={() => setItems((x) => x.map((k) => (k.id === it.id ? { ...k, tucked: true } : k)))} aria-label="Tuck away" className="p-1"><Archive size={16} color={C.textSecondary} strokeWidth={1.5} /></button>
          </div>
        ))}
      </div>
      {tucked.length > 0 && (
        <div className="mt-6">
          <TextAction onClick={() => setShowTucked(!showTucked)}>{showTucked ? 'Hide' : 'Show'} tucked away ({tucked.length})</TextAction>
          {showTucked && (
            <div className="flex flex-col gap-2 mt-3">
              {tucked.map((it) => (
                <div key={it.id} className="hl-glass flex items-center gap-3 px-4 hl-fade-up" style={{ height: 52, borderRadius: 20 }}>
                  <span className="hl-sans flex-1" style={{ fontSize: 14, color: C.textSecondary }}>{it.title}</span>
                  <button onClick={() => setItems((x) => x.map((k) => (k.id === it.id ? { ...k, tucked: false } : k)))} className="flex items-center gap-1 hl-sans" style={{ fontSize: 12, color: C.emberGold }}><Undo2 size={14} strokeWidth={1.5} /> Bring back</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Screen>
  );
}

/* ───────── Milestones ───────── */
interface Mile { id: string; title: string; day: Date; yearly: boolean; locked?: boolean }
const miles0: Mile[] = [
  { id: 'm1', title: 'First linked', day: new Date(2026, 1, 14), yearly: true, locked: true },
  { id: 'm2', title: 'First trip together', day: new Date(2026, 3, 19), yearly: false },
  { id: 'm3', title: "Mira's birthday", day: new Date(2026, 5, 2), yearly: true },
  { id: 'm4', title: 'Moved in together', day: new Date(2026, 7, 1), yearly: false },
];

export function Milestones({ onBack }: { onBack: () => void }) {
  const [list, setList] = useState<Mile[]>(miles0);
  const [sheet, setSheet] = useState(false);
  const [title, setTitle] = useState('');
  const [day, setDay] = useState('2026-10-14');
  const [yearly, setYearly] = useState(true);
  const sorted = [...list].sort((a, b) => a.day.getTime() - b.day.getTime());
  const save = () => {
    if (!title.trim()) return;
    const [y, m, d] = day.split('-').map(Number);
    setList((l) => [...l, { id: 'm' + Date.now(), title: title.trim(), day: new Date(y, m - 1, d), yearly }]);
    setTitle(''); setSheet(false);
  };
  return (
    <Screen onBack={onBack} right={<button onClick={() => setSheet(true)} aria-label="Add milestone" className="flex items-center justify-center rounded-full" style={{ width: 40, height: 40, background: `${C.emberGold}26`, border: `1px solid ${C.emberGold}` }}><Plus size={18} color={C.emberGold} strokeWidth={1.5} /></button>}>
      <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream }}>Milestones</h2>
      <p className="hl-italic mt-1 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>The days that made you, you two.</p>
      <div className="relative pl-8">
        <span className="absolute" style={{ left: 9, top: 8, bottom: 8, width: 2, background: `linear-gradient(180deg, ${C.emberGold}, ${C.emberGold}33)`, borderRadius: 2 }} />
        {sorted.map((m, i) => (
          <div key={m.id} className="relative mb-5 hl-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <span className={`absolute rounded-full ${m.locked ? 'hl-pulse-glow' : ''}`} style={{ left: -31, top: 18, width: 12, height: 12, background: C.emberGold, boxShadow: `0 0 0 4px ${C.deepPlum}` }} />
            <div className="hl-card p-4">
              <div className="flex items-center justify-between">
                <p className="hl-display-reg" style={{ fontSize: 21, color: C.warmCream }}>{m.title}</p>
                {m.yearly && <Chip color={C.emberGold}>Every year</Chip>}
              </div>
              <p className="hl-sans mt-1" style={{ fontSize: 12, color: C.textSecondary }}>{format(m.day, 'MMMM d, yyyy')} · {Math.floor(differenceInCalendarDays(new Date(), m.day) / 30)} months ago</p>
            </div>
          </div>
        ))}
      </div>
      <Sheet open={sheet} onClose={() => setSheet(false)}>
        <h3 className="hl-display-reg mb-5" style={{ fontSize: 26, color: C.warmCream }}>Add a milestone</h3>
        <Field label="What happened?"><input className="hl-input" placeholder="Our first apartment" value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
        <Field label="The day"><input type="date" className="hl-input" style={{ colorScheme: 'dark' }} value={day} onChange={(e) => setDay(e.target.value)} /></Field>
        <div className="flex items-center justify-between mb-6">
          <span className="hl-sans" style={{ fontSize: 15, color: C.warmCream }}>Repeats every year</span>
          <Toggle on={yearly} onChange={setYearly} color={C.emberGold} />
        </div>
        <button className="hl-primary-btn w-full" disabled={!title.trim()} style={{ opacity: title.trim() ? 1 : 0.4 }} onClick={save}>Add milestone</button>
      </Sheet>
    </Screen>
  );
}

/* ───────── Mood calendar ───────── */
const TODAY = new Date(2026, 9, 14);
export function MoodCalendar({ onBack, onSummary }: { onBack: () => void; onSummary: () => void }) {
  const [month, setMonth] = useState(startOfMonth(TODAY));
  const [pick, setPick] = useState<Date | null>(TODAY);
  const days = useMemo(() => eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) }), [month]);
  const moodFor = (d: Date, who: number) => (isAfter(d, TODAY) ? null : moods[(d.getDate() * 3 + who * 2 + d.getMonth()) % 5]);
  const lead = getDay(startOfMonth(month));
  const canNext = isAfter(startOfMonth(addMonths(month, 1)), TODAY) === false;
  return (
    <Screen onBack={onBack}>
      <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream }}>Mood calendar</h2>
      <p className="hl-italic mt-1 mb-5" style={{ fontSize: 14, color: C.textSecondary }}>How you both have been, day by day.</p>
      <div className="flex items-center justify-between mb-3">
        <button aria-label="Previous month" onClick={() => setMonth(subMonths(month, 1))} className="p-2"><ChevronLeft size={20} color={C.dustyRose} strokeWidth={1.5} /></button>
        <span className="hl-display-reg" style={{ fontSize: 22, color: C.warmCream }}>{format(month, 'MMMM yyyy')}</span>
        <button aria-label="Next month" disabled={!canNext} onClick={() => setMonth(addMonths(month, 1))} className="p-2" style={{ opacity: canNext ? 1 : 0.3 }}><ChevronRight size={20} color={C.dustyRose} strokeWidth={1.5} /></button>
      </div>
      <div className="hl-card p-3">
        <div className="grid grid-cols-7 mb-1">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <span key={i} className="hl-micro text-center" style={{ fontSize: 10, color: C.textMuted }}>{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: lead }).map((_, i) => <span key={'l' + i} />)}
          {days.map((d) => {
            const a = moodFor(d, 0), b = moodFor(d, 1);
            const sel = pick && format(pick, 'yyyyMMdd') === format(d, 'yyyyMMdd');
            return (
              <button key={d.toISOString()} disabled={!a} onClick={() => setPick(d)} className="flex flex-col items-center justify-center" style={{ height: 52, borderRadius: 14, background: sel ? `${C.dustyRose}26` : 'transparent', border: `1px solid ${sel ? C.dustyRose : 'transparent'}`, opacity: a ? 1 : 0.3 }}>
                <span className="hl-sans" style={{ fontSize: 10, color: C.textSecondary }}>{d.getDate()}</span>
                <span className="flex gap-0.5 mt-0.5">
                  {[a, b].map((m, k) => m && <span key={k} className="flex items-center justify-center rounded-full" style={{ width: 16, height: 16, fontSize: 10, background: `${m.color}33`, boxShadow: `0 0 0 1px ${m.color}` }}>{m.emoji}</span>)}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-3 mb-5">
        {moods.map((m) => <span key={m.key} className="hl-sans flex items-center gap-1" style={{ fontSize: 10, color: m.color }}><span className="rounded-full" style={{ width: 6, height: 6, background: m.color }} />{m.label}</span>)}
      </div>
      {pick && moodFor(pick, 0) && (
        <div className="hl-glass p-4 hl-fade-up" key={pick.toISOString()}>
          <p className="hl-micro mb-3" style={{ color: C.textSecondary }}>{format(pick, 'EEEE, MMMM d')}</p>
          {[{ n: 'You', w: 0, i: 'E' }, { n: 'Mira', w: 1, i: 'M' }].map((p) => {
            const m = moodFor(pick, p.w)!;
            return (
              <div key={p.n} className="flex items-center gap-3 mb-2">
                <Avatar initial={p.i} size={28} color={p.i === 'M' ? C.lavender : C.velvetCrimson} color2={C.dustyRose} />
                <span className="hl-sans flex-1" style={{ fontSize: 14, color: C.warmCream }}>{p.n}</span>
                <Chip color={m.color}>{m.emoji} {m.label}</Chip>
              </div>
            );
          })}
        </div>
      )}
      <div className="text-center mt-6"><TextAction onClick={onSummary}>See your weekly summary</TextAction></div>
    </Screen>
  );
}

/* ───────── Weekly summary ───────── */
const weeks = [
  { w: 'Oct 5 – 11', insight: "This was a gentler week. You both checked in every day, and the evenings you spent phone-free are the ones you both mentioned.", hearts: 1, good: 1, drops: 2, moodLine: 'Mostly calm' },
  { w: 'Sep 28 – Oct 4', insight: 'A busier stretch. Mira felt overwhelmed midweek, and your Hug came within the hour. That kind of quick softness counts.', hearts: 2, good: 1, drops: 1, moodLine: 'A little stretched' },
  { w: 'Sep 21 – 27', insight: 'You noticed each other in small ways: three Appreciation Drops, all about ordinary moments. Those tend to be the ones that stay.', hearts: 0, good: 0, drops: 3, moodLine: 'Bright and easy' },
];
export function WeeklySummary({ onBack, empty }: { onBack: () => void; empty?: boolean }) {
  return (
    <Screen onBack={onBack}>
      <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream }}>Your weeks</h2>
      <p className="hl-italic mt-1 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>A gentle look at how you two have been.</p>
      {empty ? (
        <EmptyState icon={<Sparkles size={44} color={C.lavender} strokeWidth={1.5} style={{ opacity: 0.6 }} />} title="Your first week is brewing." body="We'll gather it here after Sunday." />
      ) : (
        <div className="flex flex-col gap-4">
          {weeks.map((k, i) => (
            <div key={k.w} className="hl-glass p-5 hl-fade-up" style={{ animationDelay: `${i * 120}ms`, animationDuration: '800ms' }}>
              <p className="hl-micro" style={{ color: C.textSecondary }}>Week of {k.w}</p>
              <div className="flex items-start gap-2 mt-3">
                <Sparkles size={16} color={C.lavender} strokeWidth={1.5} className="mt-1 flex-shrink-0" />
                <p className="hl-display-reg" style={{ fontSize: 18, color: C.warmCream, lineHeight: 1.5 }}>{k.insight}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Chip color={C.dustyRose}>{k.hearts} {k.hearts === 1 ? 'Heart' : 'Hearts'}</Chip>
                <Chip color={C.sage}>{k.good} We're Good</Chip>
                <Chip color={C.lavender}>{k.drops} Appreciation Drops</Chip>
                <Chip color={C.emberGold}>{k.moodLine}</Chip>
              </div>
            </div>
          ))}
        </div>
      )}
    </Screen>
  );
}

/* ───────── Palette picker ───────── */
const swatches = [
  { n: 'Dusty Rose', c: C.dustyRose, tag: 'Classic' },
  { n: 'Blush', c: C.blush },
  { n: 'Lavender Dusk', c: C.lavender },
  { n: 'Sage Whisper', c: C.sage },
  { n: 'Ember Gold', c: C.emberGold },
  { n: 'Dawn Blue', c: C.dawnBlue },
  { n: 'Warm Amber', c: C.warmAmber },
  { n: 'Petal', c: C.petal },
];
export function PalettePicker({ onBack }: { onBack: () => void }) {
  const [sel, setSel] = useState(0);
  const [saved, setSaved] = useState(0);
  const a = swatches[sel];
  return (
    <Screen onBack={onBack} footer={<button className="hl-primary-btn w-full" disabled={sel === saved} style={{ opacity: sel === saved ? 0.4 : 1, boxShadow: sel === saved ? 'none' : undefined }} onClick={() => setSaved(sel)}>{sel === saved ? 'Saved for you both' : 'Save our palette'}</button>}>
      <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream }}>Your palette</h2>
      <p className="hl-italic mt-1 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>Pick the accent that feels like you two. Mira will see it too.</p>

      <div className="hl-glass p-5 mb-6" style={{ borderColor: `${a.c}66`, transition: 'border-color 400ms' }}>
        <div className="flex items-center gap-3 mb-4">
          <Avatar initial="E" size={40} color={C.velvetCrimson} color2={a.c} />
          <div className="flex-1">
            <p className="hl-display-reg" style={{ fontSize: 20, color: C.warmCream }}>Your Space</p>
            <p className="hl-sans" style={{ fontSize: 11, color: C.textSecondary }}>Together for 8 months</p>
          </div>
          <Heart size={20} color={a.c} fill={a.c} style={{ transition: 'all 400ms' }} />
        </div>
        <button className="w-full hl-sans" style={{ height: 48, borderRadius: 9999, background: `linear-gradient(135deg, ${C.velvetCrimson}, ${a.c})`, color: C.warmCream, fontWeight: 600, fontSize: 14, transition: 'background 400ms' }}>Open a Heart</button>
        <div className="flex items-center gap-2 mt-4">
          <span className="hl-chip" style={{ background: `${a.c}26`, border: `1px solid ${a.c}66`, color: a.c }}>🌙 Lonely</span>
          <span className="hl-chip" style={{ border: `1px solid ${a.c}`, color: a.c }}>Hug</span>
          <span className="ml-auto block" style={{ width: 24, height: 3, borderRadius: 9999, background: a.c }} />
        </div>
      </div>

      <p className="hl-micro mb-3" style={{ color: C.textSecondary }}>Accent</p>
      <div className="grid grid-cols-4 gap-3">
        {swatches.map((s, i) => (
          <button key={s.n} onClick={() => setSel(i)} className="flex flex-col items-center gap-2" aria-label={s.n}>
            <span className="flex items-center justify-center rounded-full" style={{ width: 56, height: 56, background: `linear-gradient(135deg, ${s.c}, ${C.velvetCrimson})`, boxShadow: sel === i ? `0 0 0 2px ${C.deepPlum}, 0 0 0 4px ${s.c}` : 'none', transform: sel === i ? 'scale(1.08)' : 'scale(1)', transition: 'transform 250ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 250ms' }}>
              {sel === i && <Check size={18} color={C.warmCream} className="hl-pop" />}
            </span>
            <span className="hl-sans text-center" style={{ fontSize: 10, color: sel === i ? C.warmCream : C.textSecondary }}>{s.n}</span>
          </button>
        ))}
      </div>
      <p className="hl-italic text-center mt-6" style={{ fontSize: 12, color: C.textSecondary }}>Heartline stays dark. Always your quiet night.</p>
    </Screen>
  );
}

/* ───────── Referral ───────── */
const friends = [
  { n: 'Anika & Dev', s: 'Linked', c: C.sage },
  { n: 'Tara & Sam', s: 'Linked', c: C.sage },
  { n: 'Ritu & Jay', s: 'Invited', c: C.textSecondary },
];
export function Referral({ onBack }: { onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <Screen onBack={onBack}>
      <div className="flex flex-col items-center text-center pt-2">
        <span className="flex items-center justify-center rounded-full hl-float" style={{ width: 72, height: 72, background: `${C.emberGold}1A`, border: `1px solid ${C.emberGold}59`, boxShadow: '0 0 24px rgba(200,134,58,0.35)' }}><Gift size={30} color={C.emberGold} strokeWidth={1.5} /></span>
        <h2 className="hl-display mt-5" style={{ fontSize: 32, color: C.warmCream, lineHeight: 1.15 }}>Share the love</h2>
        <p className="hl-sans mt-2 mx-auto" style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6, maxWidth: 290 }}>When another couple links up with your code, you both get a free month of Heartline Plus.</p>
      </div>
      <div className="hl-glass mt-6 p-5 text-center">
        <p className="hl-micro" style={{ color: C.textSecondary }}>Your invite code</p>
        <p className="hl-sans mt-1" style={{ fontSize: 28, fontWeight: 600, letterSpacing: 6, color: C.warmCream }}>ELENA-MIRA</p>
        <div className="flex gap-3 mt-4">
          <button className="hl-primary-btn flex-1 flex items-center justify-center gap-2" style={{ height: 48, fontSize: 14 }}><Share2 size={16} strokeWidth={1.5} /> Invite friends</button>
          <button className="hl-secondary-btn flex-1 flex items-center justify-center gap-2" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }}>{copied ? <><Check size={16} /> Copied</> : <><Copy size={16} strokeWidth={1.5} /> Copy</>}</button>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2 mb-3 px-1"><Users size={14} color={C.dustyRose} strokeWidth={1.5} /><span className="hl-micro" style={{ color: C.textSecondary }}>Couples you've brought in</span></div>
      <div className="hl-card overflow-hidden">
        {friends.map((f, i) => (
          <div key={f.n} className="flex items-center gap-3 px-4" style={{ height: 56, borderBottom: i < friends.length - 1 ? '1px solid rgba(196,104,122,0.08)' : 'none' }}>
            <Heart size={16} color={C.dustyRose} strokeWidth={1.5} />
            <span className="hl-sans flex-1" style={{ fontSize: 15, color: C.warmCream }}>{f.n}</span>
            <span className="hl-sans" style={{ fontSize: 12, color: f.c }}>{f.s}</span>
          </div>
        ))}
      </div>
      <p className="hl-italic text-center mt-5" style={{ fontSize: 13, color: C.emberGold }}>2 months of Plus earned</p>
    </Screen>
  );
}

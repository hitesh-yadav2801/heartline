import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, ChevronDown, ArrowRight } from 'lucide-react';
import { C } from './tokens';
import { Avatar, PulseDots } from './Shared';
import { HeartReact, Screen, TextAction } from './ui';

const questions = [
  'What made you feel closest to Mira this week?',
  'Was there a moment you needed a little more from us?',
  'What is one small thing that would make next week softer?',
];
const miraAnswers = [
  'Sunday morning, when you brought me tea without asking and we stayed in the quiet for an hour.',
  'Wednesday night. I was winding down from work and I wanted you to ask how I was, not just how the day went.',
  'A walk after dinner, phones in the drawer. Even just twenty minutes.',
];

export type PulseStage = 'intro' | 'q0' | 'q1' | 'q2' | 'waiting' | 'reveal';

export function WeeklyPulse({ onBack, onPast, initial = 'intro' }: { onBack: () => void; onPast: () => void; initial?: PulseStage }) {
  const [stage, setStage] = useState<PulseStage>(initial);
  const [answers, setAnswers] = useState<string[]>(initial === 'reveal' || initial === 'waiting' ? ['I felt closest when we cooked together on Saturday and you let me pick the music.', 'Thursday. I wanted a hug before we both opened our laptops.', 'A slow Sunday with nothing scheduled.'] : ['', '', '']);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (stage !== 'waiting' || initial === 'waiting') return;
    const t = setTimeout(() => setStage('reveal'), 3800);
    return () => clearTimeout(t);
  }, [stage, initial]);

  const qi = stage.startsWith('q') ? Number(stage[1]) : -1;
  const next = () => setStage(qi < 2 ? (`q${qi + 1}` as PulseStage) : 'waiting');

  return (
    <Screen
      onBack={qi > 0 ? () => setStage(`q${qi - 1}` as PulseStage) : onBack}
      center={qi >= 0 ? (
        <div className="flex gap-2 items-center" aria-label={`Question ${qi + 1} of 3`}>
          {[0, 1, 2].map((i) => <span key={i} className="rounded-full" style={{ width: i === qi ? 22 : 6, height: 6, background: i <= qi ? C.dustyRose : 'rgba(196,104,122,0.3)', transition: 'all 400ms cubic-bezier(0.34,1.56,0.64,1)' }} />)}
        </div>
      ) : undefined}
    >
      {stage === 'intro' && (
        <div className="flex flex-col items-center text-center pt-10">
          <div className="relative flex items-center justify-center" style={{ width: 150, height: 150 }}>
            <span className="absolute rounded-full hl-ripple" style={{ width: 100, height: 100, border: `2px solid ${C.lavender}`, opacity: 0.4 }} />
            <span className="absolute rounded-full hl-ripple" style={{ width: 100, height: 100, border: `2px solid ${C.dustyRose}`, opacity: 0.3, animationDelay: '600ms' }} />
            <span className="hl-heartbeat flex items-center justify-center rounded-full" style={{ width: 90, height: 90, background: `radial-gradient(circle at 40% 30%, ${C.velvetCrimson}, ${C.lavender})` }}>
              <Activity size={36} color={C.warmCream} strokeWidth={1.5} />
            </span>
          </div>
          <h2 className="hl-display mt-8" style={{ fontSize: 34, color: C.warmCream, lineHeight: 1.15 }}>Your weekly pulse is here</h2>
          <p className="hl-italic mt-3" style={{ fontSize: 18, color: C.textSecondary }}>3 questions. 3 minutes.</p>
          <p className="hl-sans mt-3 mx-auto" style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, maxWidth: 270 }}>Answer privately. Neither of you sees the other's words until you've both finished.</p>
          <button className="hl-primary-btn w-full mt-10" onClick={() => setStage('q0')}>Begin</button>
          <TextAction className="mt-4" onClick={onPast}>Past pulses</TextAction>
        </div>
      )}

      {qi >= 0 && (
        <AnimatePresence mode="wait">
          <motion.div key={qi} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35, ease: [0, 0, 0.2, 1] }} className="pt-6">
            <p className="hl-micro" style={{ color: C.lavender }}>Question {qi + 1} of 3</p>
            <div className="hl-card mt-3 p-6" style={{ borderColor: `${C.lavender}40` }}>
              <h2 className="hl-display-reg" style={{ fontSize: 28, color: C.warmCream, lineHeight: 1.25 }}>{questions[qi]}</h2>
            </div>
            <textarea className="hl-input mt-5" style={{ minHeight: 150 }} placeholder="Take your time. Write it softly." value={answers[qi]} onChange={(e) => setAnswers((a) => a.map((x, i) => (i === qi ? e.target.value.slice(0, 300) : x)))} />
            <p className="hl-sans text-right mt-2" style={{ fontSize: 11, color: C.textSecondary }}>{answers[qi].length}/300</p>
            <button className="hl-primary-btn w-full mt-4 flex items-center justify-center gap-2" disabled={!answers[qi].trim()} style={{ opacity: answers[qi].trim() ? 1 : 0.4 }} onClick={next}>
              {qi < 2 ? <>Next <ArrowRight size={18} /></> : 'Send to Mira'}
            </button>
            <div className="text-center mt-4"><TextAction onClick={next}>Skip this one</TextAction></div>
          </motion.div>
        </AnimatePresence>
      )}

      {stage === 'waiting' && (
        <div className="flex flex-col items-center text-center pt-24">
          <div className="flex items-center gap-6">
            <Avatar initial="E" size={64} ring="sage" />
            <span className="block" style={{ width: 40, borderTop: `1px dashed ${C.dustyRose}66` }} />
            <div className="hl-heartbeat"><Avatar initial="M" size={64} color={C.lavender} color2={C.dustyRose} /></div>
          </div>
          <h2 className="hl-display-reg mt-8" style={{ fontSize: 28, color: C.warmCream }}>Waiting for Mira</h2>
          <div className="mt-5"><PulseDots color={C.lavender} /></div>
          <p className="hl-sans mt-5 mx-auto" style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, maxWidth: 260 }}>Your answers are tucked away until you've both shared.</p>
        </div>
      )}

      {stage === 'reveal' && (
        <div className="pt-2">
          <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream, lineHeight: 1.15 }}>Here's your week</h2>
          <p className="hl-italic mt-1 mb-5" style={{ fontSize: 14, color: C.textSecondary }}>Side by side, for the first time.</p>
          <div className="flex flex-col gap-4">
            {questions.map((q, i) => (
              <div key={q} className="hl-card p-4 hl-fade-up" style={{ animationDelay: `${i * 450}ms`, animationDuration: '800ms' }}>
                <p className="hl-display-reg mb-3" style={{ fontSize: 17, color: C.warmCream, lineHeight: 1.3 }}>{q}</p>
                <div className="grid grid-cols-2 gap-2">
                  {[{ who: 'E', name: 'You', text: answers[i] || 'You skipped this one.', color: C.dustyRose }, { who: 'M', name: 'Mira', text: miraAnswers[i], color: C.lavender }].map((a, k) => (
                    <div key={a.who} className="flex flex-col hl-fade-up" style={{ animationDelay: `${i * 450 + 300 + k * 250}ms`, animationDuration: '800ms', borderRadius: 20, padding: 12, background: `${a.color}14`, border: `1px solid ${a.color}55` }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar initial={a.who} size={22} color={a.who === 'M' ? C.lavender : C.velvetCrimson} color2={C.dustyRose} />
                        <span className="hl-sans" style={{ fontSize: 11, color: a.color, fontWeight: 500 }}>{a.name}</span>
                      </div>
                      <p className="hl-sans flex-1" style={{ fontSize: 12.5, lineHeight: 1.55, color: C.textPrimary }}>{a.text}</p>
                      <div className="flex justify-end mt-1">
                        {a.who === 'M' ? <HeartReact color={C.lavender} size={16} active={!!liked[`${i}M`]} onClick={() => setLiked((l) => ({ ...l, [`${i}M`]: !l[`${i}M`] }))} /> : <HeartReact color={C.dustyRose} size={16} active={!!liked[`${i}E`]} onClick={() => setLiked((l) => ({ ...l, [`${i}E`]: !l[`${i}E`] }))} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6"><TextAction onClick={onPast}>Past pulses</TextAction></div>
        </div>
      )}
    </Screen>
  );
}

const past = [
  { id: 1, week: 'Oct 5 – 11', theme: 'Softer evenings', q: 'What made you feel closest to Mira this week?', you: 'Cooking together on Saturday.', them: 'Sunday tea in the quiet.' },
  { id: 2, week: 'Sep 28 – Oct 4', theme: 'Making time', q: 'What is one small thing that would make next week softer?', you: 'A slow Sunday with nothing planned.', them: 'A walk after dinner.' },
  { id: 3, week: 'Sep 21 – 27', theme: 'Feeling heard', q: 'Was there a moment you needed a little more from us?', you: 'Thursday, before we opened our laptops.', them: 'When I was telling you about work.' },
];

export function PulsePast({ onBack, empty }: { onBack: () => void; empty?: boolean }) {
  const [open, setOpen] = useState<number | null>(1);
  const list = empty ? [] : past;
  return (
    <Screen onBack={onBack}>
      <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream }}>Past pulses</h2>
      <p className="hl-italic mt-1 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>Every week you stopped to listen.</p>
      {list.length === 0 && (
        <div className="text-center py-12">
          <Activity size={44} color={C.lavender} strokeWidth={1.5} style={{ opacity: 0.6 }} className="mx-auto mb-4" />
          <p className="hl-display-reg" style={{ fontSize: 26, color: C.warmCream }}>Your first pulse is coming.</p>
          <p className="hl-sans mt-2" style={{ fontSize: 14, color: C.textSecondary }}>Each week's answers will gather here.</p>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {list.map((p, i) => (
          <div key={p.id} className="hl-card overflow-hidden hl-fade-up" style={{ animationDelay: `${i * 60}ms`, borderLeft: `4px solid ${i % 2 ? C.lavender : C.dustyRose}` }}>
            <button className="w-full flex items-center gap-3 p-4 text-left" onClick={() => setOpen(open === p.id ? null : p.id)}>
              <div className="flex-1">
                <p className="hl-micro" style={{ color: C.textSecondary }}>Week of {p.week}</p>
                <p className="hl-display-reg mt-1" style={{ fontSize: 20, color: C.warmCream }}>{p.theme}</p>
              </div>
              <ChevronDown size={18} color={C.textSecondary} style={{ transform: open === p.id ? 'rotate(180deg)' : 'none', transition: 'transform 300ms' }} />
            </button>
            {open === p.id && (
              <div className="px-4 pb-4 hl-fade-up">
                <p className="hl-italic mb-3" style={{ fontSize: 14, color: C.textSecondary }}>{p.q}</p>
                <p className="hl-sans mb-2" style={{ fontSize: 13, color: C.textPrimary }}><span style={{ color: C.dustyRose }}>You · </span>{p.you}</p>
                <p className="hl-sans" style={{ fontSize: 13, color: C.textPrimary }}><span style={{ color: C.lavender }}>Mira · </span>{p.them}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Screen>
  );
}

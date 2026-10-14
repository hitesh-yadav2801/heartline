import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Camera, Image as ImageIcon, Check, Link2, Copy, Share2 } from 'lucide-react';
import { C } from './tokens';
import { Avatar, PulseDots } from './Shared';
import { BackBtn, Confetti, Jar, Sheet, TextAction, loveLanguages, useTypewriter } from './ui';

const bloom = 'radial-gradient(420px 320px at 50% 0%, rgba(139,26,74,0.22), transparent 70%)';

/* ───────── Onboarding ───────── */
function OverlapVisual({ second }: { second?: React.ReactNode }) {
  return (
    <div className="relative" style={{ width: 200, height: 130 }}>
      <span className="absolute hl-heartbeat rounded-full" style={{ left: 0, top: 5, width: 120, height: 120, background: `radial-gradient(circle at 40% 40%, ${C.velvetCrimson}, transparent 75%)`, border: `1px solid ${C.velvetCrimson}` }} />
      <span className="absolute hl-heartbeat rounded-full" style={{ left: 80, top: 5, width: 120, height: 120, background: `radial-gradient(circle at 60% 40%, ${C.dustyRose}, transparent 75%)`, border: `1px solid ${C.dustyRose}`, animationDelay: '150ms' }} />
      <span className="absolute rounded-full" style={{ left: 80, top: 35, width: 40, height: 60, background: `${C.blush}66`, filter: 'blur(14px)' }} />
      {second}
    </div>
  );
}

function HeartOutlineVisual() {
  const text = useTypewriter("I've been feeling a little lonely.", 40);
  return (
    <div className="relative flex items-center justify-center hl-float" style={{ width: 170, height: 150 }}>
      <svg width="140" height="126" viewBox="0 0 48 44" fill="none" className="absolute">
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.velvetCrimson} />
            <stop offset="1" stopColor={C.dustyRose} />
          </linearGradient>
        </defs>
        <path d="M24 41 L9.5 25.5 C4.5 20 3.5 13 8 8.5 C12.5 4.5 20 5.5 24 11 C28 5.5 35.5 4.5 40 8.5 C44.5 13 43.5 20 38.5 25.5 Z" stroke="url(#hg)" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <p className="hl-italic relative text-center" style={{ fontSize: 14, color: C.blush, width: 92, lineHeight: 1.3, marginTop: -6, minHeight: 56 }}>{text}</p>
      <span className="absolute hl-heartbeat rounded-full" style={{ bottom: 2, width: 7, height: 7, background: C.dustyRose }} />
    </div>
  );
}

export function Onboarding({ variant = 'a', onDone, onSkip }: { variant?: 'a' | 'b'; onDone: () => void; onSkip: () => void }) {
  const [i, setI] = useState(0);
  const slides =
    variant === 'b'
      ? [{ visual: <OverlapVisual second={<span className="absolute" style={{ left: 40, top: 32 }}><Avatar initial="E" size={56} ring="rose" /></span>} />, h: 'Elena made a space for you two.', b: 'Join with the code from your invite and step inside. A private world, just for the two of you.' }]
      : [
          { visual: <OverlapVisual />, h: 'A space only for you two.', b: 'Not WhatsApp. Not a diary. A private world built just for your relationship.' },
          { visual: <HeartOutlineVisual />, h: 'Say what you feel, gently.', b: 'Open a Heart when something is bothering you. No confrontation. Just honesty.' },
          { visual: <Jar scale={1.5} />, h: 'Every moment you work through, saved.', b: "Your Memory Jar holds every Heart you've worked through together. Look back anytime." },
        ];
  const s = slides[i];
  const last = i === slides.length - 1;
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: bloom }}>
      <div className="flex justify-end px-6 pt-8 h-16">
        {!last && <button className="hl-sans" style={{ fontSize: 14, fontWeight: 500, color: C.textSecondary }} onClick={onSkip}>Skip</button>}
      </div>
      <div key={i} className="flex-1 flex flex-col items-center px-8 text-center">
        <div className="flex items-center justify-center hl-fade-up" style={{ height: '42%', animationDelay: '300ms' }}>{s.visual}</div>
        <h2 className="hl-display hl-fade-up mt-4" style={{ fontSize: 38, lineHeight: 1.2, color: C.warmCream }}>{s.h}</h2>
        <p className="hl-sans hl-fade-up mt-4" style={{ fontSize: 15, lineHeight: 1.65, color: C.textSecondary, maxWidth: '84%', animationDelay: '150ms' }}>{s.b}</p>
      </div>
      <div className="px-6 pb-8">
        {slides.length > 1 && (
          <div className="flex justify-center gap-2 mb-6">
            {slides.map((_, k) => (
              <button key={k} aria-label={`Slide ${k + 1}`} onClick={() => setI(k)} className="rounded-full" style={{ width: 6, height: 6, background: C.dustyRose, opacity: k === i ? 1 : 0.3, transition: 'opacity 300ms' }} />
            ))}
          </div>
        )}
        <button className="hl-primary-btn w-full hl-fade-up" key={'b' + i} style={{ animationDelay: '450ms' }} onClick={() => (last ? onDone() : setI(i + 1))}>
          {last ? 'Get Started' : 'Continue'}
        </button>
      </div>
    </div>
  );
}

/* ───────── Auth ───────── */
export function Auth({ onDone, partnerInvite }: { onDone: () => void; partnerInvite?: boolean }) {
  const [mode, setMode] = useState<'in' | 'up'>(partnerInvite ? 'up' : 'in');
  const [show, setShow] = useState(false);
  const up = mode === 'up';
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: bloom }}>
      <div className="flex items-center justify-center hl-float" style={{ height: '30%' }}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={C.dustyRose} strokeWidth="1" style={{ opacity: 0.2 }}>
          {[0, 45, 90, 135].map((a) => <ellipse key={a} cx="60" cy="60" rx="18" ry="50" transform={`rotate(${a} 60 60)`} />)}
          <circle cx="60" cy="60" r="8" />
        </svg>
      </div>
      <div className="flex-1 overflow-y-auto hl-scroll-hide px-6 pb-8 hl-fade-up">
        <h2 className="hl-display" style={{ fontSize: 34, color: C.warmCream, lineHeight: 1.15 }}>Welcome to Heartline</h2>
        <p className="hl-sans mt-1 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>{up ? 'Make your space.' : 'Sign in to your space.'}</p>
        <input className="hl-input mb-3" type="email" placeholder="Email" defaultValue={partnerInvite ? '' : 'elena@heartline.app'} />
        <div className="relative">
          <input className="hl-input" type={show ? 'text' : 'password'} placeholder="Password" defaultValue="softlandings" style={{ paddingRight: 48 }} />
          <button onClick={() => setShow(!show)} aria-label="Show or hide password" className="absolute right-4 top-1/2 -translate-y-1/2">
            {show ? <EyeOff size={20} color={C.dustyRose} strokeWidth={1.5} /> : <Eye size={20} color={C.dustyRose} strokeWidth={1.5} />}
          </button>
        </div>
        {!up && <div className="flex justify-end mt-2"><TextAction color={C.dustyRose}>Forgot password?</TextAction></div>}
        <button className="hl-primary-btn w-full mt-5" onClick={onDone}>Continue</button>
        <div className="flex items-center gap-3 my-5">
          <span className="flex-1" style={{ height: 1, background: 'rgba(196,104,122,0.2)' }} />
          <span className="hl-sans" style={{ fontSize: 13, color: C.textSecondary }}>or</span>
          <span className="flex-1" style={{ height: 1, background: 'rgba(196,104,122,0.2)' }} />
        </div>
        <button className="hl-secondary-btn w-full flex items-center justify-center gap-3" onClick={onDone}>
          <span className="flex items-center justify-center rounded-full hl-sans" style={{ width: 24, height: 24, border: `1.5px solid ${C.dustyRose}`, fontSize: 13, fontWeight: 600 }}>G</span>
          Continue with Google
        </button>
        <p className="hl-sans text-center mt-6" style={{ fontSize: 14, color: C.textSecondary }}>
          {up ? 'Already have an account? ' : "Don't have an account? "}
          <button onClick={() => setMode(up ? 'in' : 'up')} style={{ color: C.dustyRose, textDecoration: 'underline' }}>{up ? 'Sign in' : 'Sign up'}</button>
        </p>
      </div>
    </div>
  );
}

/* ───────── Profile setup ───────── */
export function ProfileSetup({ partnerName = 'Mira', initialName = 'Elena', onDone, onBack }: { partnerName?: string; initialName?: string; onDone: () => void; onBack: () => void }) {
  const [name, setName] = useState(initialName);
  const [sel, setSel] = useState<string | null>('words');
  const [sheet, setSheet] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!uploading) return;
    const t = setTimeout(() => { setUploading(false); setDone(true); }, 1600);
    return () => clearTimeout(t);
  }, [uploading]);

  const r = 52, circ = 2 * Math.PI * r;
  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="px-3 pt-4"><BackBtn onClick={onBack} /></div>
      <div className="flex-1 overflow-y-auto hl-scroll-hide px-5 pb-4 hl-fade-up">
        <div className="flex justify-center mt-2">
          <button className="relative" onClick={() => setSheet(true)} aria-label="Change photo">
            <Avatar initial={(name[0] || 'E').toUpperCase()} size={96} />
            <svg width="112" height="112" className="absolute -rotate-90" style={{ left: -8, top: -8 }}>
              <circle cx="56" cy="56" r={r} fill="none" stroke={C.dustyRose} strokeWidth="2" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={uploading ? 0 : circ} style={{ transition: 'stroke-dashoffset 1600ms cubic-bezier(0.45,0.05,0.55,0.95)', opacity: uploading ? 1 : 0 }} />
            </svg>
            <span className="absolute flex items-center justify-center rounded-full" style={{ right: 0, bottom: 0, width: 30, height: 30, background: C.midnightRose, border: `1.5px solid ${C.dustyRose}` }}>
              {done ? <Check size={14} color={C.sage} /> : <Camera size={14} color={C.dustyRose} strokeWidth={1.5} />}
            </span>
          </button>
        </div>
        <h2 className="hl-display-reg text-center mt-4 mb-5" style={{ fontSize: 28, color: C.warmCream, lineHeight: 1.2 }}>How should {partnerName} know you?</h2>
        <input className="hl-input mb-6" placeholder="Display name" value={name} onChange={(e) => setName(e.target.value)} />
        <p className="hl-micro mb-3" style={{ color: C.textSecondary }}>Your love language</p>
        <div className="flex flex-col gap-2">
          {loveLanguages.map(({ key, label, Icon }) => {
            const on = sel === key;
            return (
              <button key={key} onClick={() => setSel(key)} className="flex items-center gap-3 px-4 text-left" style={{ height: 64, borderRadius: 24, background: on ? 'rgba(196,104,122,0.12)' : C.midnightRose, border: `1.5px solid ${on ? C.dustyRose : 'rgba(196,104,122,0.10)'}`, transition: 'background 250ms, border-color 250ms' }}>
                <Icon size={20} color={C.dustyRose} strokeWidth={1.5} />
                <span className="hl-sans flex-1" style={{ fontSize: 15, fontWeight: 500, color: C.warmCream }}>{label}</span>
                <span className="flex items-center justify-center rounded-full" style={{ width: 20, height: 20, border: `1.5px solid ${on ? C.dustyRose : C.textMuted}` }}>
                  {on && <span className="hl-pop rounded-full" style={{ width: 10, height: 10, background: `linear-gradient(135deg, ${C.velvetCrimson}, ${C.dustyRose})` }} />}
                </span>
              </button>
            );
          })}
        </div>
        <div className="text-center mt-4"><TextAction onClick={() => { setSel(null); onDone(); }}>I'll set this later</TextAction></div>
      </div>
      <div className="px-5 pb-6 pt-2">
        <button className="hl-primary-btn w-full" disabled={!name.trim()} style={{ opacity: name.trim() ? 1 : 0.4 }} onClick={onDone}>Save and Continue</button>
      </div>
      <Sheet open={sheet} onClose={() => setSheet(false)}>
        <h3 className="hl-display-reg mb-4" style={{ fontSize: 24, color: C.warmCream }}>Add a photo</h3>
        {[{ l: 'Take a photo', Icon: Camera }, { l: 'Choose from gallery', Icon: ImageIcon }].map(({ l, Icon }) => (
          <button key={l} className="hl-card w-full flex items-center gap-3 px-4 mb-3" style={{ height: 56 }} onClick={() => { setSheet(false); setUploading(true); }}>
            <Icon size={18} color={C.dustyRose} strokeWidth={1.5} />
            <span className="hl-sans" style={{ fontSize: 15, color: C.warmCream }}>{l}</span>
          </button>
        ))}
        <div className="text-center mt-2"><TextAction onClick={() => setSheet(false)}>Not now</TextAction></div>
      </Sheet>
    </div>
  );
}

/* ───────── Linking ───────── */
function LinkPair({ right, mode }: { right: 'placeholder' | 'partner'; mode: 'idle' | 'travel' }) {
  return (
    <div className="flex items-center justify-center relative" style={{ gap: 40 }}>
      <Avatar initial="E" size={96} ring="rose" />
      <div className="absolute left-1/2 -translate-x-1/2" style={{ width: 96, height: 1, borderTop: `1px dashed ${C.dustyRose}66` }} />
      {mode === 'travel' && (
        <div className="absolute" style={{ left: 'calc(50% - 48px)', width: 96, top: '50%' }}>
          <span className="absolute hl-travel rounded-full" style={{ width: 8, height: 8, top: -4, background: C.dustyRose, boxShadow: '0 0 10px rgba(196,104,122,0.9)' }} />
        </div>
      )}
      {right === 'placeholder' ? (
        <div className="flex items-center justify-center rounded-full hl-heartbeat" style={{ width: 96, height: 96, border: `1.5px dashed ${C.dustyRose}80`, background: 'rgba(45,27,61,0.5)' }}>
          <span className="hl-display-reg" style={{ fontSize: 40, color: C.dustyRose }}>?</span>
        </div>
      ) : (
        <Avatar initial="M" size={96} ring="rose" color={C.lavender} color2={C.dustyRose} />
      )}
    </div>
  );
}

const glow = 'radial-gradient(300px 300px at 50% 40%, rgba(139,26,74,0.22), transparent 70%)';

export function LinkCreate({ onShare, onBack }: { onShare: () => void; onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: glow }}>
      <div className="px-3 pt-4"><BackBtn onClick={onBack} /></div>
      <div className="flex-1 flex flex-col px-5 hl-fade-up">
        <div className="mt-6"><LinkPair right="placeholder" mode="idle" /></div>
        <h2 className="hl-display text-center mt-8" style={{ fontSize: 32, color: C.warmCream }}>Create your space</h2>
        <p className="hl-sans text-center mt-2 mx-auto" style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6, maxWidth: 280 }}>Share this code with your partner. Once they join, your space opens.</p>
        <div className="hl-glass mt-6 flex flex-col items-center justify-center hl-pulse-glow" style={{ minHeight: 100, padding: '14px 0' }}>
          <span className="hl-sans" style={{ fontSize: 36, fontWeight: 600, letterSpacing: 10, color: C.warmCream, paddingLeft: 10 }}>MX4K7R</span>
          <span className="hl-sans mt-1" style={{ fontSize: 12, color: C.textSecondary }}>Expires in 72 hours</span>
        </div>
        <div className="mt-auto pb-6">
          <button className="hl-primary-btn w-full flex items-center justify-center gap-2" onClick={onShare}><Share2 size={18} strokeWidth={1.5} /> Share Code</button>
          <button className="hl-secondary-btn w-full mt-3 flex items-center justify-center gap-2" onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1800); }}>
            {copied ? <><Check size={16} /> Link copied</> : <><Copy size={16} strokeWidth={1.5} /> Copy Link</>}
          </button>
        </div>
      </div>
    </div>
  );
}

export function LinkWaiting({ onLinked, onAgain, auto = true }: { onLinked: () => void; onAgain: () => void; auto?: boolean }) {
  useEffect(() => {
    if (!auto) return;
    const t = setTimeout(onLinked, 5000);
    return () => clearTimeout(t);
  }, [auto, onLinked]);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6" style={{ background: glow }}>
      <LinkPair right="partner" mode="travel" />
      <h2 className="hl-display-reg text-center mt-10" style={{ fontSize: 28, color: C.warmCream }}>Waiting for your person...</h2>
      <div className="mt-6"><PulseDots /></div>
      <TextAction className="mt-10" onClick={onAgain}>Share the code again</TextAction>
    </div>
  );
}

export function Linked({ partnerName = 'Mira', onDone }: { partnerName?: string; onDone: () => void }) {
  const [together, setTogether] = useState(false);
  const [cta, setCta] = useState(false);
  useEffect(() => {
    const a = setTimeout(() => setTogether(true), 500);
    const b = setTimeout(() => setCta(true), 1200);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  const left = partnerName === 'Elena' ? 'M' : 'E';
  const right = partnerName === 'Elena' ? 'E' : 'M';
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center overflow-hidden" style={{ background: glow }}>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: `${C.dustyRose}33` }} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
      {together && <Confetti count={20} />}
      <div className="relative flex items-center justify-center" style={{ width: 200, height: 100 }}>
        <motion.div className="absolute" animate={{ x: together ? 28 : -10 }} transition={{ duration: 0.9, ease: [0, 0, 0.2, 1] }} style={{ left: 8 }}>
          <Avatar initial={left} size={84} ring="rose" color={left === 'M' ? C.lavender : C.velvetCrimson} color2={C.dustyRose} />
        </motion.div>
        <motion.div className="absolute" animate={{ x: together ? -28 : 10 }} transition={{ duration: 0.9, ease: [0, 0, 0.2, 1] }} style={{ right: 8 }}>
          <Avatar initial={right} size={84} ring="rose" color={right === 'M' ? C.lavender : C.velvetCrimson} color2={C.dustyRose} />
        </motion.div>
        <motion.span className="absolute rounded-full" style={{ width: 60, height: 60, background: `${C.blush}59`, filter: 'blur(18px)' }} animate={{ scale: together ? [0.8, 1.4, 1] : 0.8, opacity: together ? [0, 1, 0.7] : 0 }} transition={{ duration: 1.2, delay: 0.6 }} />
      </div>
      <svg width="64" height="28" viewBox="0 0 64 28" fill="none" className="mt-4">
        <motion.path d="M32 14 C26 4 12 4 12 14 C12 24 26 24 32 14 C38 4 52 4 52 14 C52 24 38 24 32 14 Z" stroke={C.dustyRose} strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: together ? 1 : 0 }} transition={{ duration: 0.8, delay: 0.9, ease: [0.45, 0.05, 0.55, 0.95] }} />
      </svg>
      <h2 className="hl-display mt-6 hl-fade-up" style={{ fontSize: 42, color: C.warmCream, lineHeight: 1.1, animationDelay: '600ms' }}>You're together 💛</h2>
      <p className="hl-sans mt-3 hl-fade-up" style={{ fontSize: 16, color: C.textSecondary, animationDelay: '900ms' }}>{partnerName} is now in your space.</p>
      <div className="absolute left-6 right-6 bottom-8" style={{ opacity: cta ? 1 : 0, transition: 'opacity 700ms cubic-bezier(0,0,0.2,1)', pointerEvents: cta ? 'auto' : 'none' }}>
        <button className="hl-primary-btn w-full" onClick={onDone}>Open your space</button>
      </div>
    </div>
  );
}

export function JoinWithCode({ onJoin, onBack }: { onJoin: () => void; onBack: () => void }) {
  const [code, setCode] = useState('MX4K7R');
  const ok = code.length === 6;
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: glow }}>
      <div className="px-3 pt-4"><BackBtn onClick={onBack} /></div>
      <div className="flex-1 flex flex-col px-5 hl-fade-up">
        <div className="mt-6 flex justify-center"><LinkPair right="placeholder" mode="idle" /></div>
        <h2 className="hl-display text-center mt-8" style={{ fontSize: 32, color: C.warmCream }}>Join your person</h2>
        <p className="hl-sans text-center mt-2 mx-auto" style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6, maxWidth: 280 }}>Elena invited you. Enter the 6-character code from your link.</p>
        <div className="mt-6">
          <input className="hl-input text-center" aria-label="Invite code" value={code} maxLength={6} onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))} style={{ height: 80, fontSize: 32, fontWeight: 600, letterSpacing: 10, paddingLeft: 26, color: C.warmCream, borderRadius: 24 }} />
          <p className="hl-sans flex items-center justify-center gap-2 mt-3" style={{ fontSize: 12, color: C.textSecondary }}>
            <Link2 size={14} color={C.dustyRose} strokeWidth={1.5} /> Filled in from your invite link
          </p>
        </div>
        <div className="mt-auto pb-6">
          <button className="hl-primary-btn w-full" disabled={!ok} style={{ opacity: ok ? 1 : 0.4 }} onClick={onJoin}>Join Elena's space</button>
        </div>
      </div>
    </div>
  );
}

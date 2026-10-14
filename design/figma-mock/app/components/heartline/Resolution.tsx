import { useState } from 'react';
import { useEffect } from 'react';
import { ChevronLeft, Send, Sparkles, Wind } from 'lucide-react';
import { C, feelings } from './tokens';
import { Chip, PulseDots } from './Shared';
import { HeartItem } from './HeartCard';
import { Ring, TextAction } from './ui';
import { WeGoodBanner, WeGoodSheet } from './WeGood';

interface Msg { id: string; from: 'me' | 'them'; text: string; }

export type WgState = 'none' | 'waiting' | 'incoming';
export type CoolState = 'off' | 'on' | 'done';

interface ResolutionProps {
  heart: HeartItem;
  onBack: () => void;
  onWeGood: () => void;
  onPending?: (id: string) => void;
  viewer?: 'E' | 'M';
  initialWg?: WgState;
  initialCool?: CoolState;
  fixed?: boolean;
  initialSheet?: boolean;
}

const COOL_SECONDS = 30 * 60;
const fmt = (n: number) => `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`;

export function Resolution({ heart, onBack, onWeGood, onPending, viewer = 'E', initialWg, initialCool = 'off', fixed, initialSheet = false }: ResolutionProps) {
  const partner = viewer === 'E' ? 'Mira' : 'Elena';
  const author = heart.by === viewer ? 'You' : partner;
  const [wg, setWg] = useState<WgState>(initialWg ?? (heart.status === 'pending-good' ? 'waiting' : 'none'));
  const [sheet, setSheet] = useState(initialSheet);
  const [bannerHidden, setBannerHidden] = useState(false);
  const [cool, setCool] = useState<CoolState>(initialCool);
  const [coolUsed, setCoolUsed] = useState(initialCool !== 'off');
  const [left, setLeft] = useState(initialCool === 'on' ? COOL_SECONDS - 2 : COOL_SECONDS);

  useEffect(() => {
    if (cool !== 'on') return;
    const t = setInterval(() => setLeft((x) => { if (x <= 1) { setCool('done'); return 0; } return x - 1; }), 1000);
    return () => clearInterval(t);
  }, [cool]);

  useEffect(() => {
    if (wg !== 'waiting' || fixed) return;
    const t = setTimeout(onWeGood, 4500);
    return () => clearTimeout(t);
  }, [wg, fixed, onWeGood]);

  const feeling = feelings.find((f) => f.key === heart.feeling)!;
  const [hugged, setHugged] = useState(heart.status !== 'open');
  const [msgs, setMsgs] = useState<Msg[]>(heart.status === 'in-resolution' || heart.status === 'pending-good' || initialCool !== 'off' || initialWg || initialSheet ? [
    { id: '1', from: 'me', text: "I'm here. Want to tell me what's been on your mind?" },
    { id: '2', from: 'them', text: "Thank you for the hug. It's been a long week at work and I felt invisible last night." },
  ] : []);
  const [text, setText] = useState('');
  const [pressed, setPressed] = useState(false);

  const sendMsg = () => {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { id: String(Date.now()), from: 'me', text }]);
    setText('');
    setTimeout(() => {
      setMsgs((m) => [...m, { id: String(Date.now() + 1), from: 'them', text: 'I hear you. I love you.' }]);
    }, 900);
  };

  return (
    <div className="relative h-full flex flex-col">
      <div className="absolute top-3 left-3 z-10">
        <button
          onClick={onBack}
          className="flex items-center justify-center rounded-full"
          style={{ width: 40, height: 40, background: 'rgba(196,104,122,0.12)' }}
        >
          <ChevronLeft size={20} color={C.dustyRose} />
        </button>
      </div>

      <div className="pt-14 px-4">
        <div className="hl-glass p-4" style={{ borderRadius: 24 }}>
          <div className="flex items-center justify-between mb-2">
            <Chip color={feeling.color}>
              <span>{feeling.emoji}</span>
              <span>{feeling.label}</span>
            </Chip>
            <span className="hl-sans" style={{ fontSize: 11, color: C.textSecondary }}>{heart.time}</span>
          </div>
          <p className="hl-sans" style={{ fontSize: 14, color: C.warmCream, fontWeight: 500 }}>
            {author} {author === 'You' ? 'feel' : 'feels'} {feeling.label.toLowerCase()}
          </p>
          {heart.note && (
            <p className="hl-italic mt-2" style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.5 }}>
              "{heart.note}"
            </p>
          )}
        </div>
        {wg === 'incoming' && !bannerHidden && (
          <WeGoodBanner name={partner === 'Mira' ? 'Mira' : 'Elena'} onYes={onWeGood} onNotYet={() => setBannerHidden(true)} />
        )}
      </div>

      <div className="relative flex-1 min-h-0">
      <div className="h-full overflow-y-auto hl-scroll-hide px-4 pt-4 pb-4" style={{ opacity: cool === 'off' ? 1 : 0.3, transition: 'opacity 800ms cubic-bezier(0.45,0.05,0.55,0.95)' }}>
        {!hugged ? (
          <div className="flex flex-col items-center justify-center h-full py-10">
            <p className="hl-display-reg mb-8" style={{ fontSize: 24, color: C.textSecondary }}>
              Start with a hug.
            </p>

            <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
              <span
                className="absolute rounded-full hl-ripple"
                style={{ width: 110, height: 110, border: `2px solid ${C.dustyRose}`, opacity: 0.3 }}
              />
              <span
                className="absolute rounded-full hl-ripple"
                style={{ width: 110, height: 110, border: `2px solid ${C.dustyRose}`, opacity: 0.2, animationDelay: '600ms' }}
              />
              <button
                className={`hl-heartbeat hl-pulse-glow flex items-center justify-center relative`}
                style={{
                  width: 110, height: 110, borderRadius: 9999,
                  background: `radial-gradient(circle at 40% 30%, ${C.velvetCrimson}, ${C.dustyRose})`,
                  transform: pressed ? 'scale(1.15)' : undefined,
                  transition: 'transform 200ms cubic-bezier(0.34,1.56,0.64,1)',
                }}
                onClick={() => { setPressed(true); setTimeout(() => { setHugged(true); }, 400); }}
              >
                <span style={{ fontSize: 40 }}>🤗</span>
              </button>
            </div>
            <p className="hl-sans mt-6" style={{ fontSize: 14, color: C.dustyRose, fontWeight: 500 }}>
              Send a hug
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="hl-italic text-center" style={{ fontSize: 12, color: C.textSecondary }}>
              You sent a hug · just now
            </p>
            {msgs.length === 0 && (
              <div
                className="hl-glass p-4 flex gap-3 items-start mt-2"
                style={{ borderColor: `${C.lavender}66`, border: `1px solid ${C.lavender}66` }}
              >
                <Sparkles size={16} color={C.lavender} className="mt-0.5" />
                <div>
                  <p className="hl-italic" style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.5 }}>
                    "I hear you. Tell me what happened — I'm not going anywhere."
                  </p>
                  <p className="hl-sans mt-2" style={{ fontSize: 11, color: C.lavender }}>
                    Tap to use this · Dismiss
                  </p>
                </div>
              </div>
            )}
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="hl-sans hl-fade-up"
                  style={{
                    maxWidth: '72%',
                    padding: '12px 16px',
                    fontSize: 15,
                    color: C.warmCream,
                    lineHeight: 1.5,
                    background: m.from === 'me'
                      ? `linear-gradient(135deg, ${C.velvetCrimson}, ${C.dustyRose})`
                      : C.midnightRose,
                    border: m.from === 'them' ? '1px solid rgba(196,104,122,0.15)' : 'none',
                    borderRadius: m.from === 'me' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {cool !== 'off' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 hl-fade-up" style={{ background: 'rgba(26,10,46,0.55)' }}>
          {cool === 'on' ? (
            <>
              <Ring progress={left / COOL_SECONDS} size={200}>
                <p className="hl-display-reg" style={{ fontSize: 52, color: C.warmCream, lineHeight: 1 }}>{fmt(left)}</p>
                <p className="hl-italic mt-1" style={{ fontSize: 13, color: C.lavender }}>taking a little space</p>
              </Ring>
              <div className="hl-glass p-4 mt-6 flex gap-3 items-start" style={{ border: `1px solid ${C.lavender}66` }}>
                <Wind size={18} color={C.lavender} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
                <p className="hl-italic" style={{ fontSize: 16, color: C.textPrimary, lineHeight: 1.5 }}>
                  Breathe in for four, out for six. You're not walking away. You're coming back softer.
                </p>
              </div>
              <p className="hl-sans text-center mt-4" style={{ fontSize: 12, color: C.textSecondary }}>
                {partner} knows you're taking a moment. A cool-down can be used once per Heart.
              </p>
              <TextAction className="mt-3" onClick={() => setCool('done')}>I'm ready sooner</TextAction>
            </>
          ) : (
            <div className="hl-glass p-6 text-center hl-pop" style={{ border: `1px solid ${C.lavender}66` }}>
              <Wind size={28} color={C.lavender} strokeWidth={1.5} className="mx-auto" />
              <h3 className="hl-display-reg mt-3" style={{ fontSize: 28, color: C.warmCream }}>Ready to continue?</h3>
              <p className="hl-sans mt-2 mb-5" style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6 }}>Take one more breath. {partner} is here whenever you are.</p>
              <button className="hl-primary-btn w-full" onClick={() => setCool('off')}>Yes, I'm ready</button>
            </div>
          )}
        </div>
      )}
      </div>

      {hugged && (
        <div className="px-4 pb-6 pt-2">
          {cool === 'off' && (
            <div className="mb-3">
              {wg === 'waiting' ? (
                <div className="hl-glass flex items-center justify-center gap-3" style={{ height: 48, borderRadius: 9999, border: `1px solid ${C.sage}66` }}>
                  <PulseDots color={C.sage} />
                  <span className="hl-sans" style={{ fontSize: 14, color: C.textSecondary }}>Waiting for {partner} to say it back...</span>
                </div>
              ) : wg === 'incoming' && !bannerHidden ? null : (
                <button className="hl-secondary-btn w-full" style={{ borderColor: C.sage, color: C.sage }} onClick={() => (wg === 'incoming' ? setBannerHidden(false) : setSheet(true))}>
                  {wg === 'incoming' ? `${partner} said We're Good 💚` : "💚 We're Good"}
                </button>
              )}
              <div className="flex flex-col items-center mt-3">
                {!coolUsed ? (
                  <>
                    <TextAction onClick={() => { setCool('on'); setCoolUsed(true); setLeft(COOL_SECONDS); }}>I need 30 minutes</TextAction>
                    <span className="hl-sans mt-1" style={{ fontSize: 11, color: C.textMuted }}>Can be used once per Heart</span>
                  </>
                ) : (
                  <span className="hl-sans" style={{ fontSize: 11, color: C.textMuted }}>Cool-down used for this Heart</span>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2" style={{ opacity: cool === 'off' ? 1 : 0.4, pointerEvents: cool === 'off' ? 'auto' : 'none' }}>
            <input
              className="hl-input flex-1"
              style={{ height: 48, borderRadius: 9999 }}
              placeholder="Say something softly..."
              disabled={cool !== 'off'}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMsg()}
            />
            <button
              onClick={sendMsg}
              className="flex items-center justify-center rounded-full"
              style={{
                width: 48, height: 48,
                background: `linear-gradient(135deg, ${C.velvetCrimson}, ${C.dustyRose})`,
                boxShadow: '0 6px 16px rgba(139,26,74,0.4)',
              }}
            >
              <Send size={18} color={C.warmCream} />
            </button>
          </div>
        </div>
      )}
      <WeGoodSheet
        open={sheet}
        onClose={() => setSheet(false)}
        onYes={() => { setSheet(false); setWg('waiting'); onPending?.(heart.id); }}
      />
    </div>
  );
}

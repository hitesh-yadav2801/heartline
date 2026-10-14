import { useState } from 'react';
import { Crown, Archive, Sparkles, Calendar, Mail, Activity, Check, FileText } from 'lucide-react';
import { C } from './tokens';
import { Screen, Sheet, TextAction, Toggle } from './ui';

const benefits = [
  { Icon: Archive, c: C.emberGold, t: 'Unlimited Memory Jar', d: 'Keep every Heart you work through, forever.' },
  { Icon: Sparkles, c: C.lavender, t: 'AI features', d: 'Gentle suggestions when words are hard to find.' },
  { Icon: Calendar, c: C.emberGold, t: 'Us Time Planner', d: 'Ideas, plans and little reminders for both of you.' },
  { Icon: Mail, c: C.lavender, t: 'Appreciation Drops', d: 'Unlimited letters for your Gratitude Wall.' },
  { Icon: Activity, c: C.dustyRose, t: 'Pulse', d: 'A weekly check-in that keeps you close.' },
];

function Price({ usd }: { usd: boolean }) {
  return (
    <div className="hl-glass p-5 text-center" style={{ borderColor: `${C.emberGold}59` }}>
      <p className="hl-display" style={{ fontSize: 34, color: C.warmCream, lineHeight: 1.1 }}>{usd ? '$2.99' : '₹199'}<span className="hl-sans" style={{ fontSize: 14, fontWeight: 400, color: C.textSecondary, fontStyle: 'normal' }}> /month per couple</span></p>
      <p className="hl-sans mt-1" style={{ fontSize: 12, color: C.textSecondary }}>One plan covers both of you. Cancel anytime.</p>
    </div>
  );
}

export function PaywallBody({ compact, plus, context, onSubscribe, onNotNow }: { compact?: boolean; plus: boolean; context?: string; onSubscribe: () => void; onNotNow: () => void }) {
  const [usd, setUsd] = useState(false);
  const list = compact ? benefits.slice(0, 3) : benefits;
  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <span className="flex items-center justify-center rounded-full hl-float" style={{ width: compact ? 52 : 72, height: compact ? 52 : 72, background: `${C.emberGold}1A`, border: `1px solid ${C.emberGold}`, boxShadow: '0 0 28px rgba(200,134,58,0.4)' }}>
          <Crown size={compact ? 24 : 32} color={C.emberGold} strokeWidth={1.5} />
        </span>
        <h2 className="hl-display mt-4" style={{ fontSize: compact ? 28 : 34, color: C.warmCream, lineHeight: 1.15 }}>Heartline Plus</h2>
        <p className="hl-italic mt-1 mb-5" style={{ fontSize: 15, color: C.textSecondary, maxWidth: 270 }}>{context ?? 'More room for the two of you.'}</p>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        {list.map(({ Icon, c, t, d }) => (
          <div key={t} className="flex items-center gap-3">
            <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 40, height: 40, background: `${c}1A`, border: `1px solid ${c}40` }}><Icon size={18} color={c} strokeWidth={1.5} /></span>
            <div className="flex-1">
              <p className="hl-sans" style={{ fontSize: 14, fontWeight: 500, color: C.warmCream }}>{t}</p>
              <p className="hl-sans" style={{ fontSize: 12, color: C.textSecondary }}>{d}</p>
            </div>
            <Check size={16} color={C.sage} />
          </div>
        ))}
      </div>
      <Price usd={usd} />
      <div className="flex justify-center mt-3 mb-5">
        <TextAction onClick={() => setUsd(!usd)}>{usd ? 'Show price in rupees' : 'Show price in dollars'}</TextAction>
      </div>
      {plus ? (
        <div className="hl-glass p-4 text-center" style={{ border: `1px solid ${C.sage}66` }}>
          <p className="hl-display-reg" style={{ fontSize: 20, color: C.sage }}>You're on Plus 💚</p>
          <p className="hl-sans mt-1" style={{ fontSize: 12, color: C.textSecondary }}>Thank you for keeping this space going.</p>
        </div>
      ) : (
        <>
          <button className="hl-primary-btn w-full" onClick={onSubscribe}>Start Heartline Plus</button>
          <div className="text-center mt-4"><TextAction onClick={onNotNow}>Not now</TextAction></div>
          <p className="hl-sans text-center mt-3" style={{ fontSize: 11, color: C.textMuted }}>No surprises. You can stop whenever you like.</p>
        </>
      )}
    </div>
  );
}

export function PaywallScreen({ onBack, plus, onSubscribe }: { onBack: () => void; plus: boolean; onSubscribe: () => void }) {
  return (
    <Screen onBack={onBack}>
      <PaywallBody plus={plus} onSubscribe={onSubscribe} onNotNow={onBack} />
    </Screen>
  );
}

export function PaywallSheet({ open, onClose, plus, onSubscribe }: { open: boolean; onClose: () => void; plus: boolean; onSubscribe: () => void }) {
  return (
    <Sheet open={open} onClose={onClose}>
      <PaywallBody compact plus={plus} context="Keep your Memory Jar as a keepsake you can hold onto." onSubscribe={onSubscribe} onNotNow={onClose} />
    </Sheet>
  );
}

export function ExportSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msgs, setMsgs] = useState(true);
  const [photos, setPhotos] = useState(true);
  const [made, setMade] = useState(false);
  return (
    <Sheet open={open} onClose={() => { setMade(false); onClose(); }}>
      <div className="flex flex-col items-center text-center">
        <span className="flex items-center justify-center rounded-full" style={{ width: 56, height: 56, background: `${C.emberGold}1A`, border: `1px solid ${C.emberGold}59` }}><FileText size={24} color={C.emberGold} strokeWidth={1.5} /></span>
        <h3 className="hl-display-reg mt-4" style={{ fontSize: 26, color: C.warmCream }}>{made ? 'Your keepsake is ready' : 'Export your Memory Jar'}</h3>
        <p className="hl-sans mt-2 mb-5" style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6 }}>{made ? '4 hearts, beautifully laid out as a PDF.' : 'A private keepsake of every Heart you worked through together.'}</p>
      </div>
      {!made && (
        <>
          {[{ l: 'Include your messages', v: msgs, s: setMsgs }, { l: 'Include photos', v: photos, s: setPhotos }].map((r) => (
            <div key={r.l} className="flex items-center justify-between mb-4"><span className="hl-sans" style={{ fontSize: 15, color: C.warmCream }}>{r.l}</span><Toggle on={r.v} onChange={r.s} /></div>
          ))}
          <button className="hl-primary-btn w-full mt-2" onClick={() => setMade(true)}>Make my PDF</button>
        </>
      )}
      {made && <button className="hl-primary-btn w-full" onClick={() => { setMade(false); onClose(); }}>Save to your phone</button>}
    </Sheet>
  );
}

import { useState } from 'react';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { C, feelings } from './tokens';
import { Chip } from './Shared';

type Feeling = typeof feelings[number]['key'];

export function HeartFlow({ onBack, onSent }: { onBack: () => void; onSent: (feeling: Feeling, note: string) => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<Feeling | null>(null);
  const [note, setNote] = useState('');

  const current = feelings.find((f) => f.key === selected);

  return (
    <div className="relative h-full pt-14 pb-10 px-5 hl-fade-up overflow-y-auto hl-scroll-hide">
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <button
          onClick={() => (step === 1 ? onBack() : setStep((s) => (s - 1) as 1 | 2))}
          className="flex items-center justify-center rounded-full"
          style={{ width: 40, height: 40, background: 'rgba(196,104,122,0.12)' }}
        >
          <ChevronLeft size={20} color={C.dustyRose} />
        </button>
        <span className="hl-sans" style={{ fontSize: 14, color: C.textPrimary, fontWeight: 500 }}>Open a Heart</span>
        <span className="hl-sans" style={{ fontSize: 12, color: C.textSecondary, width: 40, textAlign: 'right' }}>{step} of 2</span>
      </div>

      {step === 1 && (
        <>
          <h2 className="hl-display-reg text-center mt-4" style={{ fontSize: 28, color: C.warmCream, lineHeight: 1.2 }}>
            What are you feeling<br />right now?
          </h2>
          <p className="hl-sans text-center mt-2 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>
            Choose the one that fits most.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {feelings.map((f) => {
              const active = selected === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setSelected(f.key)}
                  className="relative text-left p-3 pl-4 overflow-hidden"
                  style={{
                    height: 96,
                    borderRadius: 24,
                    background: active ? `${f.color}1A` : C.midnightRose,
                    border: `1.5px solid ${active ? f.color : 'rgba(196,104,122,0.10)'}`,
                    transition: 'transform 200ms cubic-bezier(0.34,1.56,0.64,1), border-color 200ms, background 200ms',
                    transform: active ? 'scale(1.02)' : 'scale(1)',
                  }}
                >
                  <span
                    className="absolute left-0 top-2 bottom-2"
                    style={{ width: active ? 10 : 6, background: f.color, borderRadius: 4, transition: 'width 200ms' }}
                  />
                  <div className="flex items-center gap-2 mb-1 pl-2">
                    <span style={{ fontSize: 22 }}>{f.emoji}</span>
                    <span className="hl-sans" style={{ fontSize: 14, color: C.warmCream, fontWeight: 500 }}>{f.label}</span>
                  </div>
                  <p className="hl-italic pl-2" style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.4 }}>
                    {f.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {selected && (
            <div className="mt-8 hl-fade-up">
              <button className="hl-primary-btn w-full" onClick={() => setStep(2)}>
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {step === 2 && current && (
        <>
          <div className="flex justify-center mt-4 mb-4">
            <Chip color={current.color}>
              <span>{current.emoji}</span>
              <span>{current.label}</span>
            </Chip>
          </div>
          <h2 className="hl-display-reg text-center" style={{ fontSize: 28, color: C.warmCream, lineHeight: 1.2 }}>
            Want to say anything?
          </h2>
          <p className="hl-italic text-center mt-2 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>
            Optional. Even just one sentence helps.
          </p>

          <textarea
            className="hl-input"
            placeholder="I've been feeling this when..."
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 500))}
            style={{ minHeight: 140 }}
          />
          <div className="flex items-center justify-between mt-2">
            <button
              className="hl-chip"
              style={{ background: `${C.lavender}1A`, border: `1px solid ${C.lavender}66`, color: C.lavender }}
            >
              <Sparkles size={12} />
              Help me put it into words
            </button>
            <span className="hl-sans" style={{ fontSize: 11, color: C.textSecondary }}>
              {note.length}/500
            </span>
          </div>

          <div className="mt-8">
            <button className="hl-primary-btn w-full" onClick={() => onSent(selected!, note)}>
              Send to Mira
            </button>
            <p className="hl-italic text-center mt-3" style={{ fontSize: 12, color: C.textSecondary }}>
              They'll receive a gentle notification.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

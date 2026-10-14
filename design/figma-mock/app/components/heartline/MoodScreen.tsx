import { useState } from 'react';
import { C, moods } from './tokens';
import { TextAction } from './ui';

export function MoodScreen({ onCalendar }: { onCalendar: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  if (sent) {
    const m = moods.find((x) => x.key === selected)!;
    return (
      <div className="flex flex-col items-center justify-center pt-24 pb-32 px-6 hl-fade-up text-center">
        <div className="hl-pop relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
          <span
            className="absolute rounded-full"
            style={{ width: 140, height: 140, background: `${m.color}33`, filter: 'blur(20px)' }}
          />
          <span style={{ fontSize: 72 }}>{m.emoji}</span>
        </div>
        <h2 className="hl-display mt-6" style={{ fontSize: 28, color: C.warmCream }}>
          You checked in today 💛
        </h2>
        <p className="hl-sans mt-3" style={{ fontSize: 14, color: C.textSecondary }}>
          Mira can see how you're feeling.
        </p>
        <TextAction className="mt-8" onClick={onCalendar}>See your mood calendar</TextAction>
      </div>
    );
  }

  return (
    <div className="pt-14 pb-32 px-5 hl-fade-up">
      <h2 className="hl-display-reg text-center" style={{ fontSize: 30, color: C.warmCream }}>
        How are you feeling?
      </h2>
      <p className="hl-sans text-center mt-2" style={{ fontSize: 13, color: C.textSecondary }}>
        Once a day · Mira will see this
      </p>

      <div className="grid grid-cols-2 gap-3 mt-8">
        {moods.map((m, i) => {
          const active = selected === m.key;
          const isLast = i === moods.length - 1;
          return (
            <button
              key={m.key}
              onClick={() => setSelected(m.key)}
              className={`relative ${isLast ? 'col-span-2 mx-auto w-[calc(50%-6px)]' : ''}`}
              style={{
                height: 96,
                borderRadius: 24,
                background: active ? `${m.color}1A` : C.midnightRose,
                border: `1.5px solid ${active ? m.color : 'rgba(196,104,122,0.1)'}`,
                transition: 'transform 250ms cubic-bezier(0.34,1.56,0.64,1), background 200ms, border-color 200ms',
                transform: active ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              {active && (
                <span
                  className="absolute rounded-full pointer-events-none"
                  style={{ inset: '12px 30% auto 30%', height: 48, background: `${m.color}40`, filter: 'blur(16px)' }}
                />
              )}
              <div className="relative flex flex-col items-center justify-center">
                <span style={{ fontSize: active ? 42 : 34, transition: 'font-size 200ms' }}>{m.emoji}</span>
                <span className="hl-sans mt-1" style={{ fontSize: 13, color: C.warmCream, fontWeight: 500 }}>{m.label}</span>
                <span className="hl-italic" style={{ fontSize: 10, color: C.textSecondary, marginTop: 2 }}>{m.desc}</span>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-6 hl-fade-up">
          <textarea
            className="hl-input"
            placeholder="Anything you want Mira to know?"
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 200))}
            style={{ minHeight: 80 }}
          />
          <button className="hl-primary-btn w-full mt-5" onClick={() => setSent(true)}>
            Share with Mira
          </button>
        </div>
      )}
      {!selected && <div className="text-center mt-10"><TextAction onClick={onCalendar}>See your mood calendar</TextAction></div>}
    </div>
  );
}

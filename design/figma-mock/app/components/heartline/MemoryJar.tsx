import { useState } from 'react';
import { C, feelings } from './tokens';
import { HeartCard, HeartItem } from './HeartCard';
import { Jar, TextAction } from './ui';
import { FileText } from 'lucide-react';

export function MemoryJar({ hearts, onOpen, onExport, plus }: { hearts: HeartItem[]; onOpen: (id: string) => void; onExport: () => void; plus: boolean }) {
  const resolved = hearts.filter((h) => h.status === 'resolved');
  const [filter, setFilter] = useState<string>('all');
  const list = filter === 'all' ? resolved : resolved.filter((h) => h.feeling === filter);

  return (
    <div className="pt-14 pb-32 px-4 hl-fade-up">
      <div className="flex flex-col items-center mb-6">
        <div className="relative hl-float mb-3">
          <div
            className="flex items-end justify-center relative"
            style={{
              width: 56, height: 70, borderRadius: '18px 18px 28px 28px',
              border: `1.5px solid ${C.emberGold}`,
              background: `linear-gradient(180deg, rgba(200,134,58,0.1), rgba(200,134,58,0.2))`,
              boxShadow: `0 0 24px rgba(200,134,58,0.35)`,
            }}
          >
            <span
              className="absolute -top-[6px] left-1/2 -translate-x-1/2"
              style={{ width: 36, height: 8, background: C.emberGold, borderRadius: 3, opacity: 0.8 }}
            />
            <div className="flex gap-1 pb-3">
              <span className="block rounded-full" style={{ width: 6, height: 6, background: C.dustyRose, boxShadow: `0 0 6px ${C.dustyRose}` }} />
              <span className="block rounded-full" style={{ width: 6, height: 6, background: C.emberGold, boxShadow: `0 0 6px ${C.emberGold}` }} />
              <span className="block rounded-full" style={{ width: 6, height: 6, background: C.sage, boxShadow: `0 0 6px ${C.sage}` }} />
            </div>
          </div>
        </div>
        <h2 className="hl-display" style={{ fontSize: 34, color: C.warmCream }}>Memory Jar</h2>
        <p className="hl-italic mt-1" style={{ fontSize: 13, color: C.textSecondary }}>
          {resolved.length} hearts you've worked through together
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto hl-scroll-hide mb-5 px-1">
        <FilterChip active={filter === 'all'} color={C.dustyRose} onClick={() => setFilter('all')}>All</FilterChip>
        {feelings.map((f) => (
          <FilterChip key={f.key} active={filter === f.key} color={f.color} onClick={() => setFilter(f.key)}>
            {f.emoji} {f.label}
          </FilterChip>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="text-center mt-8 px-8 hl-fade-up">
          <div className="flex justify-center mb-5"><Jar scale={1.15} opacity={0.6} /></div>
          <p className="hl-display-reg" style={{ fontSize: 24, color: C.warmCream }}>Your jar is waiting.</p>
          <p className="hl-sans mt-2" style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6 }}>
            Every heart you work through together will live here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-1">
          {list.map((h, i) => (
            <div key={h.id} className="hl-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <HeartCard item={h} onClick={() => onOpen(h.id)} />
            </div>
          ))}
        </div>
      )}
      {resolved.length > 0 && (
        <div className="flex justify-center mt-6">
          <button onClick={onExport} className="flex items-center gap-2 hl-sans" style={{ fontSize: 13, color: C.emberGold }}>
            <FileText size={16} strokeWidth={1.5} /> <span style={{ textDecoration: 'underline' }}>Export as PDF</span>{!plus && <span className="hl-chip" style={{ height: 20, padding: '0 8px', fontSize: 10, background: `${C.emberGold}26`, border: `1px solid ${C.emberGold}66`, color: C.emberGold }}>Plus</span>}
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({ active, color, onClick, children }: { active: boolean; color: string; onClick: () => void; children: any }) {
  return (
    <button
      onClick={onClick}
      className="hl-chip flex-shrink-0"
      style={{
        height: 32,
        background: active ? `${color}33` : 'transparent',
        border: `1px solid ${active ? color : 'rgba(196,104,122,0.25)'}`,
        color: active ? color : C.textSecondary,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  );
}

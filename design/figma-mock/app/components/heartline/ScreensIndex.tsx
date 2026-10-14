import { ChevronRight } from 'lucide-react';
import { C } from './tokens';
import { Screen } from './ui';

export interface IndexGroup { title: string; items: { label: string; note?: string; run: () => void }[] }

export function ScreensIndex({ groups, onBack }: { groups: IndexGroup[]; onBack: () => void }) {
  return (
    <Screen onBack={onBack}>
      <h2 className="hl-display" style={{ fontSize: 32, color: C.warmCream }}>Screens</h2>
      <p className="hl-italic mt-1 mb-6" style={{ fontSize: 14, color: C.textSecondary }}>Every screen and state, for review.</p>
      {groups.map((g) => (
        <div key={g.title} className="mb-6">
          <p className="hl-micro mb-2 px-1" style={{ color: C.textSecondary }}>{g.title}</p>
          <div className="hl-card overflow-hidden">
            {g.items.map((it, i) => (
              <button key={it.label} onClick={it.run} className="w-full flex items-center gap-3 px-4 py-3 text-left" style={{ borderBottom: i < g.items.length - 1 ? '1px solid rgba(196,104,122,0.08)' : 'none' }}>
                <div className="flex-1">
                  <p className="hl-sans" style={{ fontSize: 14, color: C.warmCream }}>{it.label}</p>
                  {it.note && <p className="hl-sans" style={{ fontSize: 11, color: C.textSecondary, marginTop: 2 }}>{it.note}</p>}
                </div>
                <ChevronRight size={16} color={C.textSecondary} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </Screen>
  );
}

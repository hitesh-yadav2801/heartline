import { Calendar, Plus, Sparkles, ListChecks, Flag, ChevronRight } from 'lucide-react';
import { C } from './tokens';
import { EmptyState } from './ui';

export interface Plan { id: string; emoji: string; title: string; date: string; by: string; past?: boolean; desc?: string; location?: string }

export const initialPlans: Plan[] = [
  { id: 'p1', emoji: '🍷', title: 'Wine & slow dinner', date: 'Sat · 8pm', by: 'Mira' },
  { id: 'p2', emoji: '🚶', title: 'Evening walk by the river', date: 'Sun · 6pm', by: 'You' },
  { id: 'p3', emoji: '🎬', title: 'Watch that film again', date: 'Next Fri', by: 'Mira' },
  { id: 'p0', emoji: '🥐', title: 'Slow Sunday brunch', date: 'Last Sun · 11am', by: 'You', past: true },
];

interface Props {
  plans: Plan[];
  onCreate: () => void;
  onIdeas: () => void;
  onReflect: (id: string) => void;
  onBucket: () => void;
  onMilestones: () => void;
}

export function UsTime({ plans, onCreate, onIdeas, onReflect, onBucket, onMilestones }: Props) {
  const upcoming = plans.filter((p) => !p.past);
  const past = plans.filter((p) => p.past);
  return (
    <div className="pt-14 pb-32 px-5 hl-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="flex items-center justify-center rounded-full"
          style={{ width: 56, height: 56, background: `${C.emberGold}1A`, border: `1px solid ${C.emberGold}40` }}
        >
          <Calendar size={22} color={C.emberGold} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="hl-display" style={{ fontSize: 28, color: C.warmCream, lineHeight: 1.1 }}>Us Time</h2>
          <p className="hl-italic" style={{ fontSize: 13, color: C.textSecondary, marginTop: 2 }}>
            Moments you're planning together
          </p>
        </div>
      </div>

      {upcoming.length === 0 ? (
        <EmptyState
          icon={<Calendar size={48} color={C.emberGold} strokeWidth={1.5} style={{ opacity: 0.6 }} />}
          title="Nothing planned."
          body="What do you two want to do?"
        />
      ) : (
        <div className="flex flex-col gap-3 mb-6">
          {upcoming.map((p) => (
            <div key={p.id} className="hl-card p-4 flex items-center gap-3 hl-fade-up" style={{ borderLeft: `4px solid ${C.emberGold}` }}>
              <span style={{ fontSize: 28 }}>{p.emoji}</span>
              <div className="flex-1">
                <p className="hl-sans" style={{ fontSize: 15, color: C.warmCream, fontWeight: 500 }}>{p.title}</p>
                <p className="hl-sans mt-1" style={{ fontSize: 12, color: C.textSecondary }}>
                  {p.date} · suggested by {p.by}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {past.map((p) => (
        <button key={p.id} onClick={() => onReflect(p.id)} className="hl-glass w-full flex items-center gap-3 p-4 mb-6 text-left" style={{ borderColor: `${C.emberGold}40` }}>
          <span style={{ fontSize: 24 }}>{p.emoji}</span>
          <div className="flex-1">
            <p className="hl-sans" style={{ fontSize: 14, color: C.warmCream, fontWeight: 500 }}>How was {p.title.toLowerCase()}?</p>
            <p className="hl-italic mt-0.5" style={{ fontSize: 12, color: C.emberGold }}>Tell Mira how it felt</p>
          </div>
          <ChevronRight size={16} color={C.textSecondary} />
        </button>
      ))}

      <button className="hl-primary-btn w-full flex items-center justify-center gap-2" onClick={onCreate}>
        <Plus size={18} /> Plan something together
      </button>
      <p className="hl-italic text-center mt-3" style={{ fontSize: 12, color: C.textSecondary }}>
        What do you two want to do?
      </p>
      <button className="hl-secondary-btn w-full mt-4 flex items-center justify-center gap-2" style={{ borderColor: C.lavender, color: C.lavender }} onClick={onIdeas}>
        <Sparkles size={16} strokeWidth={1.5} /> Get Ideas
      </button>

      <div className="grid grid-cols-2 gap-3 mt-6">
        {[{ l: 'Bucket list', s: '3 dreams so far', Icon: ListChecks, on: onBucket }, { l: 'Milestones', s: 'First linked, and on', Icon: Flag, on: onMilestones }].map(({ l, s, Icon, on }) => (
          <button key={l} onClick={on} className="hl-card p-4 text-left" style={{ borderRadius: 24 }}>
            <span className="flex items-center justify-center rounded-full mb-3" style={{ width: 40, height: 40, background: `${C.emberGold}1A`, border: `1px solid ${C.emberGold}40` }}>
              <Icon size={18} color={C.emberGold} strokeWidth={1.5} />
            </span>
            <p className="hl-sans" style={{ fontSize: 14, color: C.warmCream, fontWeight: 500 }}>{l}</p>
            <p className="hl-italic mt-0.5" style={{ fontSize: 12, color: C.textSecondary }}>{s}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

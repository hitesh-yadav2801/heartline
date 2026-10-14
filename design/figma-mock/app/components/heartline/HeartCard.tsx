import { Check, MessageCircle } from 'lucide-react';
import { C, feelings } from './tokens';
import { Avatar, Chip } from './Shared';

export type HeartStatus = 'open' | 'hugged' | 'in-resolution' | 'pending-good' | 'resolved';

export interface HeartItem {
  id: string;
  feeling: typeof feelings[number]['key'];
  note?: string;
  time: string;
  status: HeartStatus;
  by: string;
  messages?: number;
  resolvedDate?: string;
}

export function HeartCard({ item, onClick }: { item: HeartItem; onClick?: () => void }) {
  const feeling = feelings.find((f) => f.key === item.feeling)!;
  const isResolved = item.status === 'resolved';
  const isOpen = item.status === 'open';

  return (
    <button
      onClick={onClick}
      className="w-full relative text-left overflow-hidden"
      style={{
        borderRadius: 24,
        background: C.midnightRose,
        border: `1px solid rgba(196,104,122,0.10)`,
        opacity: isResolved ? 0.9 : 1,
        boxShadow: isOpen ? '0 0 24px rgba(196,104,122,0.25), 0 4px 16px rgba(26,10,46,0.4)' : '0 4px 16px rgba(26,10,46,0.4)',
      }}
    >
      <div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: 6, background: isResolved ? C.sage : feeling.color, borderRadius: '24px 0 0 24px' }}
      />
      <div className="p-4 pl-5">
        <div className="flex items-center justify-between mb-2">
          <Chip color={isResolved ? C.sage : feeling.color}>
            <span>{feeling.emoji}</span>
            <span>{feeling.label}</span>
          </Chip>
          <span className="hl-sans" style={{ fontSize: 11, color: C.textSecondary }}>{item.time}</span>
        </div>
        {item.note && (
          <p className="hl-sans mb-3" style={{ color: C.textPrimary, fontSize: 14, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {item.note}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.status === 'open' && (
              <>
                <span className="block rounded-full hl-heartbeat" style={{ width: 6, height: 6, background: C.dustyRose }} />
                <span className="hl-sans" style={{ fontSize: 11, color: C.textSecondary }}>Waiting for hug</span>
              </>
            )}
            {item.status === 'hugged' && (
              <>
                <Check size={14} color={C.dustyRose} />
                <span className="hl-sans" style={{ fontSize: 11, color: C.dustyRose }}>Hugged</span>
              </>
            )}
            {item.status === 'in-resolution' && (
              <>
                <MessageCircle size={14} color={C.textSecondary} />
                <span className="hl-sans" style={{ fontSize: 11, color: C.textSecondary }}>Talking it through</span>
              </>
            )}
            {item.status === 'pending-good' && (
              <>
                <span className="block rounded-full hl-heartbeat" style={{ width: 6, height: 6, background: C.sage }} />
                <span className="hl-sans" style={{ fontSize: 11, color: C.sage }}>Waiting for Mira's We're Good</span>
              </>
            )}
            {item.status === 'resolved' && (
              <>
                <Check size={14} color={C.sage} />
                <span className="hl-sans" style={{ fontSize: 11, color: C.sage }}>
                  We're Good {item.resolvedDate ? `· ${item.resolvedDate}` : ''}
                </span>
              </>
            )}
          </div>
          <Avatar initial={item.by} size={24} />
        </div>
      </div>
    </button>
  );
}

import { Home, Heart, Smile, Calendar, User } from 'lucide-react';
import { C } from './tokens';

export type Tab = 'home' | 'hearts' | 'mood' | 'us' | 'profile';

const tabs: { key: Tab; label: string; Icon: any }[] = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'hearts', label: 'Hearts', Icon: Heart },
  { key: 'mood', label: 'Mood', Icon: Smile },
  { key: 'us', label: 'Us Time', Icon: Calendar },
  { key: 'profile', label: 'Profile', Icon: User },
];

export function BottomNav({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="absolute bottom-2 left-2 right-2 z-20">
      <div
        className="flex items-center justify-between px-3 py-2 hl-sans"
        style={{
          height: 64,
          borderRadius: 28,
          background: 'rgba(26,10,46,0.85)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderTop: '1px solid rgba(196,104,122,0.12)',
          border: '1px solid rgba(196,104,122,0.12)',
          boxShadow: '0 -8px 32px rgba(26,10,46,0.6)',
        }}
      >
        {tabs.map(({ key, label, Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className="flex-1 flex flex-col items-center justify-center relative py-1"
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2 : 1.5}
                color={isActive ? C.dustyRose : C.textSecondary}
              />
              {isActive && (
                <span
                  className="mt-1"
                  style={{ color: C.dustyRose, fontSize: 11, fontWeight: 500 }}
                >
                  {label}
                </span>
              )}
              {isActive && (
                <span
                  className="absolute"
                  style={{
                    bottom: -2,
                    width: 24,
                    height: 3,
                    borderRadius: 9999,
                    background: C.dustyRose,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

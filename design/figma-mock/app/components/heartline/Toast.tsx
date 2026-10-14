import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { C } from './tokens';
import { Avatar } from './Shared';

export interface ToastData { id: number; title: string; body: string; from?: 'E' | 'M'; action?: () => void }

export function Toast({ toast, onDismiss }: { toast: ToastData | null; onDismiss: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 4500);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);
  return (
    <AnimatePresence>
      {toast && (
        <motion.button
          key={toast.id}
          onClick={() => { toast.action?.(); onDismiss(); }}
          className="hl-glass absolute left-3 right-3 z-[60] flex items-center gap-3 p-3 text-left"
          style={{ top: 12, boxShadow: '0 12px 32px rgba(26,10,46,0.6)' }}
          initial={{ y: -110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -110, opacity: 0 }}
          transition={{ type: 'spring', damping: 24, stiffness: 220 }}
        >
          <Avatar initial={toast.from ?? 'M'} size={40} color={toast.from === 'E' ? C.velvetCrimson : C.lavender} color2={C.dustyRose} />
          <div className="flex-1 min-w-0">
            <p className="hl-sans" style={{ fontSize: 14, fontWeight: 600, color: C.warmCream }}>{toast.title}</p>
            <p className="hl-sans" style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>{toast.body}</p>
          </div>
          <span className="hl-sans" style={{ fontSize: 11, color: C.textSecondary }}>now</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

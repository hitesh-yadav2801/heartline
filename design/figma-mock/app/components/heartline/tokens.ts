export const C = {
  deepPlum: '#1A0A2E',
  midnightRose: '#2D1B3D',
  velvetCrimson: '#8B1A4A',
  dustyRose: '#C4687A',
  blush: '#EBA8B4',
  petal: '#F5D6DC',
  warmCream: '#FDF6F0',
  ivory: '#FAF0E8',
  emberGold: '#C8863A',
  sage: '#7A9E8E',
  lavender: '#9B89C4',
  dawnBlue: '#7BA3C4',
  warmAmber: '#D4943A',
  textPrimary: '#FAF0E8',
  textSecondary: '#C4A8B4',
  textMuted: '#6B4A5A',
};

export const feelings = [
  { key: 'ignored', emoji: '🫥', label: 'Ignored', desc: "Like you weren't heard", color: C.dawnBlue },
  { key: 'overwhelmed', emoji: '😵‍💫', label: 'Overwhelmed', desc: 'Too much at once', color: C.warmAmber },
  { key: 'unheard', emoji: '🗯️', label: 'Unheard', desc: 'Like your words got lost', color: C.lavender },
  { key: 'lonely', emoji: '🌙', label: 'Lonely', desc: "Even when we're together", color: C.dawnBlue },
  { key: 'anxious', emoji: '🌀', label: 'Anxious', desc: 'Something feels off', color: C.warmAmber },
  { key: 'hurt', emoji: '💔', label: 'Hurt', desc: 'Something stung', color: C.dustyRose },
] as const;

export const moods = [
  { key: 'joyful', emoji: '😄', label: 'Joyful', desc: 'Feeling bright and full', color: C.emberGold },
  { key: 'calm', emoji: '😌', label: 'Calm', desc: 'Settled and at peace', color: C.sage },
  { key: 'anxious', emoji: '😰', label: 'Anxious', desc: 'A little on edge', color: C.warmAmber },
  { key: 'sad', emoji: '😔', label: 'Sad', desc: 'Carrying something heavy', color: C.dawnBlue },
  { key: 'overwhelmed', emoji: '😤', label: 'Overwhelmed', desc: 'Too much right now', color: C.lavender },
] as const;

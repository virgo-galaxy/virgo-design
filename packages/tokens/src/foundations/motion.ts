export const duration = {
  instant: '0ms',
  fast: '120ms',
  normal: '180ms',
  moderate: '240ms',
  slow: '360ms',
  slower: '560ms',
} as const;

export const easing = {
  linear: 'linear',
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  emphasized: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;

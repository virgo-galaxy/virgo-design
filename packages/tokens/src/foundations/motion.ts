export const duration = {
  0: '0ms',
  120: '120ms',
  180: '180ms',
  240: '240ms',
  360: '360ms',
  560: '560ms',
} as const;

export const easing = {
  linear: 'linear',
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  decelerate: 'cubic-bezier(0.16, 1, 0.3, 1)',
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  emphasized: 'cubic-bezier(0.22, 1, 0.36, 1)',
} as const;

export type DurationToken = keyof typeof duration;
export type EasingToken = keyof typeof easing;

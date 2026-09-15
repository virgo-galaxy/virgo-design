import type { ElevationTheme } from '../../foundations/elevation.js';

export const darkElevationTheme = {
  0: 'none',
  1: '0 1px 2px rgba(0, 0, 0, 0.18), 0 1px 1px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.05)',
  2: '0 4px 12px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.06)',
  3: '0 10px 30px rgba(0, 0, 0, 0.26), 0 2px 8px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.07)',
  4: '0 20px 50px rgba(0, 0, 0, 0.30), 0 4px 16px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.08)',
  5: '0 32px 80px rgba(0, 0, 0, 0.34), 0 8px 24px rgba(0, 0, 0, 0.26), 0 0 0 1px rgba(255, 255, 255, 0.10)',
} as const satisfies ElevationTheme;

import type { ElevationTheme } from '../../foundations/elevation.js';

export const lightElevationTheme = {
  0: 'none',
  1: '0 1px 2px rgba(15, 18, 23, 0.06), 0 1px 1px rgba(15, 18, 23, 0.04)',
  2: '0 4px 12px rgba(15, 18, 23, 0.08), 0 1px 3px rgba(15, 18, 23, 0.06)',
  3: '0 10px 30px rgba(15, 18, 23, 0.10), 0 2px 8px rgba(15, 18, 23, 0.06)',
  4: '0 20px 50px rgba(15, 18, 23, 0.14), 0 4px 16px rgba(15, 18, 23, 0.08)',
  5: '0 32px 80px rgba(15, 18, 23, 0.18), 0 8px 24px rgba(15, 18, 23, 0.10)',
} as const satisfies ElevationTheme;

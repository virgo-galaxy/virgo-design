import { describe, expect, it } from 'vitest';

import { elevationLevels, themes } from '../index.js';
import type { VirgoTheme } from '../types/theme.js';
import { darkElevationTheme } from './dark/elevation.js';
import { lightElevationTheme } from './light/elevation.js';

describe('theme-aware Elevation', () => {
  it('keeps the six stable Foundation levels', () => {
    expect(elevationLevels).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('moves the approved Light shadows without changing their values', () => {
    expect(lightElevationTheme).toEqual({
      0: 'none',
      1: '0 1px 2px rgba(15, 18, 23, 0.06), 0 1px 1px rgba(15, 18, 23, 0.04)',
      2: '0 4px 12px rgba(15, 18, 23, 0.08), 0 1px 3px rgba(15, 18, 23, 0.06)',
      3: '0 10px 30px rgba(15, 18, 23, 0.10), 0 2px 8px rgba(15, 18, 23, 0.06)',
      4: '0 20px 50px rgba(15, 18, 23, 0.14), 0 4px 16px rgba(15, 18, 23, 0.08)',
      5: '0 32px 80px rgba(15, 18, 23, 0.18), 0 8px 24px rgba(15, 18, 23, 0.10)',
    });
  });

  it('resolves color and all elevation levels for both production themes', () => {
    for (const theme of Object.values(themes)) {
      expect(theme.color).toBeDefined();
      expect(Object.keys(theme.elevation).map(Number)).toEqual(elevationLevels);
      expect(theme).toMatchObject({ color: theme.color, elevation: theme.elevation });
    }

    const typedTheme: VirgoTheme = themes.light;
    expect(typedTheme.elevation).toBe(themes.light.elevation);
  });

  it('defines the approved Dark Elevation values', () => {
    expect(darkElevationTheme).toEqual({
      0: 'none',
      1: '0 1px 2px rgba(0, 0, 0, 0.18), 0 1px 1px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      2: '0 4px 12px rgba(0, 0, 0, 0.22), 0 1px 3px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.06)',
      3: '0 10px 30px rgba(0, 0, 0, 0.26), 0 2px 8px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.07)',
      4: '0 20px 50px rgba(0, 0, 0, 0.30), 0 4px 16px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      5: '0 32px 80px rgba(0, 0, 0, 0.34), 0 8px 24px rgba(0, 0, 0, 0.26), 0 0 0 1px rgba(255, 255, 255, 0.10)',
    });
  });
});

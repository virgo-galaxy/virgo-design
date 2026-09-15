import type { VirgoTheme } from '../../types/theme.js';
import { lightColorTheme } from './color.js';
import { lightElevationTheme } from './elevation.js';

export { lightColorTheme } from './color.js';
export { lightElevationTheme } from './elevation.js';

export const lightTheme = {
  mode: 'light',
  color: lightColorTheme,
  elevation: lightElevationTheme,
} as const satisfies VirgoTheme;

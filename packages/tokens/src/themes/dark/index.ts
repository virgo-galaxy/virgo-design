import type { VirgoTheme } from '../../types/theme.js';
import { darkColorTheme } from './color.js';
import { darkElevationTheme } from './elevation.js';

export { darkColorTheme } from './color.js';
export { darkElevationTheme } from './elevation.js';

export const darkTheme = {
  mode: 'dark',
  color: darkColorTheme,
  elevation: darkElevationTheme,
} as const satisfies VirgoTheme;

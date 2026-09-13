import type { VirgoTheme } from '../../types/theme.js';
import { darkColorTheme } from './color.js';

export { darkColorTheme } from './color.js';

export const darkTheme = {
  mode: 'dark',
  color: darkColorTheme,
} as const satisfies VirgoTheme;

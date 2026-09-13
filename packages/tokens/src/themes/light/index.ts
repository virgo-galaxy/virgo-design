import type { VirgoTheme } from '../../types/theme.js';
import { lightColorTheme } from './color.js';

export { lightColorTheme } from './color.js';

export const lightTheme = {
  mode: 'light',
  color: lightColorTheme,
} as const satisfies VirgoTheme;

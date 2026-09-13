import { darkTheme } from './dark/index.js';
import { lightTheme } from './light/index.js';

export * from './dark/index.js';
export * from './light/index.js';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

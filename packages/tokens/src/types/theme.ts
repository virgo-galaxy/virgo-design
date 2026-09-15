import type { ElevationTheme } from '../foundations/elevation.js';
import type { ColorSemanticTheme } from './semantic.js';

export type ThemeMode = 'light' | 'dark';

export interface VirgoTheme {
  mode: ThemeMode;
  color: ColorSemanticTheme;
  elevation: ElevationTheme;
}

import type { ColorScale } from '../types.js';
import type { ColorFamilyBases } from './types.js';

/**
 * Virgo Design Chromatic Foundation V1.
 *
 * Twelve manually selected chromatic base colors.
 * Each base is step 6 of its own ten-step tonal scale.
 */
export const VIRGO_CHROMATIC_BASES = {
  red: '#f2383d',
  vermilion: '#f2542d',
  orange: '#f58220',
  amber: '#e5a21a',
  yellow: '#d4c91f',
  chartreuse: '#8bcf22',
  green: '#2bc66a',
  teal: '#22b8a2',
  blue: '#2b7eea',
  indigo: '#5c52e8',
  violet: '#9446e8',
  magenta: '#d936b8',
} as const satisfies ColorFamilyBases;

export const VIRGO_CHROMATIC_PRESET = {
  model: 'oklch',
  bases: VIRGO_CHROMATIC_BASES,
} as const;

/**
 * Virgo Design Brand Foundation V1.
 *
 * Round one is generated with the standard ten-step OKLCH scale algorithm.
 * The result is written out and frozen here so a later design pass can tune
 * individual steps without changing the generator itself.
 */
export const VIRGO_BRAND_BASE = '#1664f9';

export const VIRGO_BRAND_SCALE = {
  1: '#f7faff',
  2: '#cfdffb',
  3: '#a6c3f6',
  4: '#7aa6f8',
  5: '#4b87fa',
  6: '#1664f9',
  7: '#0051e0',
  8: '#0041b8',
  9: '#002f8b',
  10: '#002067',
} as const satisfies ColorScale;

/**
 * Virgo Design Neutral Foundation V1.
 *
 * Round one reuses the standard ten-step scale algorithm with a subtly cool
 * graphite base. The result is written out and frozen for later hand tuning.
 */
export const VIRGO_NEUTRAL_BASE = '#5e616d';

export const VIRGO_NEUTRAL_SCALE = {
  1: '#fafafb',
  2: '#d9d9dc',
  3: '#b9babe',
  4: '#999ba2',
  5: '#7b7d87',
  6: '#5e616d',
  7: '#50535f',
  8: '#424450',
  9: '#31333d',
  10: '#24262d',
} as const satisfies ColorScale;

/**
 * 12 chromatic families × 10 steps
 * + 1 brand family × 10 steps
 * + 1 neutral family × 10 steps
 * = 140 foundation colors.
 */
export const VIRGO_COLOR_FOUNDATION_PRESET = {
  chromatic: VIRGO_CHROMATIC_BASES,
  brand: VIRGO_BRAND_SCALE,
  neutral: VIRGO_NEUTRAL_SCALE,
} as const;

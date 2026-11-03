import { readPreference } from './storage.ts';

export const appearanceStorageKey = 'virgo-starter:appearance-mode';
export const appearanceModes = ['system', 'light', 'dark'] as const;
export type AppearanceMode = (typeof appearanceModes)[number];

export function readAppearance(): AppearanceMode {
  const stored = readPreference(appearanceStorageKey);
  return stored === 'light' || stored === 'dark' ? stored : 'system';
}

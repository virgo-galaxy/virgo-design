import { createContext } from 'react';

import type { Appearance, AppearancePreference } from './types';

export interface AppearanceContextValue {
  appearance: Appearance;
  setAppearance: (appearance: Appearance) => void;
  preference?: AppearancePreference;
  setPreference?: (preference: AppearancePreference) => void;
}

export const AppearanceContext = createContext<AppearanceContextValue | null>(null);

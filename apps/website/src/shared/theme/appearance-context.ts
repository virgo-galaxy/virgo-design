import { createContext } from 'react';

import type { Appearance } from './types';

export interface AppearanceContextValue {
  appearance: Appearance;
  setAppearance: (appearance: Appearance) => void;
}

export const AppearanceContext = createContext<AppearanceContextValue | null>(null);

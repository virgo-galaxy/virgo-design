import { createContext, useContext } from 'react';

import { enUS } from '../locales/en-US';

export const LocaleContext = createContext(enUS);

export function useLocale() {
  return useContext(LocaleContext);
}

import type { ReactNode } from 'react';

import { LocaleContext } from '../context/locale-context';
import type { UILocale } from '../model/types';

export interface LocaleProviderProps {
  locale: UILocale;
  children: ReactNode;
}

export function LocaleProvider({ locale, children }: LocaleProviderProps) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

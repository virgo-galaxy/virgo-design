import { LocaleProvider as UILocaleProvider } from '@virgo-design/ui';
import { enUS, zhCN } from '@virgo-design/ui/locale';
import type { ReactNode } from 'react';

import { useAppLocale } from '../use-app-locale';

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = useAppLocale();
  return <UILocaleProvider locale={locale === 'zh-CN' ? zhCN : enUS}>{children}</UILocaleProvider>;
}

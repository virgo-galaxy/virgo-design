import type { LocaleOf } from '@/i18n';

import type { languageControlEnUS } from './en-US';

export const languageControlZhCN = {
  label: '语言',
  auto: '自动检测',
  chinese: '简体中文',
  english: 'English',
} satisfies LocaleOf<typeof languageControlEnUS>;

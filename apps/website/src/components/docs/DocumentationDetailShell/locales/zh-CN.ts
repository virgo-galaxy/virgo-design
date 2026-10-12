import type { LocaleOf } from '@/i18n/locale-types';

import { documentationDetailShellEnUS } from './en-US';

export const documentationDetailShellZhCN = {
  detailShell: {
    footerLabel: '文档页脚',
    poweredBy: '由 Virgo Design 驱动',
    projectLinks: '条目链接',
  },
} satisfies LocaleOf<typeof documentationDetailShellEnUS>;

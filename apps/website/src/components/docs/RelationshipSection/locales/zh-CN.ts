import type { LocaleOf } from '@/i18n/locale-types';

import { relationshipSectionEnUS } from './en-US';

export const relationshipSectionZhCN = {
  relationships: {
    heading: '关联关系',
    composesWith: '常见组合',
    builtWith: '基于',
    usedBy: '被用于',
    primitiveLabel: '{{name}} 原语',
  },
} satisfies LocaleOf<typeof relationshipSectionEnUS>;

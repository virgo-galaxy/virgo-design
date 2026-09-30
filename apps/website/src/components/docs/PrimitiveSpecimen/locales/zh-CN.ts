import type { LocaleOf } from '@/i18n/locale-types';

import { primitiveSpecimenEnUS } from './en-US';

export const primitiveSpecimenZhCN = {
  primitiveSpecimen: {
    title: '基础示例',
    description: '直接渲染原语，不附加 Virgo UI 视觉样式。',
  },
} satisfies LocaleOf<typeof primitiveSpecimenEnUS>;

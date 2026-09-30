import type { LocaleOf } from '@/i18n/locale-types';

import { apiReferenceEnUS } from './en-US';

export const apiReferenceZhCN = {
  apiReference: {
    defaultTitle: 'API',
    defaultDescription:
      '由 {{packageName}} 导出的公共 TypeScript API。属性表中省略原生 React 与 DOM 属性。',
    propertiesRegion: '{{name}} 属性',
    columns: {
      property: '属性',
      type: '类型',
      default: '默认值',
      description: '说明',
    },
    required: '必填',
    inheritedFromPrimitives: '继承自原语',
    publicTypes: '公共类型',
  },
} satisfies LocaleOf<typeof apiReferenceEnUS>;

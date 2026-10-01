import type { LocaleOf } from '@/i18n/locale-types';

import type { stepsExamplesEnUS } from './en-US';
export const stepsExamplesZhCN = {
  copy: {
    title0: '步骤',
    description0: '有序步骤展示，业务负责进度和可选的步骤操作。',
    stage1: '创建',
    stage2: '探索',
    stage3: '导出',
    description: '继续下一步骤',
    label: '颜色工作流',
  },
} as const satisfies LocaleOf<typeof stepsExamplesEnUS>;

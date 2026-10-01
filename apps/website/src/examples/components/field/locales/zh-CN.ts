import type { LocaleOf } from '@/i18n/locale-types';

import type { fieldExamplesEnUS } from './en-US';
export const fieldExamplesZhCN = {
  copy: {
    email: '邮箱',
    private: '我们不会分享你的邮箱。',
    error: '请输入有效的邮箱地址。',
    validate: '校验',
    disabled: '禁用名称',
    readonly: '只读名称',
    custom: '自定义控件',
    title0: '标签与说明',
    description0: '自动生成的 ID 将单个控件与说明关联。',
    title1: '使用方校验',
    description1: '校验逻辑属于示例，不属于 Field。',
    title2: '禁用与只读',
    description2: '控件的显式属性可以覆盖字段默认值。',
  },
} satisfies LocaleOf<typeof fieldExamplesEnUS>;

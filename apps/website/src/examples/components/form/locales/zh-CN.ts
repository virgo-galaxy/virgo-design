import type { LocaleOf } from '@/i18n/locale-types';

import type { formExamplesEnUS } from './en-US';
export const formExamplesZhCN = {
  copy: {
    email: '邮箱',
    private: '仅用于项目更新。',
    project: '项目',
    choose: '选择项目',
    notes: '备注',
    accept: '接受条款',
    notify: '启用通知',
    plan: '方案',
    basic: '基础',
    pro: '专业',
    save: '保存',
    ready: '可以提交。',
    saved: '已保存 {{email}}',
    title0: '统一控件',
    description0: '现有控件继承字段语义。',
    title1: '水平布局',
    description1: '宽屏对齐标签，窄屏自动堆叠。',
    title2: '原生提交',
    description2: '使用方管理 FormData、校验和反馈。',
  },
} satisfies LocaleOf<typeof formExamplesEnUS>;

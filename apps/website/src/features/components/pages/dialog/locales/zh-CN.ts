import type { LocaleOf } from '@/i18n/locale-types';

import type { dialogEnUS } from './en-US';

export const dialogZhCN = {
  overview: {
    description: '通过清晰标题、结构化内容与可预期操作，将注意力集中到决策或短任务上。',
  },
  facts: {
    sizes: '尺寸',
    default: '默认',
    modal: '模态',
    style: '样式',
    classic: '经典',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    focusTrapped: '焦点限制在内部',
    escapeReady: '支持 Escape',
    themeAware: '适配主题',
  },
  sizes: {
    title: '尺寸',
    description: '选择能舒适容纳任务的最小面板。尺寸会同步改变宽度、间距与标题层级。',
  },
  form: {
    title: '表单对话框',
    description: '受控状态允许表单在数据处理完成后关闭对话框。',
  },
} satisfies LocaleOf<typeof dialogEnUS>;

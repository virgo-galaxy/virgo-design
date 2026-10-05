import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const toolbarApiZhCN = {
  api: {
    'toolbar-props.description': '有名称的独立操作区，支持单个 Tab 停靠点和方向键导航。',
    'toolbar-props.properties.size.description': '组内按钮的共同尺寸，按钮显式指定的尺寸优先。',
    'toolbar-props.properties.layout.description': '使用 custom 完整保留现有布局样式。',
    'toolbar-props.properties.orientation.description': '控件排列方向。',
    'toolbar-props.properties.align.description': '主轴对齐方式。',
    'toolbar-props.properties.gap.description': '控件之间使用的间距 token。',
    'toolbar-props.properties.render.description':
      '通过 Surface 或其他 div 组件复用根节点，不增加 DOM 包裹。',
    'toolbar-props.properties.loop.description': '方向键从最后一个可用控件循环到第一个。',
  },
} satisfies ApiDescriptionResources[string];

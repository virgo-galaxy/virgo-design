import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const dialogApiZhCN = {
  api: {
    'dialog-props.properties.modal.description': '打开时阻止与对话框外部内容交互。',
    'dialog-root-props.properties.modal.description': '打开时阻止与对话框外部内容交互。',
    'dialog-trigger-props.properties.variant.description':
      '未提供自定义 render 时的 Virgo Button 样式。',
    'dialog-trigger-props.properties.size.description':
      '未提供自定义 render 时的 Virgo Button 尺寸。',
    'dialog-trigger-props.properties.render.description':
      '渲染自定义按钮，转发全部提供的属性与 ref。',
    'dialog-content-props.properties.size.description': '对话框面板的宽度与内部间距。',
    'dialog-close-props.properties.variant.description':
      '未提供自定义 render 时的 Virgo Button 样式。',
    'dialog-close-props.properties.size.description':
      '未提供自定义 render 时的 Virgo Button 尺寸。',
    'dialog-close-props.properties.render.description':
      '渲染自定义按钮，转发全部提供的属性与 ref。',
  },
} satisfies ApiDescriptionResources[string];

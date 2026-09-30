import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const drawerApiZhCN = {
  api: {
    'drawer-props.properties.modal.description': '打开时阻止与对话框外部内容交互。',
    'drawer-root-props.properties.modal.description': '打开时阻止与对话框外部内容交互。',
    'drawer-trigger-props.properties.variant.description':
      '未提供自定义 render 时的 Virgo Button 样式。',
    'drawer-trigger-props.properties.size.description':
      '未提供自定义 render 时的 Virgo Button 尺寸。',
    'drawer-trigger-props.properties.render.description':
      '渲染自定义按钮，转发全部提供的属性与 ref。',
    'drawer-content-props.properties.placement.description': '面板进入的屏幕边缘。',
    'drawer-content-props.properties.size.description': '左右抽屉的宽度，或上下抽屉的高度。',
    'drawer-close-props.properties.variant.description': '提供可见文字时的 Virgo Button 样式。',
    'drawer-close-props.properties.size.description': 'Virgo Button 尺寸。',
    'drawer-close-props.properties.render.description':
      '渲染自定义按钮，转发全部提供的属性与 ref。',
  },
} satisfies ApiDescriptionResources[string];

import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const segmentedControlApiZhCN = {
  api: {
    'segmented-control-props.properties.variant.description': '分段控件的视觉样式。',
    'segmented-control-props.properties.size.description': '分段控件的视觉密度。',
    'segmented-control-props.properties.motion.description': '选中指示器的过渡样式。',
    'segmented-control-props.properties.class-name.description':
      '应用到分段控件根节点的自定义 class。',
    'segmented-control-props.properties.default-value.description': '非受控模式下的初始选中值。',
    'segmented-control-props.properties.value.description': '受控的选中值。',
    'segmented-control-props.properties.disabled.description': '禁用分组中的所有单选控件。',
    'segmented-control-props.properties.name.description': '转发到分组 radio 输入的共享原生 name。',
    'segmented-control-props.properties.on-value-change.description': '选中值变化时调用。',
    'segmented-control-item-props.properties.value.description': '此分段表示的值。',
    'segmented-control-item-props.properties.children.description': '分段的可见标签或内容。',
    'segmented-control-item-props.properties.tooltip.description':
      '鼠标悬停或键盘聚焦时显示提示；false 不显示。',
    'segmented-control-item-props.properties.class-name.description':
      '应用到分段根节点的自定义 class。',
  },
} satisfies ApiDescriptionResources[string];

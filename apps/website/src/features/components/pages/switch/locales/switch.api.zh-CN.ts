import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const switchApiZhCN = {
  api: {
    'switch-props.properties.appearance.description': '标准胶囊形开关或控制台推子外观。',
    'switch-props.properties.size.description': '默认与紧凑视觉尺寸。',
    'switch-props.properties.checked-content.description': '选中时显示在开关内部的装饰内容。',
    'switch-props.properties.unchecked-content.description': '未选中时显示在开关内部的装饰内容。',
    'switch-props.properties.children.description': '开关控件旁的可选可见标签。',
    'switch-props.properties.class-name.description': '应用到 Switch 根标签的自定义 class。',
    'switch-props.properties.on-checked-change.description': '选中状态变化时调用。',
  },
} satisfies ApiDescriptionResources[string];

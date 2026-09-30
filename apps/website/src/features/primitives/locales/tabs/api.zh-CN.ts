import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const tabsApiZhCN = {
  api: {
    'tabs-props.properties.value.description': '受控的激活标签页值。',
    'tabs-props.properties.default-value.description': '非受控模式下初始激活的标签页值。',
    'tabs-props.properties.on-value-change.description': '激活标签页变化时调用。',
    'tab-props.properties.value.description': '将此标签页与其面板关联的值。',
    'tab-panel-props.properties.value.description': '控制此面板的标签页值。',
  },
} satisfies ApiDescriptionResources[string];

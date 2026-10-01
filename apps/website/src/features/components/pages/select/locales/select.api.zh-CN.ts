import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const selectApiZhCN = {
  api: {
    'select-props.properties.read-only.description': '保留聚焦能力，同时阻止打开列表或改变选择。',

    'select-props.properties.id.description': '应用到交互触发器的标识。',
    'select-trigger-props.properties.aria-invalid.description': '表示输入值不符合应用期望的格式。',
  },
} satisfies ApiDescriptionResources[string];

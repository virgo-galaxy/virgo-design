import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const menuApiZhCN = {
  api: {
    'menu-checkbox-item-props.properties.on-select.description':
      '使用 event.preventDefault() 取消选择。',
    'menu-checkbox-item-props.properties.close-on-select.description':
      '操作默认使用 true，复选 / 单选项目默认使用 false。',
    'menu-checkbox-item-props.properties.text-value.description':
      '富内容的搜索标签。UI 会排除快捷键显示文字。',
    'menu-item-props.properties.on-select.description': '使用 event.preventDefault() 取消选择。',
    'menu-item-props.properties.close-on-select.description':
      '操作默认使用 true，复选 / 单选项目默认使用 false。',
    'menu-item-props.properties.text-value.description':
      '富内容的搜索标签。UI 会排除快捷键显示文字。',
    'menu-radio-item-props.properties.on-select.description':
      '使用 event.preventDefault() 取消选择。',
    'menu-radio-item-props.properties.close-on-select.description':
      '操作默认使用 true，复选 / 单选项目默认使用 false。',
    'menu-radio-item-props.properties.text-value.description':
      '富内容的搜索标签。UI 会排除快捷键显示文字。',
  },
} satisfies ApiDescriptionResources[string];

import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const commandApiZhCN = {
  api: {
    'command-props.properties.should-filter.description': '禁用内置过滤，保留集合与键盘协议。',
    'command-root-props.properties.should-filter.description': '禁用内置过滤，保留集合与键盘协议。',
    'command-item-props.properties.icon.description': '装饰性前置图标。',
    'command-item-props.properties.shortcut.description': '仅用于显示的按键提示，不注册快捷键。',
    'command-dialog-props.properties.modal.description': '打开时阻止与对话框外部内容交互。',
    'command-dialog-props.properties.should-filter.description':
      '禁用内置过滤，保留集合与键盘协议。',
  },
} satisfies ApiDescriptionResources[string];

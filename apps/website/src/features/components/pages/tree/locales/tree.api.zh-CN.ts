import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const treeApiZhCN = {
  api: {
    'tree-props.properties.size.description': '行密度。',
    'tree-props.properties.expanded-values.description': '已展开的分支值。',
    'tree-props.properties.default-expanded-values.description': '非受控模式下初始展开的分支。',
    'tree-props.properties.on-expanded-values-change.description': '展开或收起分支时调用。',
    'tree-props.properties.selected-values.description': '选中项的值，单选模式最多保留一个值。',
    'tree-props.properties.default-selected-values.description': '非受控模式下初始选中的项目。',
    'tree-props.properties.on-selected-values-change.description':
      '显式选择时调用，与焦点移动相互独立。',
    'tree-props.properties.selection-mode.description': '单选、无需修饰键的多选，或仅导航模式。',
    'tree-props.properties.disabled.description': '禁用整棵树的交互。',
    'tree-item-props.properties.value.description': '当前树内唯一的值。',
    'tree-item-props.properties.branch.description': '标识包含 Tree.Group 的可展开节点。',
    'tree-item-props.properties.disabled.description': '将该项排除在键盘导航与选择之外。',
    'tree-item-props.properties.text-value.description': '富内容项用于前缀搜索的纯文本标签。',
  },
} satisfies ApiDescriptionResources[string];

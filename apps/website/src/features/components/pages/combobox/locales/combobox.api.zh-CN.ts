import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const comboboxApiZhCN = {
  api: {
    'combobox-input-props.properties.prefix.description': '输入框前方的可选装饰内容。',

    'combobox-props.properties.size.description': '输入框与候选项的密度。',
    'combobox-props.properties.value.description': '选中的候选项值，空字符串表示未选择。',
    'combobox-props.properties.default-value.description': '初始选中值。',
    'combobox-props.properties.on-value-change.description':
      '选择候选项或显式清除时调用，输入文本时不调用。',
    'combobox-props.properties.input-value.description': '当前输入文本，与选中值相互独立。',
    'combobox-props.properties.default-input-value.description': '自动补全场景的初始输入文本。',
    'combobox-props.properties.on-input-value-change.description':
      '输入文本变化或候选项填入输入框时调用。',
    'combobox-props.properties.open.description': '受控浮层状态。',
    'combobox-props.properties.default-open.description': '初始浮层状态。',
    'combobox-props.properties.on-open-change.description': '请求打开或关闭浮层时调用。',
    'combobox-props.properties.disabled.description': '禁用输入、选择和清除。',
    'combobox-props.properties.read-only.description': '保留输入框的聚焦能力，同时阻止编辑与选择。',
    'combobox-props.properties.name.description': '提交选中值的隐藏表单控件名称。',
    'combobox-props.properties.should-filter.description':
      '使用方或远程结果列表可以关闭客户端筛选。',
    'combobox-props.properties.filter.description':
      '自定义同步筛选函数，默认使用忽略大小写的子字符串匹配。',
    'combobox-content-props.properties.portal.description': '渲染到 document body 的 Portal。',
    'combobox-content-props.properties.placement.description':
      '首选的逻辑方向浮层位置，碰撞处理可能翻转或移动浮层。',
    'combobox-content-props.properties.offset.description': '输入框与浮层之间的像素间距。',
    'combobox-option-props.properties.value.description': '唯一且非空的选中值。',
    'combobox-option-props.properties.text-value.description': '用于筛选及填入输入框的纯文本。',
    'combobox-option-props.properties.keywords.description': '额外搜索词。',
    'combobox-option-props.properties.disabled.description': '可见，但不可选择或高亮。',
    'combobox-group-props.properties.label.description': '可见分组标题及无障碍名称。',
  },
} satisfies ApiDescriptionResources[string];

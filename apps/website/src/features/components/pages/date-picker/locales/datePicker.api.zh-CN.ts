import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const datePickerApiZhCN = {
  api: {
    'date-picker-props.properties.size.description': '视觉密度。',
    'date-picker-props.properties.value.description':
      '受控日期，格式为 YYYY-MM-DD，空字符串表示未选择。',
    'date-picker-props.properties.default-value.description': '初始选中日期。',
    'date-picker-props.properties.on-value-change.description':
      '原生日期输入编辑或日历选择时调用。',
    'date-picker-props.properties.open.description': '受控的日历浮层状态。',
    'date-picker-props.properties.default-open.description': '日历浮层的初始状态。',
    'date-picker-props.properties.on-open-change.description': '请求打开或关闭浮层时调用。',
    'date-picker-props.properties.name.description': '所选值的表单控件名称。',
    'date-picker-props.properties.min.description': '最早可选日期，包含该日期。',
    'date-picker-props.properties.max.description': '最晚可选日期，包含该日期。',
    'date-picker-props.properties.disabled.description': '禁用输入与浮层。',
    'date-picker-props.properties.read-only.description':
      '保持输入可聚焦，同时阻止编辑和日历选择。',
    'date-picker-trigger-props.properties.render.description':
      '提供一个转发所给原生属性与 ref 的按钮。',
    'date-picker-content-props.properties.placement.description':
      '逻辑 Start/End 对齐遵循触发按钮的方向。',
    'date-picker-content-props.properties.offset.description': '触发按钮与面板的间距，单位为像素。',
    'date-picker-calendar-props.properties.auto-focus.description':
      '挂载时聚焦启用的所选日期或第一个可用日期。',
    'date-picker-calendar-props.properties.disabled.description': '禁用所有选择与键盘导航。',
    'date-picker-calendar-props.properties.read-only.description': '允许导航，同时阻止选择。',
    'date-picker-calendar-props.properties.month.description': '受控的显示月份，格式为 YYYY-MM。',
    'date-picker-calendar-props.properties.default-month.description':
      '初始月份，默认使用所选日期或今天所在的月份。',
    'date-picker-calendar-props.properties.on-month-change.description': '请求月份导航时调用。',
    'date-picker-calendar-props.properties.is-date-unavailable.description':
      '由使用方指定额外的不可用日期。',
    'date-picker-calendar-props.properties.locale.description':
      '用于月份、星期和日期名称的 Intl 区域设置。',
    'date-picker-calendar-props.properties.week-starts-on.description':
      '每周的第一天，从 0（周日）到 6（周六）。',
    'date-picker-calendar-props.properties.previous-month-content.description':
      '上个月按钮的装饰内容。',
    'date-picker-calendar-props.properties.next-month-content.description':
      '下个月按钮的装饰内容。',
    'date-picker-calendar-props.properties.previous-month-label.description':
      '本地化的上个月按钮标签。',
    'date-picker-calendar-props.properties.next-month-label.description':
      '本地化的下个月按钮标签。',
  },
} satisfies ApiDescriptionResources[string];

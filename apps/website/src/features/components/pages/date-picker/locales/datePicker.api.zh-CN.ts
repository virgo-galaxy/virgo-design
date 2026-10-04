import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const datePickerApiZhCN = {
  api: {
    'date-range.description': '包含起止日期的区间；端点为空表示单边日期条件或正在选择的区间。',
    'date-picker-range-input-props.properties.type.description':
      '文本输入支持应用管理的日期格式；原生日期输入遵循浏览器语言。',
    'date-picker-range-calendar-props.properties.fixed-weeks.description':
      '固定显示六行周；设为 false 时只显示当前月份需要的行数。',
    'date-picker-range-calendar-props.properties.render-date-content.description':
      '在日期数字下方追加非交互内容。',
    'date-picker-range-calendar-props.properties.previous-year-label.description':
      '本地化的上一年按钮标签。',
    'date-picker-range-calendar-props.properties.next-year-label.description':
      '本地化的下一年按钮标签。',
    'date-picker-range-props.properties.size.description': '视觉密度。',
    'date-picker-range-props.properties.value.description': '受控的起止日期，格式为 YYYY-MM-DD。',
    'date-picker-range-props.properties.default-value.description': '初始日期区间。',
    'date-picker-range-props.properties.on-value-change.description':
      '输入编辑或每次选择日期时调用；第一次选择的结束日期为空。',
    'date-picker-range-props.properties.open.description': '受控的日历浮层状态。',
    'date-picker-range-props.properties.default-open.description': '日历浮层的初始状态。',
    'date-picker-range-props.properties.on-open-change.description': '请求打开或关闭浮层时调用。',
    'date-picker-range-props.properties.min.description': '最早可选日期，包含该日期。',
    'date-picker-range-props.properties.max.description': '最晚可选日期，包含该日期。',
    'date-picker-range-props.properties.disabled.description': '禁用输入与浮层。',
    'date-picker-range-props.properties.read-only.description':
      '保持输入可聚焦，同时阻止编辑和日历选择。',
    'date-picker-range-calendar-props.properties.disabled.description': '禁用所有选择与键盘导航。',
    'date-picker-range-calendar-props.properties.read-only.description': '允许导航，同时阻止选择。',
    'date-picker-range-calendar-props.properties.month.description':
      '受控的第一个显示月份，格式为 YYYY-MM。',
    'date-picker-range-calendar-props.properties.default-month.description':
      '初始月份，默认使用所选日期或今天所在的月份。',
    'date-picker-range-calendar-props.properties.on-month-change.description':
      '请求切换第一个显示月份时调用。',
    'date-picker-range-calendar-props.properties.is-date-unavailable.description':
      '由使用方指定额外的不可用日期。',
    'date-picker-range-calendar-props.properties.locale.description':
      '用于月份、星期和日期名称的 Intl 区域设置。',
    'date-picker-range-calendar-props.properties.week-starts-on.description':
      '每周的第一天，从 0（周日）到 6（周六）。',
    'date-picker-range-calendar-props.properties.previous-month-content.description':
      '上个月按钮的装饰内容。',
    'date-picker-range-calendar-props.properties.next-month-content.description':
      '下个月按钮的装饰内容。',
    'date-picker-range-calendar-props.properties.previous-month-label.description':
      '本地化的上个月按钮标签。',
    'date-picker-range-calendar-props.properties.next-month-label.description':
      '本地化的下个月按钮标签。',
    'date-picker-range-props.properties.names.description':
      '开始日期与结束日期输入的独立表单控件名称。',
    'date-picker-range-input-props.properties.edge.description': '此输入编辑的区间端点。',
    'date-picker-calendar-props.properties.highlight-range.description':
      '高亮包含起止日期的区间，不改变单日选择值。',
    'date-picker-calendar-props.properties.show-outside-days.description': '显示相邻月份的日期。',

    'date-picker-input-props.properties.type.description':
      '原生日期输入遵循浏览器语言；文本输入允许应用自行设置 YYYY-MM-DD 占位提示并校验日期。',
    'date-picker-calendar-props.properties.fixed-weeks.description':
      '固定显示六行周；设为 false 时只显示当前月份需要的行数。',
    'date-picker-calendar-props.properties.mode.description':
      '受控的面板模式：日期网格或十二个月的网格。',
    'date-picker-calendar-props.properties.default-mode.description': '初始面板模式。',
    'date-picker-calendar-props.properties.on-mode-change.description': '面板模式变化时调用。',
    'date-picker-calendar-props.properties.render-header.description':
      '自定义头部，保留面板状态和导航约束。',
    'date-picker-calendar-props.properties.render-date-content.description':
      '在日期数字下方追加非交互内容。',
    'date-picker-calendar-props.properties.previous-year-label.description':
      '本地化的上一年按钮标签。',
    'date-picker-calendar-props.properties.next-year-label.description': '本地化的下一年按钮标签。',
    'date-picker-props.properties.size.description': '视觉密度。',
    'date-picker-props.properties.value.description':
      '受控日期，格式为 YYYY-MM-DD，空字符串表示未选择。',
    'date-picker-props.properties.default-value.description': '初始选中日期。',
    'date-picker-props.properties.on-value-change.description': '输入编辑或日历选择时调用。',
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

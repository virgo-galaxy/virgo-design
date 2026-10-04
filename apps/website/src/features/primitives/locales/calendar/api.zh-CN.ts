import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const calendarApiZhCN = {
  api: {
    'calendar-props.properties.highlight-range.description':
      '高亮包含起止日期的区间，不改变单日选择值。',
    'calendar-props.properties.show-outside-days.description': '显示相邻月份的日期。',
    'calendar-props.properties.fixed-weeks.description':
      '固定显示六行周；设为 false 时只显示当前月份需要的行数。',
    'calendar-props.properties.mode.description': '受控的面板模式：日期网格或十二个月的网格。',
    'calendar-props.properties.default-mode.description': '初始面板模式。',
    'calendar-props.properties.on-mode-change.description': '面板模式变化时调用。',
    'calendar-props.properties.render-header.description': '自定义头部，保留面板状态和导航约束。',
    'calendar-props.properties.render-date-content.description': '在日期数字下方追加非交互内容。',
    'calendar-props.properties.previous-year-label.description': '本地化的上一年按钮标签。',
    'calendar-props.properties.next-year-label.description': '本地化的下一年按钮标签。',
    'calendar-props.properties.value.description':
      '所选日期，格式为 YYYY-MM-DD，空字符串表示未选择。',
    'calendar-props.properties.default-value.description': '初始所选日期。',
    'calendar-props.properties.on-value-change.description': '选择启用的日期时调用。',
    'calendar-props.properties.month.description': '受控的显示月份，格式为 YYYY-MM。',
    'calendar-props.properties.default-month.description':
      '初始月份，默认使用所选日期或今天所在的月份。',
    'calendar-props.properties.on-month-change.description': '请求月份导航时调用。',
    'calendar-props.properties.min.description': '最早可选日期，包含该日期。',
    'calendar-props.properties.max.description': '最晚可选日期，包含该日期。',
    'calendar-props.properties.is-date-unavailable.description': '由使用方指定额外的不可用日期。',
    'calendar-props.properties.locale.description': '用于月份、星期和日期名称的 Intl 区域设置。',
    'calendar-props.properties.week-starts-on.description':
      '每周的第一天，从 0（周日）到 6（周六）。',
    'calendar-props.properties.disabled.description': '禁用所有选择与键盘导航。',
    'calendar-props.properties.read-only.description': '允许导航，同时阻止选择。',
    'calendar-props.properties.auto-focus.description':
      '挂载时聚焦启用的所选日期或第一个可用日期。',
    'calendar-props.properties.previous-month-content.description': '上个月按钮的装饰内容。',
    'calendar-props.properties.next-month-content.description': '下个月按钮的装饰内容。',
    'calendar-props.properties.previous-month-label.description': '本地化的上个月按钮标签。',
    'calendar-props.properties.next-month-label.description': '本地化的下个月按钮标签。',
  },
} satisfies ApiDescriptionResources[string];

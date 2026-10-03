import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const tooltipApiZhCN = {
  api: {
    'tooltip-provider-props.properties.size.description':
      '后代提示的默认内容密度，也适用于控件内置的提示。',
    'tooltip-provider-props.properties.arrow.description': '后代提示默认是否显示三角箭头。',
    'tooltip-props.properties.open-delay.description': '悬停延迟，单位为毫秒；键盘聚焦立即打开。',
    'tooltip-props.properties.close-on-click.description':
      '激活时关闭。设置为 false 时，在悬停或键盘聚焦期间保留动态反馈。',
    'tooltip-props.properties.smooth-transition.description':
      '在启用此选项的提示之间平滑切换；普通提示保留自身延迟与淡入淡出。',
    'tooltip-trigger-props.properties.render.description':
      '将全部提供的属性与 ref 转发到原生按钮。',
    'tooltip-content-props.properties.size.description':
      '内容密度，独立于 Tooltip.Trigger 的按钮尺寸。',
    'tooltip-content-props.properties.tone.description': '适配主题的语义颜色。',
  },
} satisfies ApiDescriptionResources[string];

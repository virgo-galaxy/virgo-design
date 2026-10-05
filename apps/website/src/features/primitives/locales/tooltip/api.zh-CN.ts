import type { ApiDescriptionResources } from '@/i18n/api-description-resources';

export const tooltipApiZhCN = {
  api: {
    'tooltip-props.properties.anchor-ref.description':
      '受控提示可使用已有元素作为外部锚点；使用方处理悬停和聚焦。',
    'tooltip-content-props.properties.anchor-ref.description':
      '可指定定位元素；悬停、聚焦和无障碍描述仍由触发按钮负责。',
    'tooltip-props.properties.open-delay.description': '悬停延迟，单位为毫秒；键盘聚焦立即打开。',
    'tooltip-props.properties.close-on-click.description':
      '激活时关闭。设置为 false 时，在悬停或键盘聚焦期间保留动态反馈。',
    'tooltip-props.properties.smooth-transition.description':
      '在启用此选项的提示之间平滑切换；普通提示保留自身延迟与淡入淡出。',
    'tooltip-trigger-props.properties.render.description':
      '将全部提供的属性与 ref 转发到原生按钮。',
  },
} satisfies ApiDescriptionResources[string];

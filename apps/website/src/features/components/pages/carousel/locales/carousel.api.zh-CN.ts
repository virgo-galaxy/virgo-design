import type { ApiDescriptionResources } from '@/i18n/api-description-resources';
export const carouselApiZhCN = {
  api: {
    'carousel-props.properties.size.description': '导航、指示器与播放控件的尺寸。',
    'carousel-indicators-props.properties.placement.description':
      '将指示器放在常规文档流中，或视口内部的底部。',
    'carousel-item-props.properties.index.description': '受控的从 0 开始的页码。',
    'carousel-props.properties.motion.description': '页面过渡方式；减少动态效果时禁用动画。',
    'carousel-props.properties.arrows.description':
      '圆形上/下一页按钮，默认隐藏；也可设为悬停或焦点时显示，或始终显示。',
    'carousel-props.properties.stack-below.description':
      '视口宽度低于该像素值时将所有页面堆叠显示。',
    'carousel-props.properties.count.description': '页面数量。',
    'carousel-props.properties.index.description': '受控的从 0 开始的页码。',
    'carousel-props.properties.default-index.description': '初始页码。',
    'carousel-props.properties.on-index-change.description': '请求切换页面时调用。',
    'carousel-props.properties.loop.description': '在首尾循环导航。',
    'carousel-props.properties.auto-play.description':
      '启用自动切换；悬停、焦点、拖动、隐藏文档或减少动态效果时暂停。',
    'carousel-props.properties.interval.description': '自动切换的间隔，单位毫秒。',
    'carousel-props.properties.draggable.description': '允许在非交互内容上通过鼠标或触摸横向拖动。',
    'carousel-props.properties.wheel.description':
      '启用横向触控板与 Shift 滚轮导航，保留纵向滚动。',
    'carousel-props.properties.layout.description': '分页导航或全部可访问的堆叠内容。',
    'carousel-indicators-props.properties.variant.description': '可直接导航的圆点或分段进度条。',
    'carousel-indicators-props.properties.get-slide-label.description':
      '按从 0 开始的页码提供导航按钮的无障碍名称。',
  },
} satisfies ApiDescriptionResources[string];

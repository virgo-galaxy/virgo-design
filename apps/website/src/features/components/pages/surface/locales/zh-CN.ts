import type { LocaleOf } from '@/i18n/locale-types';

import type { surfaceEnUS } from './en-US';

export const surfaceZhCN = {
  overview: {
    description:
      'Layout 定义空间，Surface 提供视觉外观。语义颜色、材质与层级为标题区、面板和浮动内容提供统一语言。',
    note: '在普通结构区域上构建的玻璃标题区。',
  },
  facts: {
    tones: '色调',
    materials: '材质',
    elevation: '层级',
  },
  specimen: {
    referenceSpecimen: '参考样例',
    themeAwareTint: '适配主题的色调',
    nativeContent: '原生内容',
    cssMaterial: 'CSS 材质',
  },
  semantic: {
    title: '语义 Surface',
    description:
      '四种容器色调使用现有语义表面 token。默认表面不添加内边距、尺寸、边框或圆角；样例间距由本页提供。',
  },
  material: {
    title: '材质',
    description:
      '每个表面后方使用相同视觉测试卡：solid 保留语义填充，translucent 透出场景，glass 使其柔化。切换上方浅色 / 深色模式比较色调。',
  },
  background: {
    title: '背景',
    description:
      '装饰颜色、渐变与离线图像示例可独立复制。有意义的图像应使用带 alt 文本的 img，自定义背景应选择易读的前景色。',
  },
  depth: {
    title: '层级与形状',
    description:
      '现有 Elevation 0–5、语义边框与圆角 token 独立于材质工作，不引入新的 Foundation 比例。',
  },
  composition: {
    title: '组合',
    description:
      'Layout 管理标题区、侧栏与内容区域，Surface 提供外观。嵌套表面保留自身材质，可见溢出为徽标、阴影与浮动内容留下空间。',
  },
} satisfies LocaleOf<typeof surfaceEnUS>;

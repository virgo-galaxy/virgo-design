import type { LocaleOf } from '@/i18n/locale-types';

import type { themesEnUS } from './en-US';

export const themesZhCN = {
  title: '主题系统',
  description: '同一套组件，六种视觉语言，独立的浅色与深色外观。',
  model: {
    title: 'Theme、Token 与明暗外观',
    description: '主题实现视觉契约；组件继续负责结构、语义和交互。',
    ownership:
      'Tokens 定义语义颜色与带版本的视觉契约，Themes 提供具体视觉实现。UI 和 Charts 消费这些变量，两者都不依赖某套官方主题。',
    appearance:
      '主题风格与明暗外观是两个独立维度。Soft + Light 和 Soft + Dark 使用同一组组件。Auto 通过现有外观状态跟随系统，Pro 中对应的偏好名称是“系统”。',
    baseline:
      'Virgo 保留现有 Website 与 Golden Pro 的视觉基线。颜色、间距、排版和圆角基础色阶仍作为参考数据，主题视觉通过独立的语义角色控制。',
  },
  comparison: {
    title: '对比官方主题',
    description:
      '六个独立作用域使用同一组 Button、Input、Select、Checkbox、Table、Dialog、Tooltip、Surface 和 Chart。可直接检查悬停、焦点、选中、禁用和浮层。',
    appearance: '对照明暗外观',
  },
  install: {
    title: '安装与切换',
    description:
      '先加载 Tokens，再加载官方主题 CSS 和组件样式；在首次渲染前初始化与框架无关的运行时。',
    persistence:
      '运行时在 html 设置 data-virgo-theme，并将选择保存在 virgo-design.theme-style.v1。顶栏与 Settings 共用订阅，其他标签页通过 storage 事件同步。存储不可用时仍可在当前页面切换。运行时不会修改 data-theme 或明暗偏好。',
  },
  registry: {
    title: '主题注册表',
    description:
      '固定的官方 ID、ThemePreset 元数据、契约版本及支持的明暗外观，默认值为 virgo。第三方主题应在初始化前注册。',
    name: '名称',
    direction: '视觉方向',
  },
  directions: {
    virgo: '现有 Virgo 视觉基线：蓝色强调、均衡的控件和既有表面层级。',
    minimal: '以中性表面为主，克制圆角、安静层级、轻边框和极弱阴影。',
    soft: '柔和灰阶、更圆润的控件、稍舒展的控件尺寸与柔软阴影。',
    glass:
      '中性透明白／黑、真实背景透镜、克制高光边缘与柔和浮层深度；蓝色只用于操作和选中。不支持模糊时提供可读的实色回退。',
    utility: '紧凑控件、方正边角、硬边界、内凹与外凸阴影，以及明确的按压下沉。',
    highContrast: '文字与表面强分离，明确边框、焦点和选中状态，禁用状态仍可辨认，层级不依赖阴影。',
  },
  authoring: {
    title: '创建第三方主题',
    description: '实现 CSS 变量并注册元数据，复用已有组件和业务布局。',
    contract:
      '从 Tokens 导入 themeContract 和 THEME_CONTRACT_VERSION 查看公开视觉契约。语义颜色与阴影通过 --vd-theme-light-* 和 --vd-theme-dark-* 覆盖；控件、形状、动效、浮层、导航、表格、界面框架与图表使用对应的 --vd-* 视觉角色。已有公共组件变量仍可用于明确的单实例定制。',
    scopes:
      '局部 data-virgo-theme 作用域将视觉覆盖重置为 Virgo 默认值，data-theme 指定明暗外观。独立主题对照使用公共 PortalProvider，让 Dialog 与 Tooltip 继承各自的作用域；普通应用的 body 浮层直接继承 html。',
    audit:
      '检查两种明暗外观、键盘焦点、悬停、按压、禁用、选中、长内容、窄视口、减少动态效果、图表更新和已打开的浮层。Glass 使用中性透明材质、克制的透镜层次与无模糊实色回退。High Contrast 是显式主题，与浏览器 forced-colors 无障碍模式独立。',
  },
  specimen: {
    material: '底层内容真实透过材质。',
    primary: '主要操作',
    outline: '描边',
    disabled: '已禁用',
    input: '工作空间名称',
    placeholder: '输入工作空间名称',
    select: '团队方向',
    design: '设计',
    engineering: '研发',
    checkbox: '启用通知',
    table: '组件表格',
    component: '组件',
    status: '状态',
    ready: '就绪',
    selected: '已选中',
    chart: '主题图表',
    series: '活动',
    openDialog: '打开 Dialog',
    dialogDescription: '真实 Portal 继承当前对照卡片的主题和明暗外观。',
    close: '关闭',
    tooltip: '同一个 Tooltip，通过公共契约切换主题。',
  },
} satisfies LocaleOf<typeof themesEnUS>;

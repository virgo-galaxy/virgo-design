import type { LocaleOf } from '@/i18n/locale-types';

import type { themesEnUS } from './en-US';

export const themesZhCN = {
  title: '主题',
  description: '基于 Virgo Design token 与视觉契约构建，提供统一的界面与图表样式。',
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
  experience: {
    title: '体验官方主题',
    description: '通过顶栏切换主题，在同一界面中观察组件、图表与浮层的视觉表现。',
  },
  install: {
    title: '安装与切换',
    description:
      '先加载 Tokens，再加载官方主题 CSS 和组件样式；在首次渲染前初始化与框架无关的运行时。',
    persistence:
      '运行时在 html 设置 data-virgo-theme，并将选择保存在 virgo-design.theme-style.v1。顶栏与 Settings 共用订阅，其他标签页通过 storage 事件同步。存储不可用时仍可在当前页面切换。普通主题切换保留明暗偏好。SSR 为每个请求创建 registry/runtime，并 hydrate 同一个解析结果；保存偏好通过 CSS 前的同步 head bootstrap 恢复。',
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
    retro: '紧凑控件、方正边角、硬边界、内凹与外凸阴影，以及明确的按压下沉。',
    contrast: '强调强前后景分离、明确边界，清晰呈现焦点、选中和禁用状态，减少依赖阴影与细微灰阶。',
  },
  authoring: {
    title: '创建第三方主题',
    description:
      '验证 Light/Dark 声明、生成作用域 CSS，并用同一组 token 注册元数据，复用已有组件和业务布局。',
    contract:
      '从 Tokens 导入 themeContractRoles 和 THEME_CONTRACT_VERSION 查看当前正式契约。语义颜色与阴影通过 --vd-theme-light-* 和 --vd-theme-dark-* 覆盖；控件、形状、动效、浮层、导航、表格与图表使用对应的 --vd-* 视觉角色。已有公共组件变量仍可用于明确的单实例定制。',
    scopes:
      '局部 data-virgo-theme 作用域将视觉覆盖重置为 Virgo 默认值，data-theme 指定明暗外观。独立主题对照使用公共 PortalProvider，让 Dialog 与 Tooltip 继承各自的作用域；普通应用的 body 浮层直接继承 html。',
    audit:
      '检查两种明暗外观、键盘焦点、悬停、按压、禁用、选中、长内容、窄视口、减少动态效果、图表更新和已打开的浮层。Glass 使用中性透明材质、克制的透镜层次与无模糊实色回退。高对比（Contrast）是显式主题，与浏览器 forced-colors 无障碍模式独立。',
  },
  specimen: {
    title: '主题预览',
    description: '在同一组示例中观察颜色、边界、圆角与层次。',
    controls: '控件示例',
    input: '文本输入',
    placeholder: '输入一些文字',
    select: '选择器',
    options: {
      one: '选项一',
      two: '选项二',
      three: '选项三',
    },
    checkbox: '复选框',
    disabled: '禁用按钮',
    table: '表格示例',
    name: '名称',
    category: '类别',
    value: '数值',
    sampleName: '示例 {{label}}',
    categories: {
      one: '类别一',
      two: '类别二',
    },
    chart: '图表示例',
    series: '系列 A',
    materialTitle: '表面材质',
    material: '观察背景、边界与阴影形成的层次。',
    openTooltip: '文字提示',
    tooltip: '悬停或键盘聚焦时显示的简短文字提示。',
    openPopover: '气泡卡片',
    popoverTitle: '气泡卡片示例',
    popoverDescription: '在浮层中展示简短的标题和正文。',
    openDialog: '对话框',
    dialogTitle: '对话框示例',
    dialogDescription: '通过独立浮层展示标题、内容与操作。',
    dialogBody: '观察当前主题下的表面、文字、边界与阴影。',
    close: '关闭',
  },
} satisfies LocaleOf<typeof themesEnUS>;

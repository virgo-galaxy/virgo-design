import type { LocaleOf } from '@/i18n/locale-types';

import type { chartsEnUS } from './en-US';
export const chartsZhCN = {
  title: '图表',
  description:
    '基于 React 与 Apache ECharts 构建的数据可视化组件，提供统一的语义主题、交互反馈与动画能力。',
  created: '新增',
  completed: '完成',
  planned: '计划',
  update: '更新数据',
  reset: '重置',
  data: '查看原始数据',
  empty: '暂无图表数据',
  line: '折线图',
  area: '面积图',
  bar: '柱状图',
  grouped: '分组柱状图',
  stacked: '堆叠柱状图',
  pie: '饼图',
  donut: '环形图',
  labelLine: '标签引导线',
  engine: '引擎与高级用法',
  engineDescription: 'Virgo Charts 由 Apache ECharts 驱动。',
  engineBoundary:
    'ECharts 负责渲染、坐标轴、图形、动画与交互。Virgo 提供 React API、语义主题、格式化与无障碍约定。Sparkline 使用轻量原生 SVG。',
  rendererDescription:
    '默认使用 SVG 渲染。大量数据或需要 Canvas 的场景可在 Root 或 Responsive 上设置 renderer="canvas"。',
  declarative: 'A. Virgo 声明式 API',
  advanced: 'B. 原生 EChartsOption',
  advancedDescription:
    '独立入口支持雷达图、仪表盘、散点图、热力图、桑基图、矩形树图、漏斗图、K 线图、关系图、地理图和 DataZoom。仅在使用高级用法时加载完整引擎。',
  loadingAdvanced: '高级示例加载中…',
  radar: '雷达图',
  heatmap: '日历热力图',
  activity: '活动',
  quality: '质量',
  sparkline: '迷你趋势图',
  interactions: '交互与动画',
  interactionDescription:
    '悬停或聚焦某个位置，查看同一位置的多个系列。方向键切换数据点，图例按钮切换系列显示。更新数值可查看图形的平滑过渡。',
  responsive: '响应式与主题',
  responsiveDescription: '调整容器宽度，查看自适应刻度。同一套语义样式支持浅色和深色主题。',
  width: '预览宽度',
  renderer: '渲染方式',
  edgeCases: '负值、零和缺失值',
  edgeDescription: '零是有效数据。缺失值让路径断开，正负堆叠分别从零基线延伸。',
  composition: '组合方式',
  compositionDescription:
    'Root 管理数据、格式化与系列显隐。Cartesian 组合坐标轴和系列声明，由适配层编译为 ECharts 配置。Virgo 提供 Tooltip 与图例呈现。',
  api: 'API',
  apiDescription: '从 @virgo-design/charts 导入 Chart；使用发布包时显式导入样式表。',
  part: '部件',
  props: '主要参数',
  behavior: '职责',
  accessibility: '无障碍',
  accessibilityDescription:
    '必填标题、描述、数据点名称、方向键焦点与原始数据表，让图表可独立于视觉表达被理解。减少动态效果设置会关闭绘制、变形与扇区位移动画。',
  theme: '语义样式',
  themeDescription:
    '通过 --chart-* 变量覆盖坐标轴、网格、系列颜色、Tooltip、图例、激活点与动画时长，无需复制图形实现。Classic 浅色与深色默认值消费 Virgo tokens。',
  basics: '图表类型',
  basicsDescription:
    '各种图形共用比例尺、格式化、主题和交互。饼图与环形图的激活扇区向外悬浮，并显示阴影和 Tooltip。',
  total: '总计',
  alpha: '设计',
  beta: '工程',
  gamma: '研究',
} satisfies LocaleOf<typeof chartsEnUS>;

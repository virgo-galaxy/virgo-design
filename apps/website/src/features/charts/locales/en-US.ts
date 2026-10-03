export const chartsEnUS = {
  title: 'Charts',
  description:
    'Data visualization components built with React and Apache ECharts, with consistent semantic themes, interaction feedback and animation.',
  created: 'Created',
  completed: 'Completed',
  planned: 'Planned',
  update: 'Update data',
  reset: 'Reset',
  data: 'View underlying data',
  empty: 'No chart data',
  line: 'Line',
  area: 'Area',
  bar: 'Bar',
  grouped: 'Grouped Bar',
  stacked: 'Stacked Bar',
  pie: 'Pie',
  donut: 'Donut',
  labelLine: 'Label lines',
  engine: 'Engine & Advanced Usage',
  engineDescription: 'Virgo Charts is powered by Apache ECharts.',
  engineBoundary:
    'ECharts handles rendering, axes, geometry, animation and interaction. Virgo provides the React API, semantic themes, formatting and accessibility conventions. Sparkline uses lightweight native SVG.',
  rendererDescription:
    'SVG is the default renderer. Set renderer="canvas" on Root or Responsive for large datasets or canvas-specific scenarios.',
  declarative: 'A. Virgo declarative API',
  advanced: 'B. Native EChartsOption',
  advancedDescription:
    'The separate entry supports Radar, Gauge, Scatter, Heatmap, Sankey, Treemap, Funnel, Candlestick, Graph, Geo and DataZoom. The full runtime loads only when advanced usage is requested.',
  loadingAdvanced: 'Loading advanced examples…',
  radar: 'Radar',
  heatmap: 'Calendar heatmap',
  activity: 'Activity',
  quality: 'Quality',
  sparkline: 'Sparkline',
  interactions: 'Interaction and motion',
  interactionDescription:
    'Hover or focus a position to inspect all visible series. Arrow keys move across points. Legend buttons toggle series. Update the values to see smooth geometry transitions.',
  responsive: 'Responsive and theme',
  responsiveDescription:
    'Resize the container to check adaptive ticks. The same semantic contract supports light and dark.',
  width: 'Preview width',
  renderer: 'Renderer',
  edgeCases: 'Negative, zero and missing values',
  edgeDescription:
    'Zero is data. Missing values break paths; positive and negative stacks grow separately from the baseline.',
  composition: 'Composition',
  compositionDescription:
    'Root owns data, formatters and visibility. Cartesian groups axis and series declarations; the adapter compiles them into ECharts options. Virgo provides tooltip and legend presentation.',
  api: 'API',
  apiDescription:
    'Import Chart from @virgo-design/charts and the explicit stylesheet when consuming the published package.',
  part: 'Part',
  props: 'Main props',
  behavior: 'Responsibility',
  accessibility: 'Accessibility',
  accessibilityDescription:
    'A required title, description, named points, roving keyboard focus and a native data disclosure expose the chart independently of its picture. Reduced motion disables drawing, morphing and sector movement transitions.',
  theme: 'Semantic styling',
  themeDescription:
    'Override --chart-* variables without copying geometry: axis, grid, series palette, tooltip, legend, active point and motion duration. Classic light/dark values inherit Virgo tokens.',
  basics: 'Chart families',
  basicsDescription:
    'The primitive shapes share scales, formatters, theme and interaction. Pie and Donut lift the active sector outward, with a shadow and tooltip.',
  total: 'Total',
  alpha: 'Design',
  beta: 'Engineering',
  gamma: 'Research',
} as const;

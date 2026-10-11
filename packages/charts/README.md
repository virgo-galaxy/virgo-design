# @virgo-design/charts

Virgo Charts provides a compound React API, semantic theme contract, formatting and
accessibility conventions over Apache ECharts 6.1.0. React 18+ is supported.

```tsx
import { Chart } from '@virgo-design/charts';
import '@virgo-design/tokens/styles.css';
import '@virgo-design/charts/styles.css';

<Chart.Root data={data} title="Delivery" locale="en-US" renderer="svg" showData>
  <Chart.Responsive height={280}>
    <Chart.Cartesian>
      <Chart.Grid />
      <Chart.XAxis dataKey="date" type="time" />
      <Chart.YAxis />
      <Chart.Area dataKey="created" name="Created" curve="smooth" />
      <Chart.Line dataKey="completed" name="Completed" marker="muted" />
      <Chart.Tooltip />
      <Chart.Legend />
    </Chart.Cartesian>
  </Chart.Responsive>
</Chart.Root>;
```

## Architecture and ownership

Virgo API → Theme / Tokens / React → ECharts adapter → Apache ECharts engine.

- `Chart.tsx`: public compound API, series declarations, native legend and data table.
- `engine/compiler.ts`: declarations → EChartsOption. No scales, ticks or chart geometry.
- `engine/core.ts`: registers Line/Bar/Pie, Grid/Tooltip/Legend/Dataset/Transform,
  LabelLayout/UniversalTransition and SVG/Canvas renderers through `echarts/core`.
- `engine/runtime.ts`: init, setOption diff, ResizeObserver, renderer replacement and disposal.
- `engine/theme.ts`: resolves the consumer's CSS variables into the engine-neutral theme contract.
- `engine/advanced-theme.ts`: semantic defaults for full ECharts options, preserving consumer overrides.
- `native/`: lightweight SVG Sparkline geometry; no ECharts or GSAP imports.

ECharts owns rendering, scales, axes, geometry, stacking, animation and chart interaction.
Virgo owns React composition, presets, theme adaptation, tooltip/legend presentation,
formatting, loading/empty behavior, accessibility conventions and application integration.
No `echarts-for-react` dependency or page-owned ECharts themes are used.

## Public API

| Part            | Main props                                                                                | Behavior                                                           |
| --------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Root            | data, title, description, locale, theme, renderer, height, margins, animated, interactive | Named figure, formatting, visibility and theme inheritance         |
| Root formatters | labelFormatter, valueFormatter, missingLabel                                              | Tooltip, axes, accessible point names and data table               |
| Root data       | showData, dataTableLabel, empty                                                           | Native table disclosure and consumer-owned empty content           |
| Responsive      | height, renderer                                                                          | Inherited height/renderer; runtime observes container size         |
| Cartesian       | height, className                                                                         | ECharts Cartesian coordinate system                                |
| Grid            | vertical                                                                                  | Horizontal grid; optional vertical grid                            |
| XAxis           | dataKey, type, tickFormatter, tickCount, hidden                                           | category / time / linear, adaptive labels                          |
| YAxis           | domain, tickFormatter, tickCount, hidden                                                  | Automatic zero-aware domain or explicit limits                     |
| Line / Area     | dataKey, name, color, curve, marker                                                       | line series; Area adds areaStyle                                   |
| Bar             | dataKey, name, color, stackId, maxWidth                                                   | Grouped bars; same stackId creates diverging stacks                |
| Pie / Donut     | dataKey, nameKey, innerRadius, colors, center, showLabels, labelLine                      | Pie series; proportional 0–1 or pixel inner radius                 |
| Tooltip         | crosshair, className                                                                      | Shared x and visible series, safe Virgo HTML card                  |
| Legend          | toggleLabel, className                                                                    | Native buttons with aria-pressed; updates ECharts legend selection |
| Sparkline       | data, title, dataKey, xKey, color, area, height                                           | Native SVG micro visualization                                     |

`curve="linear"` is the default and connects points with straight segments.
`curve="smooth"` uses the engine's smooth interpolation. Markers can be visible,
muted or active-only (`none`); focused/hovered points are emphasized.

Values must be finite numbers. Null/undefined/NaN break line/area paths and omit bars;
zero remains valid data. Pie treats negative/missing values as zero. Time x values
may be Date or ISO strings. Series retain stable IDs for ECharts updates.

```tsx
<Chart.Pie dataKey="value" nameKey="name" showLabels labelLine />
<Chart.Donut dataKey="value" nameKey="name" showLabels labelLine={false} />
```

Pie/Donut display percentage labels and leader lines by default. `labelLine={false}`
hides only lines; `showLabels={false}` hides both. ECharts handles label layout.

Bar width adapts to the plot width and category count. Use `maxWidth={16}` on
`Chart.Bar` to keep time-series bars slim; all series in a stack should use the same
maximum. The default maximum is 80px.

## React runtime, motion and interaction

Normal charts load the modular engine when first visible, and animate line/area entry.
Updates use setOption with stable series IDs; ECharts performs diff and transitions.
Renderer changes dispose and recreate the instance; data/theme changes preserve it.
ResizeObserver handles container changes, with a window resize fallback. Effect cleanup
removes listeners, observers and pending frames and disposes the instance.

SVG is the default. Set `renderer="canvas"` on Root or Responsive for large datasets
or canvas-specific scenarios. This changes rendering only; consumer APIs remain the same.

Pointer inspection uses ECharts axis pointers and emphasized symbols/bars. Tooltip cards
track movement with zero position-transition delay and show all visible series, including
missing-value placeholders. Pie/Donut hover or focus selects the sector with an outward
offset and shadow. Reduced-motion changes are observed live and disable engine animation;
`animated={false}` also disables it. Native Sparkline entry animation respects the same preference.

Virgo exposes a keyboard inspection layer for both renderers. Left/Right (and Up/Down),
Home/End move between points; Escape clears inspection. Native legend buttons and the
optional data table remain keyboard accessible. Supply localized title/description,
formatters, empty content, dataTableLabel and toggleLabel in the consuming app.

Set `interactive={false}` on Root or Sparkline for static KPI summaries. It disables
pointer emphasis, tooltips, sector selection, keyboard inspection and legend toggling;
legend labels remain visible as plain text. Pair it with `animated={false}` for an
entirely still chart. The visualization remains data-driven and accessible by its
figure title/description. `YAxis hidden` and `XAxis hidden` remove axes in micro charts.

## Semantic theme contract

Theme values resolve from computed CSS, including nested token references. Theme/class/style
changes on the chart and its ancestors refresh ECharts options without replacing the instance.
All six official themes (virgo, minimal, soft, glass, retro and contrast) implement the same
contract in Light and Dark. Component and product verification is recorded in
[the Theme Contract audit](../../docs/reviews/theme-contract-audit.md).

`--chart-background`, `--chart-axis`, `--chart-axis-label`, `--chart-grid`,
`--chart-series-1` … `--chart-series-12`, `--chart-line-width`,
`--chart-tooltip-surface`, `--chart-tooltip-border`, `--chart-tooltip-radius`,
`--chart-tooltip-shadow`, `--chart-tooltip-backdrop-filter`, `--chart-legend`, `--chart-active-point`,
`--chart-muted-opacity`, `--chart-enter-duration`, `--chart-update-duration`,
`--chart-interaction-duration`, `--chart-sector-offset`, `--chart-point-radius`,
`--chart-active-point-radius`, `--chart-area-opacity`, `--chart-area-end-opacity` and
`--chart-focus-dasharray`. Native SVG Sparkline consumes these area/focus roles plus
semantic focus color/width; Contrast uses a solid focus stroke. Reduced-motion behavior is retained.

The complete data contract is categorical 1–12, sequential 1–10 and seven diverging
roles (negative strong/default/subtle, neutral, positive subtle/default/strong).
Ordinary series and advanced radar use the categorical palette. Non-heatmap advanced
visualMap defaults use the sequential palette; explicit diverging palettes remain consumer choices.
Formal `var(--vd-data-*)` and `var(--chart-series-*)` colors in the advanced option resolve
from the active scope before reaching ECharts. Literal colors and explicit options retain priority.

Advanced heatmaps use `--chart-heatmap-empty` and `--chart-heatmap-1` …
`--chart-heatmap-4` for neutral cells and sequential activity intensity. These
resolve through the same theme contract; explicit ECharts visualMap colors still win.
The four intensity levels use semantic sequential colors in both appearances.
`--chart-heatmap-radius` and `--chart-heatmap-border-width` inherit theme geometry
and stroke width; heatmap cell and hover borders use grid and axis colors.
Explicit series styles still override these defaults. Resolved CSS `color(srgb ...)`
values are converted to RGB syntax for compatibility with the ECharts color parser.

## Advanced ECharts entry

```tsx
import { EChartsChart } from '@virgo-design/charts/echarts';
import type { EChartsOption } from '@virgo-design/charts/echarts';

const option: EChartsOption = {
  radar: {
    indicator: [
      { name: 'Design', max: 100 },
      { name: 'Engineering', max: 100 },
      { name: 'Research', max: 100 },
    ],
  },
  series: [{ type: 'radar', data: [{ value: [82, 64, 75] }] }],
};
<EChartsChart option={option} aria-label="Team profile" renderer="svg" height={280} />;
```

This separate entry imports full ECharts capabilities: Radar, Gauge, Scatter, Heatmap,
Sankey, Treemap, Funnel, Candlestick, Graph, Geo, DataZoom and other native components.
Geo still requires map data registered with registerMap from this entry. registerTheme,
getMap, connect and disconnect are also exposed for advanced integration. The wrapper
accepts complete EChartsOption plus renderer/height/theme/animated and `onReady(instance)`.
onReady may return a cleanup callback. Advanced options receive semantic defaults;
explicit consumer styles are preserved. Reduced motion takes precedence over animation.
Advanced interactions/accessible descriptions remain consumer-owned through option/onReady.

Ordinary Chart code never imports the full entry. The independent micro entry is also available:

```tsx
import { Sparkline } from '@virgo-design/charts/sparkline';
```

## Delivery

ESM, declarations, source maps and explicit `styles.css` are published. React, ReactDOM,
ECharts and zrender are external in the package build. Import token CSS and charts CSS
when consuming the built package; workspace source aliases import SCSS automatically.
Bundled consumers load the modular engine in a separate chunk; Sparkline does not request it.
The advanced entry has a larger runtime and should be loaded only where needed.

## Token architecture

Categorical 12 / sequential 10 / diverging 7 belong to Semantic data roles; chart geometry/material/interaction/Sparkline belong to the Component contract. Normal Virgo Charts, advanced ECharts and native Sparkline retain the same CSS-to-engine presentation source. Explicit option/style values stay consumer-owned. Layering, contract version and consumer adapters are defined in [Token architecture](../../docs/architecture/token-system.md).

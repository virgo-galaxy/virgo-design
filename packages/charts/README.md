# @virgo-design/charts

React charts backed by Apache ECharts, plus a standalone SVG Sparkline. Charts use
Virgo's token/theme contract for presentation.

## Installation

Requires React and ReactDOM 18 or later in the consuming application. To use the official themes:

```sh
pnpm add @virgo-design/charts @virgo-design/tokens @virgo-design/themes
```

## Usage

```tsx
import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css';
import '@virgo-design/charts/styles.css';
import { Chart } from '@virgo-design/charts';

export function Example() {
  return (
    <div data-virgo-theme="virgo" data-theme="light">
      <Chart.Root data={[{ day: 'Mon', visits: 12 }]} title="Visits">
        <Chart.Responsive height={240}>
          <Chart.Cartesian>
            <Chart.XAxis dataKey="day" />
            <Chart.YAxis />
            <Chart.Line dataKey="visits" name="Visits" />
            <Chart.Tooltip />
          </Chart.Cartesian>
        </Chart.Responsive>
      </Chart.Root>
    </div>
  );
}
```

Load styles once in this order: Tokens, Themes, Charts, then application styles. The example uses
a local Virgo/light scope. Applications can also inherit theme attributes from the document root.

## Package exports

- `@virgo-design/charts`: compound `Chart` API and public types.
- `/echarts`: `EChartsChart` and full ECharts options for advanced charts.
- `/sparkline`: standalone `Sparkline` without the ECharts runtime.
- `/styles.css`: compiled chart styles.

Applications provide data, localized labels, formatters and theme initialization. The
`/sparkline` entry renders SVG without loading the ECharts runtime.

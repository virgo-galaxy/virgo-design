# @virgo-design/charts

React charts backed by Apache ECharts, plus a standalone SVG Sparkline. Charts use
Virgo's token/theme contract for presentation.

## Usage

```tsx
import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css';
import '@virgo-design/charts/styles.css';
import { Chart } from '@virgo-design/charts';

export function Example() {
  return (
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
  );
}
```

## Entries

- `@virgo-design/charts`: compound `Chart` API and public types.
- `/echarts`: `EChartsChart` and full ECharts options for advanced charts.
- `/sparkline`: standalone `Sparkline` without the ECharts runtime.
- `/styles.css`: compiled chart styles.

Requires React and ReactDOM 18 or later. Applications own data, localized labels and
theme initialization. Detailed APIs and examples live in the Website.

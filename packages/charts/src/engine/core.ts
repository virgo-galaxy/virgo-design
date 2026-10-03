import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import { init as createChart, use as registerECharts } from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';

let registered = false;
export function init(...args: Parameters<typeof createChart>) {
  if (!registered) {
    registerECharts([
      LineChart,
      BarChart,
      PieChart,
      GridComponent,
      TooltipComponent,
      LegendComponent,
      DatasetComponent,
      TransformComponent,
      LabelLayout,
      UniversalTransition,
      SVGRenderer,
      CanvasRenderer,
    ]);
    registered = true;
  }
  return createChart(...args);
}

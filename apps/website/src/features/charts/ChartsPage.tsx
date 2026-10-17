import { Chart } from '@virgo-design/charts';
import { Button, Slider, Surface } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import { DocumentationCatalogue } from '@/components/docs/DocumentationCatalogue';

import styles from './ChartsPage.module.scss';
import { AdvancedPreview } from './components/AdvancedPreview';
import { CartesianExample } from './components/CartesianExample';

const initial = [
  { date: '2026-09-25', created: 12, completed: 8 },
  { date: '2026-09-26', created: 18, completed: 14 },
  { date: '2026-09-27', created: 15, completed: 16 },
  { date: '2026-09-28', created: 23, completed: 18 },
  { date: '2026-09-29', created: 17, completed: 21 },
  { date: '2026-09-30', created: 29, completed: 24 },
  { date: '2026-10-01', created: 25, completed: 28 },
];
const edge = [
  { date: 'A', created: 6, completed: -3 },
  { date: 'B', created: 0, completed: 4 },
  { date: 'C', created: null, completed: -5 },
  { date: 'D', created: -2, completed: 3 },
  { date: 'E', created: 7, completed: 2 },
];

const code = `import { Chart } from '@virgo-design/charts';
import '@virgo-design/charts/styles.css';

<Chart.Root data={data} title="Delivery" locale="en-US" showData>
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
</Chart.Root>`;

const api = [
  [
    'Root',
    'data, title, description, locale, theme, renderer, height, margins, animated, interactive, showData, empty, labelFormatter, valueFormatter, missingLabel, dataTableLabel',
    'Data / formatters / visibility',
  ],
  ['Responsive', 'height, renderer', 'ResizeObserver'],
  ['Cartesian', 'height', 'Scales / active x'],
  ['Grid', 'vertical', 'Ticks / zero baseline'],
  ['XAxis', 'dataKey, type, tickFormatter, tickCount, hidden', 'category / time / linear'],
  ['YAxis', 'domain, tickFormatter, tickCount, hidden', 'Linear domain'],
  ['Line / Area', 'dataKey, name, color, curve, marker', 'Paths / points / synchronized reveal'],
  ['Bar', 'dataKey, name, color, stackId, maxWidth', 'Grouped / diverging stacks'],
  [
    'Pie / Donut',
    'dataKey, nameKey, innerRadius, colors, center, showLabels, labelLine',
    'Sectors / active lift',
  ],
  ['Tooltip', 'crosshair', 'Shared x / multiple series'],
  ['Legend', 'toggleLabel', 'Visibility toggles'],
  ['Sparkline', 'data, title, dataKey, xKey, area, color', 'Compact trends'],
];

export function ChartsPage() {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState(initial);
  const [width, setWidth] = useState(100);
  const [labelLine, setLabelLine] = useState(true);
  const [renderer, setRenderer] = useState<'svg' | 'canvas'>('svg');

  const pieData = [
    { name: t('charts.alpha'), value: 36 },
    { name: t('charts.beta'), value: 48 },
    { name: t('charts.gamma'), value: 16 },
  ];
  return (
    <DocumentationCatalogue
      pageId="charts"
      eyebrow="@virgo-design/charts"
      title={t('charts.title')}
      description={t('charts.description')}
    >
      <div className={styles.sections}>
        <ArticleSection
          id="chart-interaction"
          index="01"
          title={t('charts.interactions')}
          description={t('charts.interactionDescription')}
        >
          <Button.Group layout="custom" className={styles.toolbar}>
            <Button
              size="small"
              onClick={() =>
                setData((previous) =>
                  previous.map((row, index) => ({
                    ...row,
                    created: row.created + (index % 2 ? 5 : -3),
                    completed: row.completed + (index % 2 ? -2 : 4),
                  })),
                )
              }
            >
              {t('charts.update')}
            </Button>
            <Button size="small" variant="outline" onClick={() => setData(initial)}>
              {t('charts.reset')}
            </Button>
          </Button.Group>
          <Surface border="default" radius={8} className={styles.preview}>
            <CartesianExample kind="area" data={data} />
          </Surface>
        </ArticleSection>
        <ArticleSection
          id="chart-families"
          index="02"
          title={t('charts.basics')}
          description={t('charts.basicsDescription')}
        >
          <Button.Group layout="custom" className={styles.toolbar}>
            <Button
              size="small"
              variant="outline"
              aria-pressed={labelLine}
              onClick={() => setLabelLine((value) => !value)}
            >
              {t('charts.labelLine')}
            </Button>
          </Button.Group>
          <div className={styles.grid}>
            {(['line', 'area', 'bar', 'grouped', 'stacked'] as const).map((kind) => (
              <Surface key={kind} border="default" radius={8} className={styles.preview}>
                <h3>{t(`charts.${kind}`)}</h3>
                <CartesianExample kind={kind} data={data} />
              </Surface>
            ))}
            {(['pie', 'donut'] as const).map((kind) => (
              <Surface key={kind} border="default" radius={8} className={styles.preview}>
                <h3>{t(`charts.${kind}`)}</h3>
                <Chart.Root
                  data={pieData}
                  title={t(`charts.${kind}`)}
                  locale={i18n.language}
                  showData
                  dataTableLabel={t('charts.data')}
                >
                  {kind === 'pie' ? (
                    <Chart.Pie dataKey="value" nameKey="name" labelLine={labelLine}>
                      <Chart.Tooltip />
                      <Chart.Legend />
                    </Chart.Pie>
                  ) : (
                    <Chart.Donut
                      labelLine={labelLine}
                      dataKey="value"
                      nameKey="name"
                      center={
                        <>
                          <span>{t('charts.total')}</span>
                          <strong>100</strong>
                        </>
                      }
                    >
                      <Chart.Tooltip />
                      <Chart.Legend />
                    </Chart.Donut>
                  )}
                </Chart.Root>
              </Surface>
            ))}
          </div>
          <Surface className={styles.preview} border="default" radius={8}>
            <h3>{t('charts.sparkline')}</h3>
            <Chart.Sparkline
              data={data}
              title={t('charts.sparkline')}
              dataKey="completed"
              xKey="date"
              area
              height={64}
            />
          </Surface>
          <AdvancedPreview />
        </ArticleSection>
        <ArticleSection
          id="chart-themes"
          index="03"
          title={t('charts.responsive')}
          description={t('charts.responsiveDescription')}
        >
          <Button.Group layout="custom" className={styles.toolbar}>
            <Button
              size="small"
              variant="outline"
              onClick={() => setRenderer((current) => (current === 'svg' ? 'canvas' : 'svg'))}
            >
              {t('charts.renderer')}: {renderer.toUpperCase()}
            </Button>
          </Button.Group>
          <label className={styles.range}>
            <span>{t('charts.width')}</span>
            <Slider
              className={styles.widthSlider}
              aria-label={t('charts.width')}
              min={30}
              max={100}
              value={width}
              onValueChange={setWidth}
            />
          </label>
          <Surface
            style={{ width: `${width}%` }}
            border="default"
            radius={8}
            className={styles.preview}
          >
            <CartesianExample kind="line" data={data} renderer={renderer} />
          </Surface>
        </ArticleSection>
        <ArticleSection
          id="chart-edge-data"
          index="04"
          title={t('charts.edgeCases')}
          description={t('charts.edgeDescription')}
        >
          <div className={styles.grid}>
            <CartesianExample kind="area" data={edge} />
            <CartesianExample kind="stacked" data={edge} />
          </div>
        </ArticleSection>
        <ArticleSection
          id="chart-composition"
          index="05"
          title={t('charts.composition')}
          description={t('charts.compositionDescription')}
        >
          <pre className={styles.code}>
            <code>{code}</code>
          </pre>
        </ArticleSection>
        <ArticleSection
          id="chart-api"
          index="06"
          title={t('charts.api')}
          description={t('charts.apiDescription')}
        >
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th>{t('charts.part')}</th>
                  <th>{t('charts.props')}</th>
                  <th>{t('charts.behavior')}</th>
                </tr>
              </thead>
              <tbody>
                {api.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td key={i}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ArticleSection>
        <ArticleSection
          id="chart-style"
          index="07"
          title={t('charts.theme')}
          description={t('charts.themeDescription')}
        >
          <pre className={styles.code}>
            <code>
              {`--chart-background\n--chart-axis / --chart-axis-label / --chart-grid\n--chart-series-1 … --chart-series-6\n--chart-line-width\n--chart-tooltip-surface / --chart-tooltip-border / --chart-tooltip-radius\n--chart-tooltip-shadow / --chart-legend / --chart-active-point\n--chart-muted-opacity / --chart-enter-duration / --chart-update-duration
--chart-interaction-duration / --chart-sector-offset
--chart-point-radius / --chart-active-point-radius`}
            </code>
          </pre>
        </ArticleSection>
        <ArticleSection
          id="chart-accessibility"
          index="08"
          title={t('charts.accessibility')}
          description={t('charts.accessibilityDescription')}
        >
          <p>
            <code>← / → · Home / End · Escape · prefers-reduced-motion</code>
          </p>
        </ArticleSection>
        <ArticleSection
          id="chart-engine"
          index="09"
          title={t('charts.engine')}
          description={t('charts.engineDescription')}
        >
          <p>{t('charts.engineBoundary')}</p>
          <p>{t('charts.rendererDescription')}</p>
          <h3>{t('charts.declarative')}</h3>
          <pre className={styles.code}>
            <code>{`<Chart.Root data={data} title="Delivery" renderer="svg">
  <Chart.Cartesian>
    <Chart.XAxis dataKey="date" />
    <Chart.Line dataKey="value" curve="linear" />
    <Chart.Tooltip />
  </Chart.Cartesian>
</Chart.Root>`}</code>
          </pre>
          <h3>{t('charts.advanced')}</h3>
          <pre className={styles.code}>
            <code>{`import { EChartsChart } from '@virgo-design/charts/echarts';
import type { EChartsOption } from '@virgo-design/charts/echarts';

const option: EChartsOption = {
  radar: { indicator: [{ name: 'Design', max: 100 }, { name: 'Engineering', max: 100 }, { name: 'Research', max: 100 }] },
  series: [{ type: 'radar', data: [{ value: [82, 64, 75] }] }],
};
<EChartsChart option={option} renderer="svg" aria-label="Group details" />;`}</code>
          </pre>
          <p>{t('charts.advancedDescription')}</p>
        </ArticleSection>
      </div>
    </DocumentationCatalogue>
  );
}

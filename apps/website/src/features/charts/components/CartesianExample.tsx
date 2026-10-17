import { Chart } from '@virgo-design/charts';
import { useTranslation } from 'react-i18next';

type CartesianExampleProps = {
  kind: 'line' | 'area' | 'bar' | 'grouped' | 'stacked';
  data: readonly object[];
  renderer?: 'svg' | 'canvas';
};

export function CartesianExample({ kind, data, renderer = 'svg' }: CartesianExampleProps) {
  const { t, i18n } = useTranslation();
  const labels = { created: t('charts.created'), completed: t('charts.completed') };

  return (
    <Chart.Root
      data={data}
      title={t(`charts.${kind}`)}
      locale={i18n.language}
      renderer={renderer}
      empty={t('charts.empty')}
      showData
      dataTableLabel={t('charts.data')}
    >
      <Chart.Cartesian>
        <Chart.Grid />
        <Chart.XAxis dataKey="date" />
        <Chart.YAxis />
        {kind === 'line' ? (
          <Chart.Line dataKey="created" name={labels.created} marker="muted" curve="linear" />
        ) : kind === 'area' ? (
          <Chart.Area dataKey="created" name={labels.created} curve="smooth" />
        ) : (
          <Chart.Bar
            dataKey="created"
            name={labels.created}
            {...(kind === 'stacked' ? { stackId: 'total' } : {})}
          />
        )}{' '}
        {kind === 'line' || kind === 'area' ? (
          <Chart.Line
            dataKey="completed"
            name={labels.completed}
            curve={kind === 'line' ? 'linear' : 'smooth'}
          />
        ) : kind !== 'bar' ? (
          <Chart.Bar
            dataKey="completed"
            name={labels.completed}
            {...(kind === 'stacked' ? { stackId: 'total' } : {})}
          />
        ) : null}
        <Chart.Tooltip />
        <Chart.Legend />
      </Chart.Cartesian>
    </Chart.Root>
  );
}

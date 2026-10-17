import type { EChartsOption } from '@virgo-design/charts/echarts';
import { EChartsChart } from '@virgo-design/charts/echarts';
import { Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './ChartsPage.module.scss';
import { CalendarHeatmap } from './components/CalendarHeatmap';

export default function AdvancedExamples() {
  const { t } = useTranslation();
  const radar: EChartsOption = {
    tooltip: {},
    radar: {
      indicator: (['alpha', 'beta', 'gamma', 'quality'] as const).map((key) => ({
        name: t(`charts.${key}`),
        max: 100,
      })),
    },
    series: [
      {
        type: 'radar',
        areaStyle: { opacity: 0.18 },
        data: [{ name: t('charts.radar'), value: [82, 64, 75, 92] }],
      },
    ],
  };

  return (
    <div className={styles.grid}>
      <Surface border="default" radius={8} className={styles.preview}>
        <h3>{t('charts.radar')}</h3>
        <EChartsChart option={radar} aria-label={t('charts.radar')} height={280} />
      </Surface>
      <CalendarHeatmap />
    </div>
  );
}

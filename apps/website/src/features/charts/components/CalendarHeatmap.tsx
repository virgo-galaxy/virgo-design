import { EChartsChart, type EChartsOption } from '@virgo-design/charts/echarts';
import { Surface } from '@virgo-design/ui';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../ChartsPage.module.scss';

function activityCount(index: number) {
  if (index >= 278 && index < 370) {
    const seed = (Math.imul(index + 91, 2654435761) >>> 16) % 101;

    return seed < 20 ? 0 : Math.round(((seed - 20) / 80) ** 2 * 100);
  }

  return index === 131 || index === 158 ? 4 : 0;
}

function activityLevel(count: number) {
  if (count === 0) return 0;
  if (count < 15) return 1;
  if (count < 40) return 2;
  if (count < 70) return 3;

  return 4;
}

const activityData = Array.from({ length: 371 }, (_, index) => {
  const date = new Date(Date.UTC(2025, 9, index + 27));
  const count = activityCount(index);

  return [date.toISOString().slice(0, 10), activityLevel(count), count];
});

export function CalendarHeatmap() {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1140);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;

    const measure = () => {
      setWidth(element.clientWidth || 1140);
      // Keep the most recent activity visible when the year needs local scrolling.
      if (element.parentElement) element.parentElement.scrollLeft = element.scrollWidth;
    };

    measure();

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(element);
    if (!observer) window.addEventListener('resize', measure);

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const cell = (width - 8) / 53;
  const dateFormat = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const numberFormat = new Intl.NumberFormat(i18n.language);
  const heatmap: EChartsOption = {
    tooltip: {
      confine: true,
      transitionDuration: 0,
      formatter: (params) => {
        const item = Array.isArray(params) ? params[0] : params;
        const value = item?.value as [string, number, number] | undefined;

        return value
          ? `${dateFormat.format(new Date(`${value[0]}T00:00:00Z`))}<br />${t('charts.activity')}: ${numberFormat.format(value[2])}`
          : '';
      },
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 1,
      pieces: [0, 1, 2, 3, 4].map((value) => ({ value })),
    },
    calendar: {
      range: ['2025-10-27', '2026-11-01'],
      cellSize: [cell, cell],
      top: 8,
      left: 4,
      splitLine: { show: false },
      yearLabel: { show: false },
      dayLabel: { show: false, firstDay: 1 },
      monthLabel: {
        position: 'end',
        align: 'left',
        fontSize: 14,
        margin: 16,
        nameMap: i18n.language.startsWith('zh') ? 'ZH' : 'EN',
        formatter: (params) =>
          (String(params.yyyy) === '2025' && Number(params.M) === 10) ||
          (String(params.yyyy) === '2026' && Number(params.M) === 11)
            ? ''
            : i18n.language.startsWith('zh')
              ? `${params.M}月`
              : params.nameMap,
      },
      itemStyle: { borderWidth: 4, color: 'transparent', borderColor: 'transparent' },
    },
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        name: t('charts.activity'),
        encode: { value: 1, tooltip: 2 },
        data: activityData,
      },
    ],
  };

  return (
    <Surface
      border="default"
      radius={8}
      className={[styles.preview, styles.heatmapPreview].join(' ')}
    >
      <h3>{t('charts.heatmap')}</h3>
      <div
        className={styles.heatmapScroll}
        tabIndex={0}
        role="region"
        aria-label={t('charts.heatmap')}
      >
        <div ref={ref} className={styles.heatmapCanvas}>
          <EChartsChart
            option={heatmap}
            aria-label={t('charts.heatmap')}
            height={Math.ceil(cell * 7 + 56)}
          />
        </div>
      </div>
    </Surface>
  );
}

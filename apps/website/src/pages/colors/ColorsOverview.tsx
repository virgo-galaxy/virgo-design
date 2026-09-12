import {
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_BASES,
  VIRGO_NEUTRAL_SCALE,
} from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import { FoundationPage } from '@/pages/foundations/FoundationPage';

import styles from './colors-overview.module.scss';

const chromaticColors = Object.values(VIRGO_CHROMATIC_BASES);
const brandColors = Object.values(VIRGO_BRAND_SCALE);
const neutralColors = Object.values(VIRGO_NEUTRAL_SCALE);

const overviewPreviews = {
  total: Array.from({ length: 9 }, () => '#5b9cff'),
  chromatic: ['#f2383d', '#f2542d', '#f58220', '#8bcf22', '#2b7eea'],
  brand: [VIRGO_BRAND_SCALE[6]],
  neutral: [
    VIRGO_NEUTRAL_SCALE[2],
    VIRGO_NEUTRAL_SCALE[3],
    VIRGO_NEUTRAL_SCALE[5],
    VIRGO_NEUTRAL_SCALE[8],
  ],
} as const;

export function ColorsOverview() {
  const { t } = useTranslation();

  const metrics = [
    {
      value: chromaticColors.length * 10 + brandColors.length + neutralColors.length,
      label: t('foundationPages.colors.foundationColors'),
      kind: 'total',
      colors: overviewPreviews.total,
    },
    {
      value: chromaticColors.length,
      label: t('foundationPages.colors.chromaticFamilies'),
      kind: 'chromatic',
      colors: overviewPreviews.chromatic,
    },
    {
      value: 1,
      label: t('foundationPages.colors.brandScale'),
      kind: 'brand',
      colors: overviewPreviews.brand,
    },
    {
      value: 1,
      label: t('foundationPages.colors.neutralScale'),
      kind: 'neutral',
      colors: overviewPreviews.neutral,
    },
  ];

  const journey = [
    {
      number: '01',
      title: t('foundationPages.colors.journey.create'),
      description: t('foundationPages.colors.journey.createDescription'),
      target: 'color-studio',
    },
    {
      number: '02',
      title: t('foundationPages.colors.journey.explore'),
      description: t('foundationPages.colors.journey.exploreDescription'),
      target: 'palette-gallery',
    },
    {
      number: '03',
      title: t('foundationPages.colors.journey.export'),
      description: t('foundationPages.colors.journey.exportDescription'),
      target: 'theme-builder',
    },
  ];

  const scrollTo = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <FoundationPage
      id="colors-overview"
      className={styles.overview ?? ''}
      title={t('foundationPages.colors.title')}
      description={t('foundationPages.colors.description')}
    >
      <div className={styles.metricGrid}>
        {metrics.map((metric) => (
          <article key={metric.label} className={styles.metricCard}>
            <div className={styles.colorPreview} data-kind={metric.kind} aria-hidden="true">
              {metric.colors.map((color, index) => (
                <i key={`${color}-${index}`} style={{ backgroundColor: color }} />
              ))}
            </div>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </div>

      <div className={styles.journeyBlock}>
        <div className={styles.journeyRail}>
          {journey.map((step) => (
            <button
              key={step.number}
              className={styles.journeyStep}
              type="button"
              onClick={() => scrollTo(step.target)}
            >
              <strong>
                {step.number} · {step.title}
              </strong>
              <span>{step.description}</span>
            </button>
          ))}
        </div>

        <div className={styles.journeyCopy}>
          <p>{t('foundationPages.colors.journey.summary')}</p>
          <p>{t('foundationPages.colors.journey.detail')}</p>
        </div>
      </div>
    </FoundationPage>
  );
}

import {
  VIRGO_BRAND_SCALE,
  VIRGO_CHROMATIC_BASES,
  VIRGO_NEUTRAL_SCALE,
} from '@virgo-design/tokens';
import { Steps, Surface } from '@virgo-design/ui';
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
      label: t('foundations.colors.foundationColors'),
      kind: 'total',
      colors: overviewPreviews.total,
    },
    {
      value: chromaticColors.length,
      label: t('foundations.colors.chromaticFamilies'),
      kind: 'chromatic',
      colors: overviewPreviews.chromatic,
    },
    {
      value: 1,
      label: t('foundations.colors.brandScale'),
      kind: 'brand',
      colors: overviewPreviews.brand,
    },
    {
      value: 1,
      label: t('foundations.colors.neutralScale'),
      kind: 'neutral',
      colors: overviewPreviews.neutral,
    },
  ];

  const journey = [
    {
      number: '01',
      title: t('foundations.colors.journey.create'),
      description: t('foundations.colors.journey.createDescription'),
      target: 'color-studio',
    },
    {
      number: '02',
      title: t('foundations.colors.journey.explore'),
      description: t('foundations.colors.journey.exploreDescription'),
      target: 'palette-gallery',
    },
    {
      number: '03',
      title: t('foundations.colors.journey.export'),
      description: t('foundations.colors.journey.exportDescription'),
      target: 'foundation-export',
    },
  ];

  const scrollTo = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <FoundationPage
      id="colors-overview"
      className={styles.overview ?? ''}
      title={t('foundations.colors.title')}
      description={t('foundations.colors.description')}
    >
      <div className={styles.metricGrid}>
        {metrics.map((metric) => (
          <Surface
            role="article"
            tone="default"
            border="subtle"
            key={metric.label}
            className={styles.metricCard}
          >
            <div className={styles.colorPreview} data-kind={metric.kind} aria-hidden="true">
              {metric.colors.map((color, index) => (
                <i key={`${color}-${index}`} style={{ backgroundColor: color }} />
              ))}
            </div>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </Surface>
        ))}
      </div>

      <div className={styles.journeyBlock}>
        <Steps className={styles.journeyRail}>
          {journey.map((step) => (
            <Steps.Item key={step.number}>
              <Steps.Trigger className={styles.journeyStep} onClick={() => scrollTo(step.target)}>
                <Steps.Title>
                  <strong>
                    {step.number} · {step.title}
                  </strong>
                </Steps.Title>
                <Steps.Description>{step.description}</Steps.Description>
              </Steps.Trigger>
            </Steps.Item>
          ))}
        </Steps>

        <div className={styles.journeyCopy}>
          <p>{t('foundations.colors.journey.summary')}</p>
          <p>{t('foundations.colors.journey.detail')}</p>
        </div>
      </div>
    </FoundationPage>
  );
}

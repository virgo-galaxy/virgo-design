import { duration, easing } from '@virgo-design/tokens';
import { type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './foundation-tokens.module.scss';
import { FoundationPage, FoundationSection } from './FoundationPage';

type CubicBezier = readonly [number, number, number, number];

const linearCurve: CubicBezier = [0, 0, 1, 1];
const plot = {
  left: 12,
  right: 92,
  top: 8,
  bottom: 88,
} as const;

function durationInMilliseconds(value: string) {
  return Number.parseInt(value, 10);
}

function curveFor(value: string): CubicBezier {
  if (value === 'linear') {
    return linearCurve;
  }

  const controls = value
    .slice('cubic-bezier('.length, -1)
    .split(',')
    .map((control) => Number.parseFloat(control.trim()));

  if (controls.length !== 4 || controls.some((control) => !Number.isFinite(control))) {
    return linearCurve;
  }

  return [controls[0]!, controls[1]!, controls[2]!, controls[3]!];
}

function plotX(value: number) {
  return plot.left + value * (plot.right - plot.left);
}

function plotY(value: number) {
  return plot.bottom - value * (plot.bottom - plot.top);
}

function curvePath(value: string) {
  const [x1, y1, x2, y2] = curveFor(value);

  return `M ${plot.left} ${plot.bottom} C ${plotX(x1)} ${plotY(y1)}, ${plotX(x2)} ${plotY(y2)}, ${plot.right} ${plot.top}`;
}

interface EasingCurveCardProps {
  name: string;
  value: string;
}

function EasingCurveCard({ name, value }: EasingCurveCardProps) {
  const titleId = `easing-${name}-title`;

  return (
    <article className={`${styles.easingCard} ${styles.easingRowCard}`} data-motion-easing={name}>
      <div className={styles.tokenMeta}>
        <strong>{name}</strong>
        <code>{value}</code>
      </div>
      <svg
        className={`${styles.easingChart} ${styles.easingRowChart}`}
        viewBox="0 0 100 100"
        role="img"
        aria-labelledby={titleId}
        data-motion-easing-chart={name}
      >
        <title id={titleId}>{`${name}: ${value}`}</title>
        <path className={styles.easingGridLine} d="M 12 48 H 92 M 52 8 V 88" />
        <path className={styles.easingAxis} d="M 12 8 V 88 H 92" />
        <path className={styles.easingCurve} d={curvePath(value)} data-motion-curve={name} />
        <circle className={styles.easingEndpoint} cx={plot.left} cy={plot.bottom} r="1" />
        <circle className={styles.easingEndpoint} cx={plot.right} cy={plot.top} r="1" />
        <text className={styles.easingAxisLabel} x="52" y="98" textAnchor="middle">
          time
        </text>
        <text
          className={styles.easingAxisLabel}
          x="4"
          y="48"
          textAnchor="middle"
          transform="rotate(-90 4 48)"
        >
          progress
        </text>
      </svg>
    </article>
  );
}

export function MotionPage() {
  const { t } = useTranslation();
  const maximumDuration = Math.max(...Object.values(duration).map(durationInMilliseconds));

  return (
    <FoundationPage
      title={t('foundationPages.motion.title')}
      description={t('foundationPages.motion.description')}
    >
      <FoundationSection
        title={t('foundationPages.motion.duration')}
        description={t('foundationPages.motion.durationDescription')}
      >
        <div className={styles.durationList}>
          {Object.entries(duration).map(([name, value]) => (
            <article key={name} className={styles.durationRow} data-motion-duration={name}>
              <div className={styles.compactMeta}>
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
              <div
                className={styles.durationScale}
                aria-label={`${name}: ${value}`}
                style={
                  {
                    '--duration-scale-progress': `${(durationInMilliseconds(value) / maximumDuration) * 100}%`,
                  } as CSSProperties
                }
              >
                <span className={styles.durationBar} aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>
      </FoundationSection>

      <FoundationSection
        title={t('foundationPages.motion.easing')}
        description={t('foundationPages.motion.easingDescription')}
      >
        <div className={styles.easingRowGrid}>
          {Object.entries(easing).map(([name, value]) => (
            <EasingCurveCard key={name} name={name} value={value} />
          ))}
        </div>
      </FoundationSection>

      <p className={styles.motionDisclaimer}>{t('foundationPages.motion.disclaimer')}</p>
    </FoundationPage>
  );
}

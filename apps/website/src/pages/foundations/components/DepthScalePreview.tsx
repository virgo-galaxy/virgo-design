import {
  borderStyle,
  borderWidth,
  type ElevationLevel,
  elevationLevels,
  radius,
  themes,
} from '@virgo-design/tokens';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppearance } from '@/shared/theme/use-appearance';

import styles from './depth-scale-preview.module.scss';

const layeredElevationLevels = [1, 3, 5] as const satisfies readonly ElevationLevel[];

const neutralSurfaceStyle = {
  borderWidth: borderWidth[1],
  borderStyle: borderStyle.solid,
  borderRadius: radius[12],
} satisfies CSSProperties;

interface TokenValueProps {
  level: ElevationLevel;
  value: string;
}

function TokenValue({ level, value }: TokenValueProps) {
  return (
    <figcaption className={styles.tokenValue}>
      <strong>{level}</strong>
      <code>{value}</code>
    </figcaption>
  );
}

export function DepthScalePreview() {
  const { t } = useTranslation();
  const { appearance } = useAppearance();
  const theme = themes[appearance];
  const frameStyle = {
    '--depth-preview-border-width': borderWidth[1],
    '--depth-preview-border-style': borderStyle.solid,
    '--depth-preview-radius': radius[12],
    '--depth-preview-stage-radius': radius[16],
  } as CSSProperties;

  return (
    <div className={styles.previewStack} style={frameStyle}>
      <p className={styles.disclaimer}>{t('foundations.shapeDepth.depthPreview.disclaimer')}</p>

      <section className={styles.previewGroup} aria-labelledby="depth-elevation-preview-title">
        <header className={styles.groupHeader}>
          <h3 id="depth-elevation-preview-title">
            {t('foundations.shapeDepth.depthPreview.elevation.title')}
          </h3>
          <p>{t('foundations.shapeDepth.depthPreview.elevation.description')}</p>
        </header>

        <article className={styles.comparisonCard}>
          <h4>{t('foundations.shapeDepth.depthPreview.elevation.scale')}</h4>
          <div className={styles.elevationGrid}>
            {elevationLevels.map((level) => (
              <figure
                key={level}
                className={styles.elevationSample}
                data-depth-use="elevation"
                data-depth-level={level}
              >
                <div className={styles.elevationStage}>
                  <div
                    className={styles.neutralSurface}
                    style={{ ...neutralSurfaceStyle, boxShadow: theme.elevation[level] }}
                  />
                </div>
                <TokenValue level={level} value={theme.elevation[level]} />
              </figure>
            ))}
          </div>
        </article>

        <article className={styles.comparisonCard}>
          <h4>{t('foundations.shapeDepth.depthPreview.elevation.layered')}</h4>
          <div className={styles.layeredStage}>
            {layeredElevationLevels.map((level) => (
              <div
                key={level}
                className={styles.layeredSurface}
                data-depth-use="layered-elevation"
                data-depth-level={level}
                style={{ ...neutralSurfaceStyle, boxShadow: theme.elevation[level] }}
              >
                <strong>{level}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

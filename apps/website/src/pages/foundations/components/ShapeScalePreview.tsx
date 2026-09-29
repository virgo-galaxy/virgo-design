import { borderStyle, borderWidth, radius, type RadiusToken } from '@virgo-design/tokens';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './shape-scale-preview.module.scss';

const smallRadiusTokens = [0, 4, 6, 8, 10, 12] as const satisfies readonly RadiusToken[];
const mediumRadiusTokens = [8, 12, 16, 20, 24] as const satisfies readonly RadiusToken[];

interface ShapeSampleProps {
  kind: 'width' | 'style' | 'small-radius' | 'medium-radius' | 'full-radius';
  token: string | number;
  value: string | number;
  shapeStyle: CSSProperties;
}

function ShapeSample({ kind, token, value, shapeStyle }: ShapeSampleProps) {
  return (
    <figure className={styles.sample} data-shape-use={kind} data-shape-token={token}>
      <div className={styles.stage}>
        <div className={styles.shape} style={shapeStyle} />
      </div>
      <figcaption className={styles.tokenValue}>
        <strong>{token}</strong>
        <code>{value}</code>
      </figcaption>
    </figure>
  );
}

export function ShapeScalePreview() {
  const { t } = useTranslation();
  const frameStyle = {
    '--shape-frame-width': borderWidth[1],
    '--shape-frame-style': borderStyle.solid,
    '--shape-frame-radius': radius[16],
    '--shape-stage-radius': radius[12],
  } as CSSProperties;
  const boundaryStyle = {
    borderWidth: borderWidth[1],
    borderStyle: borderStyle.solid,
    borderRadius: radius[8],
  } satisfies CSSProperties;

  return (
    <div className={styles.previewStack} style={frameStyle}>
      <p className={styles.disclaimer}>{t('foundations.shapeDepth.preview.disclaimer')}</p>

      <section className={styles.previewGroup} aria-labelledby="border-preview-title">
        <header className={styles.groupHeader}>
          <h3 id="border-preview-title">{t('foundations.shapeDepth.preview.border.title')}</h3>
          <p>{t('foundations.shapeDepth.preview.border.description')}</p>
        </header>

        <div className={styles.comparisonGrid}>
          <article className={styles.comparisonCard}>
            <h4>{t('foundations.shapeDepth.preview.border.widths')}</h4>
            <div className={styles.sampleRow}>
              {Object.entries(borderWidth).map(([token, value]) => (
                <ShapeSample
                  key={token}
                  kind="width"
                  token={token}
                  value={value}
                  shapeStyle={{ ...boundaryStyle, borderWidth: value }}
                />
              ))}
            </div>
          </article>

          <article className={styles.comparisonCard}>
            <h4>{t('foundations.shapeDepth.preview.border.styles')}</h4>
            <div className={styles.sampleRow}>
              {Object.entries(borderStyle).map(([token, value]) => (
                <ShapeSample
                  key={token}
                  kind="style"
                  token={token}
                  value={value}
                  shapeStyle={{
                    ...boundaryStyle,
                    borderWidth: borderWidth[2],
                    borderStyle: value,
                  }}
                />
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className={styles.previewGroup} aria-labelledby="radius-preview-title">
        <header className={styles.groupHeader}>
          <h3 id="radius-preview-title">{t('foundations.shapeDepth.preview.radius.title')}</h3>
          <p>{t('foundations.shapeDepth.preview.radius.description')}</p>
        </header>

        <article className={styles.comparisonCard}>
          <h4>{t('foundations.shapeDepth.preview.radius.small')}</h4>
          <div className={styles.sampleRow}>
            {smallRadiusTokens.map((token) => (
              <ShapeSample
                key={token}
                kind="small-radius"
                token={token}
                value={radius[token]}
                shapeStyle={{ ...boundaryStyle, borderRadius: radius[token] }}
              />
            ))}
          </div>
        </article>

        <article className={styles.comparisonCard}>
          <h4>{t('foundations.shapeDepth.preview.radius.medium')}</h4>
          <div className={styles.sampleRow}>
            {mediumRadiusTokens.map((token) => (
              <ShapeSample
                key={token}
                kind="medium-radius"
                token={token}
                value={radius[token]}
                shapeStyle={{ ...boundaryStyle, borderRadius: radius[token] }}
              />
            ))}
          </div>
        </article>

        <article className={styles.comparisonCard}>
          <h4>{t('foundations.shapeDepth.preview.radius.full')}</h4>
          <div className={styles.sampleRow}>
            <ShapeSample
              kind="full-radius"
              token="full"
              value={radius.full}
              shapeStyle={{ ...boundaryStyle, borderRadius: radius.full }}
            />
          </div>
        </article>
      </section>
    </div>
  );
}

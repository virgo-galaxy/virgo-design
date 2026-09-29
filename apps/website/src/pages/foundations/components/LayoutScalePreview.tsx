import { sizing, type SizingToken, spacing, type SpacingToken } from '@virgo-design/tokens';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './layout-scale-preview.module.scss';

const paddingTokens = [8, 16, 24] as const satisfies readonly SpacingToken[];
const gapTokens = [4, 12, 24] as const satisfies readonly SpacingToken[];
const spacingCombinations = [
  { padding: 8, gap: 4 },
  { padding: 16, gap: 12 },
  { padding: 24, gap: 20 },
] as const satisfies readonly {
  padding: SpacingToken;
  gap: SpacingToken;
}[];

const heightTokens = [32, 36, 40, 44] as const satisfies readonly SizingToken[];
const iconSizeTokens = [12, 16, 20, 24, 28, 32] as const satisfies readonly SizingToken[];
const smallObjectTokens = [12, 16, 20, 24, 28] as const satisfies readonly SizingToken[];
const mediumLargeObjectTokens = [24, 32, 40, 48, 56, 64] as const satisfies readonly SizingToken[];

function spacingStyle(token: SpacingToken) {
  return { '--preview-space': spacing[token] } as CSSProperties;
}

function combinationStyle(padding: SpacingToken, gap: SpacingToken) {
  return {
    '--preview-gap': spacing[gap],
    '--preview-padding': spacing[padding],
  } as CSSProperties;
}

function sizingStyle(token: SizingToken) {
  return { '--preview-size': sizing[token] } as CSSProperties;
}

function TokenValue({ name, value }: { name: number; value: string }) {
  return (
    <div className={styles.tokenValue}>
      <strong>{name}</strong>
      <code>{value}</code>
    </div>
  );
}

export function LayoutScalePreview() {
  const { t } = useTranslation();

  return (
    <div className={styles.previewStack}>
      <section className={styles.previewGroup} aria-labelledby="spacing-preview-title">
        <header className={styles.groupHeader}>
          <h3 id="spacing-preview-title">{t('foundations.layout.preview.spacing.title')}</h3>
          <p>{t('foundations.layout.preview.spacing.description')}</p>
        </header>

        <div className={styles.comparisonGrid}>
          <article className={styles.comparisonCard}>
            <h4>{t('foundations.layout.preview.spacing.padding')}</h4>
            <div className={styles.paddingComparison}>
              {paddingTokens.map((token) => (
                <div
                  key={token}
                  className={styles.sampleColumn}
                  data-spacing-token={token}
                  data-spacing-use="padding"
                  style={spacingStyle(token)}
                >
                  <div className={styles.paddingStage}>
                    <span>{t('foundations.layout.preview.sample')}</span>
                  </div>
                  <TokenValue name={token} value={spacing[token]} />
                </div>
              ))}
            </div>
          </article>

          <article className={styles.comparisonCard}>
            <h4>{t('foundations.layout.preview.spacing.gap')}</h4>
            <div className={styles.gapComparison}>
              {gapTokens.map((token) => (
                <div
                  key={token}
                  className={styles.sampleColumn}
                  data-spacing-token={token}
                  data-spacing-use="gap"
                  style={spacingStyle(token)}
                >
                  <div className={styles.gapStage}>
                    <i />
                    <i />
                    <i />
                  </div>
                  <TokenValue name={token} value={spacing[token]} />
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className={styles.comparisonCard}>
          <h4>{t('foundations.layout.preview.spacing.combinations')}</h4>
          <div className={styles.combinationComparison}>
            {spacingCombinations.map(({ padding, gap }) => (
              <section
                key={`${padding}-${gap}`}
                className={styles.combinationSample}
                data-spacing-combination={`${padding}-${gap}`}
                data-gap-token={gap}
                data-padding-token={padding}
                style={combinationStyle(padding, gap)}
              >
                <strong>
                  {t('foundations.layout.preview.spacing.combinationValues', {
                    gap: spacing[gap],
                    padding: spacing[padding],
                  })}
                </strong>
                <div>
                  <span />
                  <span />
                  <span />
                </div>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className={styles.previewGroup} aria-labelledby="sizing-preview-title">
        <header className={styles.groupHeader}>
          <h3 id="sizing-preview-title">{t('foundations.layout.preview.sizing.title')}</h3>
          <p>{t('foundations.layout.preview.sizing.description')}</p>
        </header>

        <article className={styles.comparisonCard}>
          <h4>{t('foundations.layout.preview.sizing.heights')}</h4>
          <div className={styles.heightComparison}>
            {heightTokens.map((token) => (
              <div
                key={token}
                className={styles.heightSample}
                data-sizing-token={token}
                data-sizing-use="height"
                style={sizingStyle(token)}
              >
                <div>
                  <span />
                </div>
                <TokenValue name={token} value={sizing[token]} />
              </div>
            ))}
          </div>
        </article>

        <div className={styles.comparisonGrid}>
          <article className={styles.comparisonCard}>
            <h4>{t('foundations.layout.preview.sizing.icons')}</h4>
            <div className={styles.objectComparison}>
              {iconSizeTokens.map((token) => (
                <div
                  key={token}
                  className={styles.objectSample}
                  data-sizing-token={token}
                  data-sizing-use="icon"
                  style={sizingStyle(token)}
                >
                  <div className={styles.iconStage}>
                    <i />
                  </div>
                  <TokenValue name={token} value={sizing[token]} />
                </div>
              ))}
            </div>
          </article>

          <article className={styles.comparisonCard}>
            <h4>{t('foundations.layout.preview.sizing.objects')}</h4>
            <div className={styles.objectComparison}>
              {smallObjectTokens.map((token, index) => (
                <div
                  key={token}
                  className={styles.objectSample}
                  data-sizing-token={token}
                  data-sizing-use="object"
                  style={sizingStyle(token)}
                >
                  <div className={styles.objectStage}>
                    <i data-shape={index % 2 === 0 ? 'round' : 'square'} />
                  </div>
                  <TokenValue name={token} value={sizing[token]} />
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className={styles.comparisonCard}>
          <h4>{t('foundations.layout.preview.sizing.mediumLargeObjects')}</h4>
          <div className={styles.mediumObjectComparison}>
            {mediumLargeObjectTokens.map((token, index) => (
              <div
                key={token}
                className={styles.objectSample}
                data-sizing-token={token}
                data-sizing-use="medium-large-object"
                style={sizingStyle(token)}
              >
                <div className={styles.mediumObjectStage}>
                  <i data-shape={index % 2 === 0 ? 'round' : 'square'} />
                </div>
                <TokenValue name={token} value={sizing[token]} />
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

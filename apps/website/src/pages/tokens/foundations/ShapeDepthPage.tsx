import { borderStyle, borderWidth, elevationLevels, radius, themes } from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import { useAppearance } from '@/shared/theme/use-appearance';

import { TokenPage, TokenSection } from '../TokenPage';
import { DepthScalePreview } from './components/DepthScalePreview';
import { ShapeScalePreview } from './components/ShapeScalePreview';

import styles from '../token-page.module.scss';

export function ShapeDepthPage() {
  const { t } = useTranslation();
  const { appearance } = useAppearance();
  const theme = themes[appearance];

  return (
    <TokenPage
      title={t('tokens.foundations.shapeDepth.title')}
      description={t('tokens.foundations.shapeDepth.description')}
    >
      <div className={styles.splitSections}>
        <TokenSection title={t('tokens.foundations.shapeDepth.borderWidth')}>
          <div className={styles.borderList}>
            {Object.entries(borderWidth).map(([name, value]) => (
              <article key={name} className={styles.borderRow}>
                <div className={styles.compactMeta}>
                  <strong>{name}</strong>
                  <code>{value}</code>
                </div>
                <i style={{ borderTopWidth: value }} />
              </article>
            ))}
          </div>
        </TokenSection>

        <TokenSection title={t('tokens.foundations.shapeDepth.borderStyle')}>
          <div className={styles.borderList}>
            {Object.entries(borderStyle).map(([name, value]) => (
              <article key={name} className={styles.borderRow}>
                <div className={styles.compactMeta}>
                  <strong>{name}</strong>
                  <code>{value}</code>
                </div>
                <i style={{ borderTopStyle: value }} />
              </article>
            ))}
          </div>
        </TokenSection>
      </div>

      <TokenSection title={t('tokens.foundations.shapeDepth.radius')}>
        <div className={styles.radiusGrid}>
          {Object.entries(radius).map(([name, value]) => (
            <article key={name} className={styles.radiusCard}>
              <i style={{ borderRadius: value }} />
              <div className={styles.compactMeta}>
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
            </article>
          ))}
        </div>
      </TokenSection>

      <TokenSection
        id="shape-scale-preview"
        eyebrow={t('tokens.foundations.shapeDepth.preview.eyebrow')}
        title={t('tokens.foundations.shapeDepth.preview.title')}
        description={t('tokens.foundations.shapeDepth.preview.description')}
      >
        <ShapeScalePreview />
      </TokenSection>

      <TokenSection
        title={t('tokens.foundations.shapeDepth.elevation')}
        description={t('tokens.foundations.shapeDepth.elevationDescription')}
      >
        <div className={styles.elevationGrid}>
          {elevationLevels.map((level) => (
            <article
              key={level}
              className={styles.elevationCard}
              style={{ boxShadow: theme.elevation[level] }}
            >
              <strong>{level}</strong>
              <code>{theme.elevation[level]}</code>
            </article>
          ))}
        </div>
      </TokenSection>

      <TokenSection
        id="depth-scale-preview"
        eyebrow={t('tokens.foundations.shapeDepth.depthPreview.eyebrow')}
        title={t('tokens.foundations.shapeDepth.depthPreview.title')}
        description={t('tokens.foundations.shapeDepth.depthPreview.description')}
      >
        <DepthScalePreview />
      </TokenSection>
    </TokenPage>
  );
}

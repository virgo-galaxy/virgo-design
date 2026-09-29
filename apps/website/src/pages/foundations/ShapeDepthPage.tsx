import { borderStyle, borderWidth, elevationLevels, radius, themes } from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import { useAppearance } from '@/shared/theme/use-appearance';

import { DepthScalePreview } from './components/DepthScalePreview';
import { ShapeScalePreview } from './components/ShapeScalePreview';
import styles from './foundation-tokens.module.scss';
import { FoundationPage, FoundationSection } from './FoundationPage';

export function ShapeDepthPage() {
  const { t } = useTranslation();
  const { appearance } = useAppearance();
  const theme = themes[appearance];

  return (
    <FoundationPage
      title={t('foundationPages.shapeDepth.title')}
      description={t('foundationPages.shapeDepth.description')}
    >
      <div className={styles.splitSections}>
        <FoundationSection title={t('foundationPages.shapeDepth.borderWidth')}>
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
        </FoundationSection>

        <FoundationSection title={t('foundationPages.shapeDepth.borderStyle')}>
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
        </FoundationSection>
      </div>

      <FoundationSection title={t('foundationPages.shapeDepth.radius')}>
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
      </FoundationSection>

      <FoundationSection
        id="shape-scale-preview"
        eyebrow={t('foundationPages.shapeDepth.preview.eyebrow')}
        title={t('foundationPages.shapeDepth.preview.title')}
        description={t('foundationPages.shapeDepth.preview.description')}
      >
        <ShapeScalePreview />
      </FoundationSection>

      <FoundationSection
        title={t('foundationPages.shapeDepth.elevation')}
        description={t('foundationPages.shapeDepth.elevationDescription')}
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
      </FoundationSection>

      <FoundationSection
        id="depth-scale-preview"
        eyebrow={t('foundationPages.shapeDepth.depthPreview.eyebrow')}
        title={t('foundationPages.shapeDepth.depthPreview.title')}
        description={t('foundationPages.shapeDepth.depthPreview.description')}
      >
        <DepthScalePreview />
      </FoundationSection>
    </FoundationPage>
  );
}

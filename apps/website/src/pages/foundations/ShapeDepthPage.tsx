import { borderStyle, borderWidth, elevation, opacity, radius } from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import { ShapeScalePreview } from './components/ShapeScalePreview';
import styles from './foundation-tokens.module.scss';
import { FoundationPage, FoundationSection } from './FoundationPage';

export function ShapeDepthPage() {
  const { t } = useTranslation();
  const opacityEntries = Object.entries(opacity).reverse();

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
          {Object.entries(elevation).map(([name, value]) => (
            <article key={name} className={styles.elevationCard} style={{ boxShadow: value }}>
              <strong>{name}</strong>
              <code>{value}</code>
            </article>
          ))}
        </div>
      </FoundationSection>

      <FoundationSection title={t('foundationPages.shapeDepth.opacity')}>
        <div className={styles.opacityGrid}>
          {opacityEntries.map(([name, value]) => (
            <article key={name} className={styles.opacityCard}>
              <i style={{ opacity: value }} />
              <div className={styles.compactMeta}>
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
            </article>
          ))}
        </div>
      </FoundationSection>
    </FoundationPage>
  );
}

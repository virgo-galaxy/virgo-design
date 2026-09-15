import { sizing, spacing } from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import { LayoutScalePreview } from './components/LayoutScalePreview';
import styles from './foundation-tokens.module.scss';
import { FoundationPage, FoundationSection } from './FoundationPage';

export function LayoutPage() {
  const { t } = useTranslation();

  return (
    <FoundationPage
      title={t('foundationPages.layout.title')}
      description={t('foundationPages.layout.description')}
    >
      <FoundationSection
        title={t('foundationPages.layout.spacing')}
        description={t('foundationPages.layout.spacingDescription')}
      >
        <div className={styles.spacingList}>
          {Object.entries(spacing).map(([name, value]) => (
            <article key={name} className={styles.spacingRow}>
              <div className={styles.compactMeta}>
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
              <div className={styles.spacingMeasure}>
                <i style={{ width: value === '0' ? '1px' : value }} />
              </div>
            </article>
          ))}
        </div>
      </FoundationSection>

      <FoundationSection
        title={t('foundationPages.layout.sizing')}
        description={t('foundationPages.layout.sizingDescription')}
      >
        <div className={styles.sizingGrid}>
          {Object.entries(sizing).map(([name, value]) => (
            <article key={name} className={styles.sizingCard}>
              <div className={styles.sizingStage}>
                <i style={{ width: value, height: value }} />
              </div>
              <div className={styles.compactMeta}>
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
            </article>
          ))}
        </div>
      </FoundationSection>

      <FoundationSection
        id="scale-preview"
        eyebrow={t('foundationPages.layout.preview.eyebrow')}
        title={t('foundationPages.layout.preview.title')}
        description={t('foundationPages.layout.preview.description')}
      >
        <LayoutScalePreview />
      </FoundationSection>
    </FoundationPage>
  );
}

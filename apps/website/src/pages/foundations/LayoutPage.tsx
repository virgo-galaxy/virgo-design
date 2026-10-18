import { sizing, spacing } from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import { LayoutScalePreview } from './components/LayoutScalePreview';
import { FoundationPage, FoundationSection } from './FoundationPage';

import styles from './foundation-tokens.module.scss';

export function LayoutPage() {
  const { t } = useTranslation();

  return (
    <FoundationPage
      title={t('foundations.layout.title')}
      description={t('foundations.layout.description')}
    >
      <FoundationSection
        title={t('foundations.layout.spacing')}
        description={t('foundations.layout.spacingDescription')}
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
        title={t('foundations.layout.sizing')}
        description={t('foundations.layout.sizingDescription')}
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
        eyebrow={t('foundations.layout.preview.eyebrow')}
        title={t('foundations.layout.preview.title')}
        description={t('foundations.layout.preview.description')}
      >
        <LayoutScalePreview />
      </FoundationSection>
    </FoundationPage>
  );
}

import { sizing, spacing } from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import { TokenPage, TokenSection } from '../TokenPage';
import { LayoutScalePreview } from './components/LayoutScalePreview';

import styles from '../token-page.module.scss';

export function LayoutPage() {
  const { t } = useTranslation();

  return (
    <TokenPage
      title={t('tokens.foundations.layout.title')}
      description={t('tokens.foundations.layout.description')}
    >
      <TokenSection
        title={t('tokens.foundations.layout.spacing')}
        description={t('tokens.foundations.layout.spacingDescription')}
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
      </TokenSection>

      <TokenSection
        title={t('tokens.foundations.layout.sizing')}
        description={t('tokens.foundations.layout.sizingDescription')}
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
      </TokenSection>

      <TokenSection
        id="scale-preview"
        eyebrow={t('tokens.foundations.layout.preview.eyebrow')}
        title={t('tokens.foundations.layout.preview.title')}
        description={t('tokens.foundations.layout.preview.description')}
      >
        <LayoutScalePreview />
      </TokenSection>
    </TokenPage>
  );
}

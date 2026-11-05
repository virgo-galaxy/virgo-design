import { fontSize, fontWeight, lineHeight } from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import { TokenPage, TokenSection } from '../TokenPage';
import { FontFamilyPreview } from './components/FontFamilyPreview';
import { InternationalSansPreview } from './components/InternationalSansPreview';

import styles from '../token-page.module.scss';

const fontWeightLabelKeys = {
  400: 'tokens.foundations.typography.fontWeights.regular',
  500: 'tokens.foundations.typography.fontWeights.medium',
  600: 'tokens.foundations.typography.fontWeights.semibold',
  700: 'tokens.foundations.typography.fontWeights.bold',
} as const satisfies Record<keyof typeof fontWeight, string>;

export function TypographyPage() {
  const { t } = useTranslation();

  return (
    <TokenPage
      title={t('tokens.foundations.typography.title')}
      description={t('tokens.foundations.typography.description')}
    >
      <TokenSection
        title={t('tokens.foundations.typography.fontFamily')}
        description={t('tokens.foundations.typography.fontFamilyDescription')}
      >
        <FontFamilyPreview />
      </TokenSection>

      <TokenSection
        id="international-sans"
        title={t('tokens.foundations.typography.internationalSans.title')}
        description={t('tokens.foundations.typography.internationalSans.description')}
      >
        <InternationalSansPreview />
      </TokenSection>

      <TokenSection title={t('tokens.foundations.typography.fontSize')}>
        <div className={styles.typeScale}>
          {Object.entries(fontSize).map(([name, value]) => (
            <article key={name} className={styles.typeScaleRow}>
              <div className={styles.compactMeta}>
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
              <span style={{ fontSize: value }}>Virgo</span>
            </article>
          ))}
        </div>
      </TokenSection>

      <div className={styles.splitSections}>
        <TokenSection title={t('tokens.foundations.typography.fontWeight')}>
          <div className={styles.simpleList}>
            {Object.values(fontWeight).map((value) => (
              <article key={value} className={styles.simpleRow}>
                <div className={styles.compactMeta}>
                  <strong>{value}</strong>
                  <code>· {t(fontWeightLabelKeys[value])}</code>
                </div>
                <span style={{ fontWeight: value }}>Virgo Design</span>
              </article>
            ))}
          </div>
        </TokenSection>

        <TokenSection
          title={t('tokens.foundations.typography.lineHeight')}
          description={t('tokens.foundations.typography.lineHeightDescription')}
        >
          <div className={styles.lineHeightGrid}>
            {Object.entries(lineHeight).map(([name, value]) => (
              <article key={name} className={styles.lineHeightCard}>
                <div className={styles.compactMeta}>
                  <strong>{name}</strong>
                  <code>{value.toFixed(2)}</code>
                </div>
                <p style={{ lineHeight: value }}>
                  {t('tokens.foundations.typography.lineHeightSample.first')}
                  <br />
                  {t('tokens.foundations.typography.lineHeightSample.second')}
                </p>
              </article>
            ))}
          </div>
        </TokenSection>
      </div>
    </TokenPage>
  );
}

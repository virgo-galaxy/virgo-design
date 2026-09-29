import { fontSize, fontWeight, lineHeight } from '@virgo-design/tokens';
import { useTranslation } from 'react-i18next';

import { FontFamilyPreview } from './components/FontFamilyPreview';
import { InternationalSansPreview } from './components/InternationalSansPreview';
import styles from './foundation-tokens.module.scss';
import { FoundationPage, FoundationSection } from './FoundationPage';

const fontWeightLabels = {
  400: 'Regular',
  500: 'Medium',
  600: 'Semibold',
  700: 'Bold',
} as const satisfies Record<keyof typeof fontWeight, string>;

export function TypographyPage() {
  const { t } = useTranslation();

  return (
    <FoundationPage
      title={t('foundations.typography.title')}
      description={t('foundations.typography.description')}
    >
      <FoundationSection
        title={t('foundations.typography.fontFamily')}
        description={t('foundations.typography.fontFamilyDescription')}
      >
        <FontFamilyPreview />
      </FoundationSection>

      <FoundationSection
        id="international-sans"
        title={t('foundations.typography.internationalSans.title')}
        description={t('foundations.typography.internationalSans.description')}
      >
        <InternationalSansPreview />
      </FoundationSection>

      <FoundationSection title={t('foundations.typography.fontSize')}>
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
      </FoundationSection>

      <div className={styles.splitSections}>
        <FoundationSection title={t('foundations.typography.fontWeight')}>
          <div className={styles.simpleList}>
            {Object.values(fontWeight).map((value) => (
              <article key={value} className={styles.simpleRow}>
                <div className={styles.compactMeta}>
                  <strong>{value}</strong>
                  <code>· {fontWeightLabels[value]}</code>
                </div>
                <span style={{ fontWeight: value }}>Virgo Design</span>
              </article>
            ))}
          </div>
        </FoundationSection>

        <FoundationSection
          title={t('foundations.typography.lineHeight')}
          description={t('foundations.typography.lineHeightDescription')}
        >
          <div className={styles.lineHeightGrid}>
            {Object.entries(lineHeight).map(([name, value]) => (
              <article key={name} className={styles.lineHeightCard}>
                <div className={styles.compactMeta}>
                  <strong>{name}</strong>
                  <code>{value.toFixed(2)}</code>
                </div>
                <p style={{ lineHeight: value }}>
                  Foundation materials
                  <br />
                  remain composable.
                </p>
              </article>
            ))}
          </div>
        </FoundationSection>
      </div>
    </FoundationPage>
  );
}

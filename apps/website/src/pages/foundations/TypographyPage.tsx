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
      title={t('foundationPages.typography.title')}
      description={t('foundationPages.typography.description')}
    >
      <FoundationSection
        title={t('foundationPages.typography.fontFamily')}
        description={t('foundationPages.typography.fontFamilyDescription')}
      >
        <FontFamilyPreview />
      </FoundationSection>

      <FoundationSection
        id="international-sans"
        title={t('foundationPages.typography.internationalSans.title')}
        description={t('foundationPages.typography.internationalSans.description')}
      >
        <InternationalSansPreview />
      </FoundationSection>

      <FoundationSection title={t('foundationPages.typography.fontSize')}>
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
        <FoundationSection title={t('foundationPages.typography.fontWeight')}>
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
          title={t('foundationPages.typography.lineHeight')}
          description={t('foundationPages.typography.lineHeightDescription')}
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

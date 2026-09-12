import { fontFamily, fontSize, fontWeight, letterSpacing, lineHeight } from '@virgo-design/tokens';
import { type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './foundation-tokens.module.scss';
import { FoundationPage, FoundationSection } from './FoundationPage';

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
        <div className={styles.familyGrid}>
          {Object.entries(fontFamily).map(([name, value]) => (
            <article key={name} className={styles.familyCard} style={{ fontFamily: value }}>
              <div className={styles.tokenMeta}>
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
              <span className={styles.familySample}>Virgo Design</span>
            </article>
          ))}
        </div>
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
            {Object.entries(fontWeight).map(([name, value]) => (
              <article key={name} className={styles.simpleRow}>
                <div className={styles.compactMeta}>
                  <strong>{name}</strong>
                  <code>{value}</code>
                </div>
                <span style={{ fontWeight: value }}>Virgo Design</span>
              </article>
            ))}
          </div>
        </FoundationSection>

        <FoundationSection title={t('foundationPages.typography.lineHeight')}>
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

      <FoundationSection title={t('foundationPages.typography.letterSpacing')}>
        <div className={styles.letterSpacingGrid}>
          {Object.entries(letterSpacing).map(([name, value]) => (
            <article
              key={name}
              className={styles.letterSpacingCard}
              style={{ '--foundation-letter-spacing': value } as CSSProperties}
            >
              <div className={styles.compactMeta}>
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
              <span>VIRGO</span>
            </article>
          ))}
        </div>
      </FoundationSection>
    </FoundationPage>
  );
}

import { duration, easing } from '@virgo-design/tokens';
import { type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './foundation-tokens.module.scss';
import { FoundationPage, FoundationSection } from './FoundationPage';

export function MotionPage() {
  const { t } = useTranslation();

  return (
    <FoundationPage
      title={t('foundationPages.motion.title')}
      description={t('foundationPages.motion.description')}
    >
      <FoundationSection
        title={t('foundationPages.motion.duration')}
        description={t('foundationPages.motion.durationDescription')}
      >
        <div className={styles.motionList}>
          {Object.entries(duration).map(([name, value]) => (
            <article
              key={name}
              className={styles.motionRow}
              style={{ '--foundation-duration': value } as CSSProperties}
            >
              <div className={styles.compactMeta}>
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
              <div className={styles.motionTrack}>
                <i />
              </div>
            </article>
          ))}
        </div>
      </FoundationSection>

      <FoundationSection
        title={t('foundationPages.motion.easing')}
        description={t('foundationPages.motion.easingDescription')}
      >
        <div className={styles.easingGrid}>
          {Object.entries(easing).map(([name, value]) => (
            <article
              key={name}
              className={styles.easingCard}
              style={{ '--foundation-easing': value } as CSSProperties}
            >
              <div className={styles.tokenMeta}>
                <strong>{name}</strong>
                <code>{value}</code>
              </div>
              <div className={styles.easingStage}>
                <i />
              </div>
            </article>
          ))}
        </div>
      </FoundationSection>
    </FoundationPage>
  );
}

import { Skeleton, Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './page-skeleton.module.scss';

type PageSkeletonVariant = 'page' | 'document' | 'catalogue' | 'example' | 'section';

interface PageSkeletonProps {
  variant?: PageSkeletonVariant;
}

function CopySkeleton() {
  return (
    <div className={styles.copy}>
      <Skeleton variant="text" className={styles.eyebrow} />
      <Skeleton variant="text" className={styles.title} />
      <div className={styles.lines}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className={styles.shortLine} />
      </div>
    </div>
  );
}

/** Website content geometry composed from public Skeleton and Surface capabilities. */
export function PageSkeleton({ variant = 'page' }: PageSkeletonProps) {
  const { t } = useTranslation();
  return (
    <div className={styles.root} data-page-skeleton={variant}>
      <span className={styles.status} role="status">
        {t('app.controls.loadingPage')}
      </span>
      <div className={styles.visual} aria-busy="true" aria-hidden="true">
        {variant === 'example' ? (
          <Surface border="subtle" radius={12} className={styles.example}>
            <Skeleton variant="text" className={styles.exampleTitle} />
            <Skeleton className={styles.exampleControl} />
            <Skeleton className={styles.exampleControl} />
            <Skeleton className={styles.exampleButton} />
          </Surface>
        ) : variant === 'section' ? (
          <div className={styles.section}>
            <Skeleton variant="text" className={styles.sectionTitle} />
            <Skeleton className={styles.sectionPanel} />
          </div>
        ) : (
          <>
            <div className={variant === 'document' ? styles.overview : styles.intro}>
              <CopySkeleton />
              {variant !== 'catalogue' ? (
                <Surface border="subtle" radius={12} className={styles.hero}>
                  <Skeleton variant="text" className={styles.heroLabel} />
                  <Skeleton className={styles.heroContent} />
                </Surface>
              ) : null}
            </div>
            {variant === 'catalogue' ? (
              <div className={styles.cards}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <Surface key={index} border="subtle" radius={12} className={styles.card}>
                    <Skeleton variant="text" className={styles.sectionTitle} />
                    <Skeleton variant="text" />
                    <Skeleton variant="text" className={styles.shortLine} />
                  </Surface>
                ))}
              </div>
            ) : (
              <div className={styles.section}>
                <Skeleton variant="text" className={styles.sectionTitle} />
                <Skeleton variant="text" className={styles.shortLine} />
                <Skeleton className={styles.sectionPanel} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

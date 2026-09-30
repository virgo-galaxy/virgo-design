import { Layout } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../foundations/foundation-tokens.module.scss';

interface TokenPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

interface TokenSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  eyebrow?: string;
  id?: string;
}

export function TokenPage({ title, description, children }: TokenPageProps) {
  const { t } = useTranslation();
  return (
    <section className={styles.page}>
      <Layout.Lane
        className={styles.lane!}
        width="calc(100% - clamp(28px, 4vw, 64px))"
        minHeight="calc(100svh - var(--layout-header-height))"
        insetBlock="20px 112px"
      >
        <div className={styles.laneBoundary!}>
          <div className={styles.inner!}>
            <header className={styles.pageHeader}>
              <div className={styles.eyebrow}>{t('tokens.eyebrow')}</div>
              <h1>{title}</h1>
              <p>{description}</p>
            </header>

            <div className={styles.sections}>{children}</div>
          </div>
        </div>
      </Layout.Lane>
    </section>
  );
}

export function TokenSection({ title, description, children, eyebrow, id }: TokenSectionProps) {
  return (
    <section id={id} className={styles.tokenSection}>
      <header className={styles.sectionHeader}>
        {eyebrow ? <div className={styles.sectionEyebrow}>{eyebrow}</div> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>

      {children}
    </section>
  );
}

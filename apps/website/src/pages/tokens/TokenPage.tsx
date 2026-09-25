import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { SectionNavigation } from '@/components/section/SectionNavigation';
import { TOKEN_NAVIGATION_ITEMS } from '@/shared/routes/route-config';

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
  const navigationItems = TOKEN_NAVIGATION_ITEMS.map((item) => ({
    ...item,
    label: t(item.label),
  }));

  return (
    <section className={styles.page}>
      <div className={styles.inner}>
        <SectionNavigation ariaLabel={t('tokenNavigation.label')} items={navigationItems} />

        <header className={styles.pageHeader}>
          <div className={styles.eyebrow}>{t('tokenPages.eyebrow')}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <div className={styles.sections}>{children}</div>
      </div>
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

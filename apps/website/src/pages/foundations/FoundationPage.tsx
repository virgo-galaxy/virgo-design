import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { FOUNDATION_NAVIGATION_ITEMS } from '@/shared/routes/route-config';

import styles from './foundation-tokens.module.scss';

interface FoundationPageProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
  id?: string;
}

interface FoundationSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  eyebrow?: string;
  id?: string;
}

export function FoundationPage({
  title,
  description,
  children,
  className = '',
  id,
}: FoundationPageProps) {
  const { t } = useTranslation();

  return (
    <section id={id} className={`${styles.page} ${className}`}>
      <div className={styles.inner}>
        <nav className={styles.foundationNavigation} aria-label={t('foundationNavigation.label')}>
          {FOUNDATION_NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) =>
                `${styles.foundationNavigationLink} ${
                  isActive ? styles.foundationNavigationLinkActive : ''
                }`
              }
              to={item.path}
            >
              {t(item.label)}
            </NavLink>
          ))}
        </nav>

        <header className={styles.pageHeader}>
          <div className={styles.eyebrow}>{t('foundationPages.eyebrow')}</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <div className={styles.sections}>{children}</div>
      </div>
    </section>
  );
}

export function FoundationSection({
  title,
  description,
  children,
  eyebrow,
  id,
}: FoundationSectionProps) {
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

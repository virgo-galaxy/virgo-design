import {
  LayersIcon,
  LayoutIcon,
  PaletteIcon,
  ShapesIcon,
  SplineIcon,
  TypeIcon,
} from '@virgo-design/icons';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { FOUNDATION_NAVIGATION_ITEMS } from '@/shared/routes/route-config';

import styles from './foundation-tokens.module.scss';

const foundationIcons = {
  'foundationNavigation.colors': PaletteIcon,
  'foundationNavigation.typography': TypeIcon,
  'foundationNavigation.layout': LayoutIcon,
  'foundationNavigation.shapeDepth': LayersIcon,
  'foundationNavigation.motion': SplineIcon,
  'foundationNavigation.icons': ShapesIcon,
} as const;

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

export function FoundationNavigation() {
  const { t } = useTranslation();

  return (
    <nav className={styles.foundationNavigation} aria-label={t('foundationNavigation.label')}>
      {FOUNDATION_NAVIGATION_ITEMS.map((item) => {
        const Icon = foundationIcons[item.label];

        return (
          <NavLink
            key={item.path}
            className={({ isActive }) =>
              `${styles.foundationNavigationLink} ${
                isActive ? styles.foundationNavigationLinkActive : ''
              }`
            }
            to={item.path}
          >
            <Icon size={16} aria-hidden="true" />
            {t(item.label)}
          </NavLink>
        );
      })}
    </nav>
  );
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
        <FoundationNavigation />

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

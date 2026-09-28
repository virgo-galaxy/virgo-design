import {
  LayersIcon,
  LayoutIcon,
  PaletteIcon,
  ShapesIcon,
  SplineIcon,
  TypeIcon,
} from '@virgo-design/icons';
import { Dock, Layout } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { SectionNavigation } from '@/components/section/SectionNavigation';
import { FOUNDATION_NAVIGATION_ITEMS } from '@/shared/routes/route-config';

import styles from './foundation-tokens.module.scss';

const FOUNDATION_DOCK_EDGES = ['top', 'left', 'right'] as const;

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
  const items = FOUNDATION_NAVIGATION_ITEMS.map((item) => {
    const Icon = foundationIcons[item.label];

    return {
      ...item,
      label: t(item.label),
      icon: <Icon size={16} aria-hidden="true" />,
    };
  });

  return (
    <Dock.Root
      defaultLocked
      defaultPinned
      allowedEdges={FOUNDATION_DOCK_EDGES}
      defaultPlacement={{ edge: 'top', position: 0.5 }}
      persist={{ storage: 'session', key: 'foundations-navigation' }}
      snapDivisions={false}
    >
      {({ orientation }) => (
        <>
          <Dock.Handle aria-label={t('foundationNavigation.move')} />
          <Dock.Content>
            <SectionNavigation
              ariaLabel={t('foundationNavigation.label')}
              items={items}
              orientation={orientation}
            />
          </Dock.Content>
        </>
      )}
    </Dock.Root>
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
      <Layout.Lane
        className={styles.lane!}
        width="calc(100% - clamp(28px, 4vw, 64px))"
        minHeight="calc(100svh - var(--layout-header-height))"
        insetBlock="20px 112px"
      >
        <Dock.Boundary className={styles.laneBoundary!}>
          <FoundationNavigation />

          <div className={styles.inner!}>
            <header className={styles.pageHeader}>
              <div className={styles.eyebrow}>{t('foundationPages.eyebrow')}</div>
              <h1>{title}</h1>
              <p>{description}</p>
            </header>

            <div className={styles.sections}>{children}</div>
          </div>
        </Dock.Boundary>
      </Layout.Lane>
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

import { ChevronLeftIcon } from '@virgo-design/icons';
import { Layout, NavigationMenu } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './documentation-sidebar.module.scss';

interface DocumentationSidebarRootProps {
  activeValue: string;
  children: ReactNode;
  label: string;
  navigationLabel: string;
}

export function DocumentationSidebar({
  activeValue,
  children,
  label,
  navigationLabel,
}: DocumentationSidebarRootProps) {
  const { t } = useTranslation();

  return (
    <Layout.Sidebar
      className={styles.sidebar}
      data-docs-sidebar=""
      aria-label={label}
      collapsible
      collapsedWidth={12}
      triggerPlacement="edge"
      trigger={
        <Layout.SidebarTrigger
          className={styles.trigger}
          render={(buttonProps) => (
            <button
              {...buttonProps}
              aria-label={
                buttonProps['aria-expanded'] ? t('docs.sidebar.collapse') : t('docs.sidebar.expand')
              }
            />
          )}
        >
          <ChevronLeftIcon aria-hidden="true" />
        </Layout.SidebarTrigger>
      }
      width="var(--documentation-sidebar-width)"
      surface={{ border: 'none' }}
    >
      {({ collapsed }) => (
        <NavigationMenu.Root
          aria-label={navigationLabel}
          aria-hidden={collapsed || undefined}
          inert={collapsed || undefined}
          orientation="vertical"
          value={activeValue}
        >
          <NavigationMenu.List className={styles.groups}>{children}</NavigationMenu.List>
        </NavigationMenu.Root>
      )}
    </Layout.Sidebar>
  );
}

interface DocumentationSidebarGroupProps {
  children: ReactNode;
  id: string;
  label: ReactNode;
}

export function DocumentationSidebarGroup({ children, id, label }: DocumentationSidebarGroupProps) {
  return (
    <NavigationMenu.Group className={styles.group} aria-labelledby={id}>
      <NavigationMenu.GroupLabel id={id} className={styles.groupLabel}>
        {label}
      </NavigationMenu.GroupLabel>
      <NavigationMenu.List className={styles.linkList}>{children}</NavigationMenu.List>
    </NavigationMenu.Group>
  );
}

interface DocumentationSidebarItemProps {
  children: ReactNode;
  to: string;
}

export function DocumentationSidebarItem({ children, to }: DocumentationSidebarItemProps) {
  return (
    <NavigationMenu.Item value={to}>
      <NavigationMenu.Link className={styles.link} render={(props) => <Link {...props} to={to} />}>
        {children}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}

export function DocumentationSidebarIndex({ children }: { children: ReactNode }) {
  return <span className={styles.index}>{children}</span>;
}

export function DocumentationSidebarCopy({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}

export function DocumentationSidebarSeparator() {
  return <NavigationMenu.Separator className={styles.separator} />;
}

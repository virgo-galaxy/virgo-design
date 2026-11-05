import { LayersIcon } from '@virgo-design/icons';
import { Breadcrumb, Collapsible, Layout, NavigationMenu } from '@virgo-design/ui';
import { Suspense, useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { DocumentationDetailShell } from '@/components/docs/DocumentationDetailShell';
import {
  DocumentationSidebar,
  DocumentationSidebarCopy,
  DocumentationSidebarGroup,
  DocumentationSidebarIndex,
  DocumentationSidebarItem,
  DocumentationSidebarSeparator,
} from '@/components/docs/DocumentationSidebar';
import { PageSkeleton } from '@/components/loading/PageSkeleton';
import { ROUTE_PATHS } from '@/shared/routes/route-config';

import { tokenNavigationGroups } from './token-navigation';

import styles from './tokens-documentation.module.scss';

function TokenNavigationItems() {
  const { t } = useTranslation();
  const id = useId();

  return (
    <>
      <DocumentationSidebarItem to={ROUTE_PATHS.tokens}>
        <DocumentationSidebarIndex>
          <LayersIcon size={16} aria-hidden="true" />
        </DocumentationSidebarIndex>
        <DocumentationSidebarCopy>
          <strong>{t('tokens.navigation.overview')}</strong>
        </DocumentationSidebarCopy>
      </DocumentationSidebarItem>
      <DocumentationSidebarSeparator />
      {tokenNavigationGroups.map((group, groupIndex) => (
        <DocumentationSidebarGroup key={group.id} id={`${id}-${group.id}`} label={t(group.label)}>
          {group.items.map(({ path, label, Icon }) => (
            <DocumentationSidebarItem key={path} to={path}>
              <DocumentationSidebarIndex>
                <Icon size={16} aria-hidden="true" />
              </DocumentationSidebarIndex>
              <DocumentationSidebarCopy>
                <strong>{t(label)}</strong>
              </DocumentationSidebarCopy>
            </DocumentationSidebarItem>
          ))}
          {groupIndex < tokenNavigationGroups.length - 1 ? <DocumentationSidebarSeparator /> : null}
        </DocumentationSidebarGroup>
      ))}
    </>
  );
}

export function TokensDocumentation() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = pathname.replace(/\/+$/, '');
  const group = tokenNavigationGroups.find((group) =>
    group.items.some((item) => item.path === path),
  );
  const item = group?.items.find((item) => item.path === path);

  if (path === ROUTE_PATHS.tokens) {
    return (
      <Suspense fallback={<PageSkeleton variant="catalogue" />}>
        <Outlet />
      </Suspense>
    );
  }

  return (
    <Layout direction="horizontal" className={styles.shell!}>
      <DocumentationSidebar
        label={t('tokens.navigation.sidebar')}
        navigationLabel={t('tokens.navigation.label')}
        activeValue={path}
      >
        <TokenNavigationItems />
      </DocumentationSidebar>

      <Collapsible
        className={styles.mobileNavigation!}
        open={mobileOpen}
        onOpenChange={setMobileOpen}
      >
        <Collapsible.Trigger>{t('tokens.navigation.menu')}</Collapsible.Trigger>
        <Collapsible.Content motion="collapse">
          <NavigationMenu.Root
            orientation="vertical"
            aria-label={t('tokens.navigation.mobileLabel')}
            value={path}
            onClick={(event) => {
              if ((event.target as Element).closest('a')) {
                setMobileOpen(false);
                document.getElementById('website-main')?.focus({ preventScroll: true });
              }
            }}
          >
            <NavigationMenu.List>
              <TokenNavigationItems />
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </Collapsible.Content>
      </Collapsible>

      <DocumentationDetailShell
        breadcrumb={
          <Breadcrumb>
            <Breadcrumb.Item aria-current={false}>
              <Link to={ROUTE_PATHS.tokens}>{t('app.navigation.tokens')}</Link>
            </Breadcrumb.Item>
            {group ? (
              <Breadcrumb.Item aria-current={false}>{t(group.label)}</Breadcrumb.Item>
            ) : null}
            <Breadcrumb.Item>{t(item?.label ?? 'tokens.navigation.overview')}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Suspense fallback={<PageSkeleton variant="document" />}>
          <Outlet />
        </Suspense>
      </DocumentationDetailShell>
    </Layout>
  );
}

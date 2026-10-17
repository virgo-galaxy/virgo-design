import { NavigationMenu, Separator } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { useCurrentUser } from '@/features/auth';
import type { SidebarStyle } from '@/preferences';
import { canVisitPage, proRouting } from '@/routes';

import { navigationGroups as baseNavigationGroups } from './navigation';
import styles from './SidebarNavigation.module.scss';

export function SidebarNavigation({
  collapsed,
  railIconSize,
  pathname,
  showSubmenuHeader,
  sidebarStyle,
  showOverlayArrows,
}: {
  collapsed: boolean;
  railIconSize: 'regular' | 'large';
  pathname: string;
  showSubmenuHeader: boolean;
  sidebarStyle: SidebarStyle;
  showOverlayArrows: boolean;
}) {
  const { t } = useTranslation();
  const user = useCurrentUser();

  const navigationGroups = baseNavigationGroups
    .map((group) => ({
      ...group,
      label: t(group.labelKey),
      pages: group.pages
        .filter((page) => canVisitPage(user, page.page))
        .map((page) => ({ ...page, label: t(page.labelKey) })),
    }))
    .filter((group) => group.pages.length);

  const menuId = useId();
  const currentPage = proRouting.match(pathname);
  const currentGroup = currentPage?.group?.id;
  const [expandedGroups, setExpandedGroups] = useState<string[]>(() =>
    currentGroup ? [currentGroup] : [],
  );
  const [previousPath, setPreviousPath] = useState(pathname);

  if (previousPath !== pathname) {
    setPreviousPath(pathname);

    if (currentGroup && !expandedGroups.includes(currentGroup)) {
      setExpandedGroups([...expandedGroups, currentGroup]);
    }
  }

  return (
    <NavigationMenu
      key={collapsed ? 'compact' : 'expanded'}
      orientation="vertical"
      submenu={collapsed ? 'popover' : 'inline'}
      value={
        currentPage?.activePage
          ? (proRouting.routes.find((route) => route.page === currentPage.activePage)?.path ??
            pathname)
          : (currentPage?.path ?? pathname)
      }
      className={styles.navigation}
      data-compact={collapsed}
      data-rail-icon-size={railIconSize}
      aria-label={t('app.mainNavigation')}
    >
      <NavigationMenu.List>
        {navigationGroups.map((group) => {
          const labelId = `${menuId}-${group.id}-label`;
          const destinations = group.pages.map((page) => (
            <NavigationMenu.Item
              key={page.id}
              value={page.path}
              {...(page.icon ? { icon: <page.icon /> } : {})}
            >
              <NavigationMenu.Link
                href={page.path}
                aria-label={page.label}
                render={(props) => <Link {...props} to={page.path} />}
              >
                {page.label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ));

          if (!collapsed && sidebarStyle === 'labels') {
            return (
              <NavigationMenu.Group
                key={group.id}
                aria-labelledby={labelId}
                className={styles.labelGroup}
              >
                <NavigationMenu.GroupLabel
                  id={labelId}
                  className={styles.fixedGroupLabel}
                  data-current-group={currentGroup === group.id || undefined}
                >
                  <group.icon aria-hidden="true" />
                  {group.label}
                </NavigationMenu.GroupLabel>
                <NavigationMenu.List>{destinations}</NavigationMenu.List>
              </NavigationMenu.Group>
            );
          }

          return (
            <NavigationMenu.Item
              key={group.id}
              value={`group:${group.id}`}
              icon={<group.icon />}
              {...(collapsed
                ? {}
                : {
                    expanded: expandedGroups.includes(group.id),
                    onExpandedChange: (expanded: boolean) =>
                      setExpandedGroups((current) =>
                        expanded ? [...current, group.id] : current.filter((id) => id !== group.id),
                      ),
                  })}
            >
              <NavigationMenu.Trigger
                className={styles.groupTrigger}
                data-current-group={currentGroup === group.id || undefined}
                aria-label={group.label}
                indicator={!collapsed}
              >
                {group.label}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                arrow={collapsed && showOverlayArrows}
                className={styles.subnavigation}
              >
                {collapsed ? (
                  <NavigationMenu.Group
                    {...(showSubmenuHeader
                      ? { 'aria-labelledby': labelId }
                      : { 'aria-label': group.label })}
                  >
                    {showSubmenuHeader ? (
                      <>
                        <NavigationMenu.GroupLabel id={labelId} className={styles.submenuLabel}>
                          <group.icon aria-hidden="true" />
                          {group.label}
                        </NavigationMenu.GroupLabel>
                        <Separator decorative className={styles.submenuSeparator} />
                      </>
                    ) : null}
                    <NavigationMenu.List>{destinations}</NavigationMenu.List>
                  </NavigationMenu.Group>
                ) : (
                  destinations
                )}
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu>
  );
}

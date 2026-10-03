import { NavigationMenu, Separator } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import type { SidebarStyle } from '@/components/global-settings/settings';

import styles from './AppShell.module.scss';
import { navigationGroups as baseNavigationGroups } from './navigation';
import { getGroupLabel, getPageLabel } from './navigation-labels';
import { proRouting } from './routing';

export function SidebarNavigation({
  collapsed,
  pathname,
  showSubmenuHeader,
  sidebarStyle,
  showOverlayArrows,
}: {
  collapsed: boolean;
  pathname: string;
  showSubmenuHeader: boolean;
  sidebarStyle: SidebarStyle;
  showOverlayArrows: boolean;
}) {
  const { t } = useTranslation();
  const navigationGroups = baseNavigationGroups.map((group) => ({
    ...group,
    label: getGroupLabel(t, group.id),
    pages: group.pages.map((page) => ({ ...page, label: getPageLabel(t, page.page) })),
  }));
  const menuId = useId();
  const currentPage = proRouting.match(pathname);
  const currentGroup = currentPage?.group?.id;
  const [expandedGroups, setExpandedGroups] = useState<string[]>(() =>
    currentGroup ? [currentGroup] : [],
  );
  const [previousPath, setPreviousPath] = useState(pathname);

  // Direct routes, page search and browser history reveal the destination's group.
  // Keep manual disclosure choices until the route changes again.
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
      value={currentPage?.path ?? pathname}
      className={styles.navigation}
      data-compact={collapsed}
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

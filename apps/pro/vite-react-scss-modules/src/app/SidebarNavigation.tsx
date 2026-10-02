import { NavigationMenu } from '@virgo-design/ui';
import { useState } from 'react';
import { Link } from 'react-router';

import styles from './AppShell.module.scss';
import { navigationGroups } from './navigation';

export function SidebarNavigation({
  collapsed,
  pathname,
}: {
  collapsed: boolean;
  pathname: string;
}) {
  const currentGroup = navigationGroups.find((group) =>
    group.pages.some((page) => page.path === pathname),
  )?.label;
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
      value={pathname}
      className={styles.navigation}
      data-compact={collapsed}
      aria-label="Main navigation"
    >
      <NavigationMenu.List>
        {navigationGroups.map((group) => (
          <NavigationMenu.Item
            key={group.label}
            value={`group:${group.label}`}
            icon={<group.icon />}
            {...(collapsed
              ? {}
              : {
                  expanded: expandedGroups.includes(group.label),
                  onExpandedChange: (expanded: boolean) =>
                    setExpandedGroups((current) =>
                      expanded
                        ? [...current, group.label]
                        : current.filter((label) => label !== group.label),
                    ),
                })}
          >
            <NavigationMenu.Trigger
              className={styles.groupTrigger}
              data-current-group={currentGroup === group.label || undefined}
              aria-label={group.label}
              indicator={!collapsed}
            >
              {group.label}
            </NavigationMenu.Trigger>
            <NavigationMenu.Content arrow={collapsed} className={styles.subnavigation}>
              {group.pages.map((page) => (
                <NavigationMenu.Item key={page.path} value={page.path}>
                  <NavigationMenu.Link
                    href={page.path}
                    aria-label={page.label}
                    render={(props) => <Link {...props} to={page.path} />}
                  >
                    {page.label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu>
  );
}

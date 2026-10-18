import { NavigationMenu, Separator } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import type { SidebarStyle } from '@/preferences';
import { proRouting, routeIcons } from '@/routes';

export function SidebarNavigation({
  collapsed,
  railIconSize,
  pathname,
  showSubmenuHeader,
  sidebarStyle,
  showOverlayArrows,
  canVisit,
}: {
  collapsed: boolean;
  railIconSize: 'regular' | 'large';
  pathname: string;
  showSubmenuHeader: boolean;
  sidebarStyle: SidebarStyle;
  showOverlayArrows: boolean;
  canVisit?: ((key: string) => boolean) | undefined;
}) {
  const { t } = useTranslation();

  const navigationGroups = proRouting.groups
    .map((group) => ({
      ...group,
      label: t(group.labelKey),
      icon: routeIcons[group.icon],
      pages: group.pages
        .filter((page) => canVisit?.(page.key) ?? true)
        .map((page) => ({
          ...page,
          label: t(page.labelKey),
          icon: page.icon ? routeIcons[page.icon] : undefined,
        })),
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
      value={currentPage?.activeMenu ?? currentPage?.key ?? pathname}
      className={[
        'pro-sidebar-navigation-navigation [--navigation-menu-control-height:var(--vd-control-medium-height,_var(--vd-sizing-36))]',
        '[--navigation-menu-radius:var(--vd-shape-radius-6,_var(--vd-radius-6))] [--navigation-menu-icon-size:var(--vd-sizing-16)]',
        '[padding:var(--vd-spacing-4)_var(--vd-spacing-8)] text-(length:--vd-font-size-13)',
        'data-[compact=true]:[--navigation-menu-control-padding:var(--vd-spacing-4)] data-[compact=true]:px-4',
        "[&[data-compact='true']_[data-slot='label']]:absolute [&[data-compact='true']_[data-slot='label']]:[width:1px]",
        "[&[data-compact='true']_[data-slot='label']]:[height:1px] [&[data-compact='true']_[data-slot='label']]:p-0",
        "[&[data-compact='true']_[data-slot='label']]:overflow-hidden [&[data-compact='true']_[data-slot='label']]:[clip-path:inset(50%)]",
        "[&[data-compact='true']_[data-slot='label']]:whitespace-nowrap [&[data-compact='true']_[data-vd-navigation-menu-control]]:justify-center",
        "[&_a[data-vd-navigation-menu-control][data-active='true']]:text-brand-link",
        "[&_a[data-vd-navigation-menu-control][data-active='true']]:bg-brand-subtle-hover",
        "[&_a[data-vd-navigation-menu-control][data-active='true']]:[font-weight:var(--vd-font-weight-500)]",
        "[&_a[data-vd-navigation-menu-control][data-active='true']:hover]:text-brand-link",
        "[&_a[data-vd-navigation-menu-control][data-active='true']:hover]:bg-brand-subtle-hover",
        "[&_a[data-vd-navigation-menu-control][data-active='true']:hover]:[font-weight:var(--vd-font-weight-500)]",
        "[&[data-compact='true'][data-rail-icon-size='large']_[data-slot='icon']_>_svg]:flex-none",
        "[&[data-compact='true'][data-rail-icon-size='large']_[data-slot='icon']_>_svg]:[width:var(--vd-sizing-20)]",
        "[&[data-compact='true'][data-rail-icon-size='large']_[data-slot='icon']_>_svg]:[height:var(--vd-sizing-20)]",
      ].join(' ')}
      data-compact={collapsed}
      data-rail-icon-size={railIconSize}
      aria-label={t('sidebar.mainNavigation')}
    >
      <NavigationMenu.List>
        {navigationGroups.map((group) => {
          const labelId = `${menuId}-${group.id}-label`;
          const destinations = group.pages.map((page) => (
            <NavigationMenu.Item
              key={page.key}
              value={page.key}
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
                className={[
                  "[&_>_[data-slot='list']]:[margin-block-start:var(--navigation-menu-gap)]",
                  "[&_>_[data-slot='list']_[data-vd-navigation-menu-control]]:[padding-inline-start:calc(_var(--navigation-menu-control-padding)_+_var(--navigation-menu-icon-size)_+_var(--vd-spacing-8)_)]",
                ].join(' ')}
              >
                <NavigationMenu.GroupLabel
                  id={labelId}
                  className={[
                    '[.pro-sidebar-navigation-navigation_&]:box-border [.pro-sidebar-navigation-navigation_&]:flex',
                    '[.pro-sidebar-navigation-navigation_&]:[min-height:var(--navigation-menu-control-height)]',
                    '[.pro-sidebar-navigation-navigation_&]:items-center [.pro-sidebar-navigation-navigation_&]:gap-8',
                    '[.pro-sidebar-navigation-navigation_&]:[padding:0_var(--navigation-menu-control-padding)]',
                    '[.pro-sidebar-navigation-navigation_&]:[border-radius:var(--navigation-menu-radius)]',
                    '[.pro-sidebar-navigation-navigation_&]:text-text-primary [.pro-sidebar-navigation-navigation_&]:[font:inherit]',
                    '[.pro-sidebar-navigation-navigation_&]:[font-weight:var(--vd-font-weight-600)]',
                    '[.pro-sidebar-navigation-navigation_&]:[transition:color_var(--vd-motion-interaction-duration,_var(--vd-duration-120))_var(--vd-motion-easing-standard,_var(--vd-easing-standard)),_background-color_var(--vd-motion-interaction-duration,_var(--vd-duration-120))_var(--vd-motion-easing-standard,_var(--vd-easing-standard))]',
                    '[.pro-sidebar-navigation-navigation_&:hover]:bg-fill-hover',
                    "[.pro-sidebar-navigation-navigation_&[data-current-group='true']]:text-brand-link",
                    "[.pro-sidebar-navigation-navigation_&[data-current-group='true']_>_svg]:[color:inherit]",
                    '[.pro-sidebar-navigation-navigation_&_>_svg]:flex-none',
                    '[.pro-sidebar-navigation-navigation_&_>_svg]:[width:var(--navigation-menu-icon-size)]',
                    '[.pro-sidebar-navigation-navigation_&_>_svg]:[height:var(--navigation-menu-icon-size)]',
                    '[.pro-sidebar-navigation-navigation_&_>_svg]:text-icon-secondary',
                  ].join(' ')}
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
                className={[
                  '[.pro-sidebar-navigation-navigation_&]:[background:transparent] [.pro-sidebar-navigation-navigation_&]:text-text-primary',
                  '[.pro-sidebar-navigation-navigation_&]:[font-weight:var(--vd-font-weight-600)]',
                  '[.pro-sidebar-navigation-navigation_&:hover]:bg-fill-hover',
                  "[.pro-sidebar-navigation-navigation_&[data-current-group='true']]:text-brand-link",
                  "[.pro-sidebar-navigation-navigation_&[data-current-group='true']:hover]:text-brand-link",
                  "[.pro-sidebar-navigation-navigation_&[data-current-group='true']_[data-slot='icon']]:[color:inherit]",
                  "[.pro-sidebar-navigation-navigation_&[data-current-group='true']_[data-slot='indicator']]:[color:inherit]",
                ].join(' ')}
                data-current-group={currentGroup === group.id || undefined}
                aria-label={group.label}
                indicator={!collapsed}
              >
                {group.label}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content
                arrow={collapsed && showOverlayArrows}
                className={[
                  "[.pro-sidebar-navigation-navigation_&[data-slot='content']]:ms-0 [.pro-sidebar-navigation-navigation_&[data-slot='content']]:ps-0",
                  "[.pro-sidebar-navigation-navigation_&[data-slot='content']]:[border-inline-start:0]",
                  "[.pro-sidebar-navigation-navigation_&[data-slot='content']_[data-vd-navigation-menu-control]]:[padding-inline-start:calc(_var(--navigation-menu-control-padding)_+_var(--navigation-menu-icon-size)_+_var(--vd-spacing-8)_)]",
                  '[--navigation-menu-control-height:var(--vd-control-medium-height,_var(--vd-sizing-36))]',
                  '[--navigation-menu-radius:var(--vd-shape-radius-6,_var(--vd-radius-6))] text-(length:--vd-font-size-13)',
                  "[&_a[data-vd-navigation-menu-control][data-active='true']]:text-brand-link",
                  "[&_a[data-vd-navigation-menu-control][data-active='true']]:bg-brand-subtle-hover",
                  "[&_a[data-vd-navigation-menu-control][data-active='true']]:[font-weight:var(--vd-font-weight-500)]",
                  "[&_a[data-vd-navigation-menu-control][data-active='true']:hover]:text-brand-link",
                  "[&_a[data-vd-navigation-menu-control][data-active='true']:hover]:bg-brand-subtle-hover",
                  "[&_a[data-vd-navigation-menu-control][data-active='true']:hover]:[font-weight:var(--vd-font-weight-500)]",
                ].join(' ')}
              >
                {collapsed ? (
                  <NavigationMenu.Group
                    {...(showSubmenuHeader
                      ? { 'aria-labelledby': labelId }
                      : { 'aria-label': group.label })}
                  >
                    {showSubmenuHeader ? (
                      <>
                        <NavigationMenu.GroupLabel
                          id={labelId}
                          className={[
                            'flex items-center gap-8 text-brand-link text-(length:--vd-font-size-13) [font-weight:var(--vd-font-weight-600)]',
                            '[&_>_svg]:flex-none [&_>_svg]:[width:var(--vd-sizing-16)] [&_>_svg]:[height:var(--vd-sizing-16)] [&_>_svg]:text-brand-link',
                          ].join(' ')}
                        >
                          <group.icon aria-hidden="true" />
                          {group.label}
                        </NavigationMenu.GroupLabel>
                        <Separator decorative className="mb-4" />
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

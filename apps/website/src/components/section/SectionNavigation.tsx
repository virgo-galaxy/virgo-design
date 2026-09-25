import { NavigationMenu } from '@virgo-design/ui';
import { Fragment, type ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export interface SectionNavigationItem {
  path: string;
  label: string;
  icon?: ReactNode;
}

interface SectionNavigationProps {
  ariaLabel: string;
  items: readonly SectionNavigationItem[];
}

export function SectionNavigation({ ariaLabel, items }: SectionNavigationProps) {
  const { pathname } = useLocation();
  const activePath = items.find((item) => item.path === pathname)?.path ?? '';

  return (
    <NavigationMenu.Root
      aria-label={ariaLabel}
      orientation="horizontal"
      value={activePath}
      variant="segmented"
    >
      <NavigationMenu.List>
        {items.map((item, index) => (
          <Fragment key={item.path}>
            {index > 0 ? <NavigationMenu.Separator /> : null}
            <NavigationMenu.Item icon={item.icon} value={item.path}>
              <NavigationMenu.Link
                href={item.path}
                render={({ className, href, style, ...props }) => (
                  <NavLink
                    {...props}
                    className={className ?? ''}
                    end
                    style={style ?? {}}
                    to={href ?? item.path}
                  />
                )}
              >
                {item.label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </Fragment>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

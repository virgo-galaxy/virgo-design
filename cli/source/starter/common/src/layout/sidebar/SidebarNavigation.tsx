import { GaugeIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { Link } from '@/app/Link';
import { usePathname } from '@/app/navigation';
import { workplacePath } from '@/app/paths';
import * as classes from '@/styles/classes';

export function SidebarNavigation({ collapsed }: { collapsed: boolean }) {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <NavigationMenu
      key={collapsed ? 'compact' : 'expanded'}
      orientation="vertical"
      submenu={collapsed ? 'popover' : 'inline'}
      value={pathname}
      className={classes.navigation}
      data-compact={collapsed}
      aria-label={t('sidebar.mainNavigation')}
    >
      <NavigationMenu.List>
        <NavigationMenu.Item
          value="dashboard"
          icon={<GaugeIcon />}
          {...(collapsed ? {} : { defaultExpanded: true })}
        >
          <NavigationMenu.Trigger
            className={classes.navigationGroup}
            aria-label={t('app.dashboard')}
            indicator={!collapsed}
          >
            {t('app.dashboard')}
          </NavigationMenu.Trigger>
          <NavigationMenu.Content arrow={collapsed} className={classes.navigationContent}>
            <NavigationMenu.Item value={workplacePath}>
              <NavigationMenu.Link
                href={workplacePath}
                aria-label={t('app.workplace')}
                render={(props) => <Link {...props} to={workplacePath} />}
              >
                {t('app.workplace')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  );
}

import './NavigationVerticalExample.module.scss';

import { DashboardIcon, GlobeIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <NavigationMenu.Root
      aria-label={t('examples.navigationMenu.copy.leftNavigation')}
      defaultValue="dashboard"
      orientation="vertical"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="dashboard" icon={<DashboardIcon />}>
          <NavigationMenu.Link href="#navigation-view A">
            {t('examples.navigationMenu.copy.dashboard')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="projects" icon={<LayoutIcon />}>
          <NavigationMenu.Link href="#navigation-items">
            {t('examples.navigationMenu.copy.projects')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="settings" icon={<SettingsIcon />}>
          <NavigationMenu.Link href="#navigation-settings">
            {t('examples.navigationMenu.copy.settings')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item disabled value="billing" icon={<GlobeIcon />}>
          <NavigationMenu.Link href="#navigation-section B">
            {t('examples.navigationMenu.copy.billing')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

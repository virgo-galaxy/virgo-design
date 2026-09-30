import './NavigationSegmentedIconsExample.module.scss';

import { HomeIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <NavigationMenu.Root
      aria-label={t('examples.navigationMenu.copy.sectionNavigationWithIcons')}
      defaultValue="overview"
      variant="segmented"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="overview" icon={<HomeIcon />}>
          <NavigationMenu.Link href="#navigation-overview">
            {t('examples.navigationMenu.copy.overview')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Separator />
        <NavigationMenu.Item value="projects" icon={<LayoutIcon />}>
          <NavigationMenu.Link href="#navigation-projects">
            {t('examples.navigationMenu.copy.projects')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Separator />
        <NavigationMenu.Item value="settings" icon={<SettingsIcon />}>
          <NavigationMenu.Link href="#navigation-settings">
            {t('examples.navigationMenu.copy.settings')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

import './NavigationGroupedExample.module.scss';

import { NavigationMenu } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  const id = useId();
  return (
    <NavigationMenu.Root
      aria-label={t('examples.navigationMenu.copy.groupedNavigation')}
      orientation="vertical"
      defaultValue="overview"
    >
      <NavigationMenu.List>
        <NavigationMenu.Group aria-labelledby={`${id}-workspace`}>
          <NavigationMenu.GroupLabel id={`${id}-workspace`}>
            {t('examples.navigationMenu.copy.workspace')}
          </NavigationMenu.GroupLabel>
          <NavigationMenu.List>
            <NavigationMenu.Item value="overview">
              <NavigationMenu.Link href="#grouped-overview">
                {t('examples.navigationMenu.copy.overview')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="projects">
              <NavigationMenu.Link href="#grouped-items">
                {t('examples.navigationMenu.copy.projects')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Group>
        <NavigationMenu.Separator />
        <NavigationMenu.Group aria-labelledby={`${id}-settings`}>
          <NavigationMenu.GroupLabel id={`${id}-settings`}>
            {t('examples.navigationMenu.copy.settings')}
          </NavigationMenu.GroupLabel>
          <NavigationMenu.List>
            <NavigationMenu.Item value="profile">
              <NavigationMenu.Link href="#grouped-details">
                {t('examples.navigationMenu.copy.profile')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="billing" disabled>
              <NavigationMenu.Link href="#grouped-section B">
                {t('examples.navigationMenu.copy.billing')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Group>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

import './NavigationHorizontalExample.module.scss';

import { NavigationMenu } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <NavigationMenu.Root
      aria-label={t('examples.navigationMenu.copy.topNavigation')}
      defaultValue="home"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="home">
          <NavigationMenu.Link href="#navigation-home">
            {t('examples.navigationMenu.copy.home')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="solution">
          <NavigationMenu.Link href="#navigation-solution">
            {t('examples.navigationMenu.copy.solution')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Link href="#navigation-docs">
            {t('examples.navigationMenu.copy.docs')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

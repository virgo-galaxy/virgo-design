import './NavigationSegmentedExample.module.scss';

import { NavigationMenu } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <NavigationMenu.Root
      aria-label={t('examples.navigationMenu.copy.sectionNavigation')}
      defaultValue="colors"
      variant="segmented"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="colors">
          <NavigationMenu.Link href="#navigation-colors">
            {t('examples.navigationMenu.copy.colors')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Separator />
        <NavigationMenu.Item value="typography">
          <NavigationMenu.Link href="#navigation-typography">
            {t('examples.navigationMenu.copy.typography')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Separator />
        <NavigationMenu.Item value="layout">
          <NavigationMenu.Link href="#navigation-layout">
            {t('examples.navigationMenu.copy.layout')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

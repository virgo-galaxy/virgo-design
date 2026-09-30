import './NavigationNestedExample.module.scss';

import { BotIcon, DashboardIcon, GlobeIcon, HomeIcon, LayoutIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <NavigationMenu.Root
      aria-label={t('examples.navigationMenu.copy.productNavigation')}
      defaultValue="cloud"
      orientation="vertical"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item defaultExpanded value="products" icon={<LayoutIcon />}>
          <NavigationMenu.Trigger>
            {t('examples.navigationMenu.copy.products')}
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="cloud" icon={<GlobeIcon />}>
              <NavigationMenu.Link href="#navigation-cloud">
                {t('examples.navigationMenu.copy.cloud')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="storage" icon={<DashboardIcon />}>
              <NavigationMenu.Link href="#navigation-storage">
                {t('examples.navigationMenu.copy.storage')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="ai" icon={<BotIcon />}>
              <NavigationMenu.Link href="#navigation-ai">
                {t('examples.navigationMenu.copy.ai')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="overview" icon={<HomeIcon />}>
          <NavigationMenu.Link href="#navigation-overview">
            {t('examples.navigationMenu.copy.overview')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

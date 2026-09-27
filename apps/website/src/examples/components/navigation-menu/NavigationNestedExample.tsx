import './NavigationNestedExample.module.scss';

import { BotIcon, DashboardIcon, GlobeIcon, HomeIcon, LayoutIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';

export default function App() {
  return (
    <NavigationMenu.Root
      aria-label="Product navigation"
      defaultValue="cloud"
      orientation="vertical"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item defaultExpanded value="products" icon={<LayoutIcon />}>
          <NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="cloud" icon={<GlobeIcon />}>
              <NavigationMenu.Link href="#navigation-cloud">Cloud</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="storage" icon={<DashboardIcon />}>
              <NavigationMenu.Link href="#navigation-storage">Storage</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="ai" icon={<BotIcon />}>
              <NavigationMenu.Link href="#navigation-ai">AI</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="overview" icon={<HomeIcon />}>
          <NavigationMenu.Link href="#navigation-overview">Overview</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

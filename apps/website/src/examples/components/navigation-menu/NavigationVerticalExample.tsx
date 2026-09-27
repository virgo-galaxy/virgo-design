import './NavigationVerticalExample.module.scss';

import { DashboardIcon, GlobeIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';

export default function App() {
  return (
    <NavigationMenu.Root
      aria-label="Left navigation"
      defaultValue="dashboard"
      orientation="vertical"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="dashboard" icon={<DashboardIcon />}>
          <NavigationMenu.Link href="#navigation-dashboard">Dashboard</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="projects" icon={<LayoutIcon />}>
          <NavigationMenu.Link href="#navigation-projects">Projects</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="settings" icon={<SettingsIcon />}>
          <NavigationMenu.Link href="#navigation-settings">Settings</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item disabled value="billing" icon={<GlobeIcon />}>
          <NavigationMenu.Link href="#navigation-billing">Billing</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

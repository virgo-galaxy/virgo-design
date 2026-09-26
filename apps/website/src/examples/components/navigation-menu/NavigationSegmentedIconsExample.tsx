import { HomeIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';

export default function App() {
  return (
    <NavigationMenu.Root
      aria-label="Section navigation with icons"
      defaultValue="overview"
      variant="segmented"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="overview" icon={<HomeIcon />}>
          <NavigationMenu.Link href="#navigation-overview">Overview</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Separator />
        <NavigationMenu.Item value="projects" icon={<LayoutIcon />}>
          <NavigationMenu.Link href="#navigation-projects">Projects</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Separator />
        <NavigationMenu.Item value="settings" icon={<SettingsIcon />}>
          <NavigationMenu.Link href="#navigation-settings">Settings</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

import { NavigationMenu } from '@virgo-design/ui';
import { useId } from 'react';

export default function App() {
  const id = useId();
  return (
    <NavigationMenu.Root
      aria-label="Grouped navigation"
      orientation="vertical"
      defaultValue="overview"
    >
      <NavigationMenu.List>
        <NavigationMenu.Group aria-labelledby={`${id}-workspace`}>
          <NavigationMenu.GroupLabel id={`${id}-workspace`}>Workspace</NavigationMenu.GroupLabel>
          <NavigationMenu.List>
            <NavigationMenu.Item value="overview">
              <NavigationMenu.Link href="#grouped-overview">Overview</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="projects">
              <NavigationMenu.Link href="#grouped-projects">Projects</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Group>
        <NavigationMenu.Separator />
        <NavigationMenu.Group aria-labelledby={`${id}-settings`}>
          <NavigationMenu.GroupLabel id={`${id}-settings`}>Settings</NavigationMenu.GroupLabel>
          <NavigationMenu.List>
            <NavigationMenu.Item value="profile">
              <NavigationMenu.Link href="#grouped-profile">Profile</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="billing" disabled>
              <NavigationMenu.Link href="#grouped-billing">Billing</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Group>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

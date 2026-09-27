import './NavigationHorizontalExample.module.scss';

import { NavigationMenu } from '@virgo-design/ui';

export default function App() {
  return (
    <NavigationMenu.Root aria-label="Top navigation" defaultValue="home">
      <NavigationMenu.List>
        <NavigationMenu.Item value="home">
          <NavigationMenu.Link href="#navigation-home">Home</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="solution">
          <NavigationMenu.Link href="#navigation-solution">Solution</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="docs">
          <NavigationMenu.Link href="#navigation-docs">Docs</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

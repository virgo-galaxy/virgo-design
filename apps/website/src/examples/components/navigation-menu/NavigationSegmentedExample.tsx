import './NavigationSegmentedExample.module.scss';

import { NavigationMenu } from '@virgo-design/ui';

export default function App() {
  return (
    <NavigationMenu.Root aria-label="Section navigation" defaultValue="colors" variant="segmented">
      <NavigationMenu.List>
        <NavigationMenu.Item value="colors">
          <NavigationMenu.Link href="#navigation-colors">Colors</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Separator />
        <NavigationMenu.Item value="typography">
          <NavigationMenu.Link href="#navigation-typography">Typography</NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Separator />
        <NavigationMenu.Item value="layout">
          <NavigationMenu.Link href="#navigation-layout">Layout</NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

import './NavigationPopoverExample.module.scss';

import { DashboardIcon, GlobeIcon, SettingsIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';

export default function App() {
  return (
    <NavigationMenu.Root
      aria-label="Hover submenu navigation"
      orientation="vertical"
      submenu="popover"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="navigation-one" icon={<GlobeIcon />}>
          <NavigationMenu.Trigger>Navigation One</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="option-one">
              <NavigationMenu.Link href="#navigation-option-one">Option 1</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-two">
              <NavigationMenu.Link href="#navigation-option-two">Option 2</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-three">
              <NavigationMenu.Link href="#navigation-option-three">Option 3</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-four">
              <NavigationMenu.Link href="#navigation-option-four">Option 4</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="navigation-two" icon={<DashboardIcon />}>
          <NavigationMenu.Trigger>Navigation Two</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="option-five">
              <NavigationMenu.Link href="#navigation-option-five">Option 5</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-six">
              <NavigationMenu.Link href="#navigation-option-six">Option 6</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="submenu">
              <NavigationMenu.Trigger>Submenu</NavigationMenu.Trigger>
              <NavigationMenu.Content>
                <NavigationMenu.Item value="option-seven">
                  <NavigationMenu.Link href="#navigation-option-seven">
                    Option 7
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="option-eight">
                  <NavigationMenu.Link href="#navigation-option-eight">
                    Option 8
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="navigation-three" icon={<SettingsIcon />}>
          <NavigationMenu.Trigger>Navigation Three</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="preferences">
              <NavigationMenu.Link href="#navigation-preferences">Preferences</NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="account">
              <NavigationMenu.Link href="#navigation-account">Account</NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

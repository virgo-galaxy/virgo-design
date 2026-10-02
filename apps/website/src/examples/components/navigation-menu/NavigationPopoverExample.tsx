import './NavigationPopoverExample.module.scss';

import { DashboardIcon, GlobeIcon, SettingsIcon } from '@virgo-design/icons';
import { NavigationMenu } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <NavigationMenu.Root
      aria-label={t('examples.navigationMenu.copy.hoverSubmenuNavigation')}
      orientation="vertical"
      submenu="popover"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="navigation-one" icon={<GlobeIcon />}>
          <NavigationMenu.Trigger>
            {t('examples.navigationMenu.copy.navigationOne')}
          </NavigationMenu.Trigger>
          <NavigationMenu.Content arrow>
            <NavigationMenu.Item value="option-one">
              <NavigationMenu.Link href="#navigation-option-one">
                {t('examples.navigationMenu.copy.option1')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-two">
              <NavigationMenu.Link href="#navigation-option-two">
                {t('examples.navigationMenu.copy.option2')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-three">
              <NavigationMenu.Link href="#navigation-option-three">
                {t('examples.navigationMenu.copy.option3')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-four">
              <NavigationMenu.Link href="#navigation-option-four">
                {t('examples.navigationMenu.copy.option4')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="navigation-two" icon={<DashboardIcon />}>
          <NavigationMenu.Trigger>
            {t('examples.navigationMenu.copy.navigationTwo')}
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="option-five">
              <NavigationMenu.Link href="#navigation-option-five">
                {t('examples.navigationMenu.copy.option5')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="option-six">
              <NavigationMenu.Link href="#navigation-option-six">
                {t('examples.navigationMenu.copy.option6')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="submenu">
              <NavigationMenu.Trigger>
                {t('examples.navigationMenu.copy.submenu')}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content arrow>
                <NavigationMenu.Item value="option-seven">
                  <NavigationMenu.Link href="#navigation-option-seven">
                    {t('examples.navigationMenu.copy.option7')}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item value="option-eight">
                  <NavigationMenu.Link href="#navigation-option-eight">
                    {t('examples.navigationMenu.copy.option8')}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="navigation-three" icon={<SettingsIcon />}>
          <NavigationMenu.Trigger>
            {t('examples.navigationMenu.copy.navigationThree')}
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Item value="preferences">
              <NavigationMenu.Link href="#navigation-preferences">
                {t('examples.navigationMenu.copy.preferences')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="account">
              <NavigationMenu.Link href="#navigation-account">
                {t('examples.navigationMenu.copy.account')}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

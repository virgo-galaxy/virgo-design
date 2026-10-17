import { NavigationMenu } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function NavigationMenuExample() {
  const { t } = useTranslation();

  return (
    <NavigationMenu
      aria-label={t('primitives.examples.exampleNavigation')}
      data-docs-primitive="navigation-menu"
    >
      <NavigationMenu.List>
        <NavigationMenu.Item value="overview">
          <NavigationMenu.Link href="#overview">
            {t('primitives.examples.overview')}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item value="learn">
          <NavigationMenu.Trigger>{t('primitives.examples.learn')}</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <li>
              <a href="#guides">{t('primitives.examples.guides')}</a>
            </li>
            <li>
              <a href="#examples">{t('primitives.examples.examples')}</a>
            </li>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu>
  );
}

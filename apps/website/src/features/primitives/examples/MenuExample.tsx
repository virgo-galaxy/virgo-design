import { Menu } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function MenuExample() {
  const { t } = useTranslation();

  return (
    <Menu data-docs-primitive="menu">
      <Menu.Trigger>{t('primitives.examples.openMenu')}</Menu.Trigger>
      <Menu.Content {...portalProps}>
        <Menu.Item>{t('primitives.examples.copy')}</Menu.Item>
        <Menu.Item>{t('primitives.examples.paste')}</Menu.Item>
        <Menu.Submenu>
          <Menu.SubmenuTrigger>{t('primitives.examples.export')}</Menu.SubmenuTrigger>
          <Menu.SubmenuContent {...portalProps}>
            <Menu.Item>PDF</Menu.Item>
            <Menu.Item>SVG</Menu.Item>
          </Menu.SubmenuContent>
        </Menu.Submenu>
      </Menu.Content>
    </Menu>
  );
}

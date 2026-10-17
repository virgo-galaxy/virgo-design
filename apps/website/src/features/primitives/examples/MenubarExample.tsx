import { Menubar } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function MenubarExample() {
  const { t } = useTranslation();

  return (
    <Menubar aria-label={t('primitives.examples.exampleApplication')} data-docs-primitive="menubar">
      <Menubar.Menu value="file">
        <Menubar.Trigger>{t('primitives.examples.file')}</Menubar.Trigger>
        <Menubar.Content {...portalProps}>
          <Menubar.Item>{t('primitives.examples.new')}</Menubar.Item>
          <Menubar.Item>{t('primitives.examples.save')}</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
      <Menubar.Menu value="edit">
        <Menubar.Trigger>{t('primitives.examples.edit')}</Menubar.Trigger>
        <Menubar.Content {...portalProps}>
          <Menubar.Item>{t('primitives.examples.undo')}</Menubar.Item>
          <Menubar.Item>{t('primitives.examples.redo')}</Menubar.Item>
        </Menubar.Content>
      </Menubar.Menu>
    </Menubar>
  );
}

import { ContextMenu } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function ContextMenuExample() {
  const { t } = useTranslation();

  return (
    <ContextMenu data-docs-primitive="context-menu">
      <ContextMenu.Trigger>{t('primitives.examples.rightClickThisFile')}</ContextMenu.Trigger>
      <ContextMenu.Content {...portalProps}>
        <ContextMenu.Item>{t('primitives.examples.rename')}</ContextMenu.Item>
        <ContextMenu.Item>{t('primitives.examples.duplicate')}</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  );
}

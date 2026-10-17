import { Popover } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function PopoverExample() {
  const { t } = useTranslation();

  return (
    <Popover data-docs-primitive="popover">
      <Popover.Trigger>{t('primitives.examples.openPopover')}</Popover.Trigger>
      <Popover.Content {...portalProps}>
        <p>{t('primitives.examples.thisPanelIsPositionedRelativeToItsTrigger')}</p>
        <Popover.Close>{t('primitives.examples.close')}</Popover.Close>
      </Popover.Content>
    </Popover>
  );
}

import { Dropdown } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function DropdownExample() {
  const { t } = useTranslation();

  return (
    <Dropdown data-docs-primitive="dropdown">
      <Dropdown.Trigger>{t('primitives.examples.actions')}</Dropdown.Trigger>
      <Dropdown.Content {...portalProps}>
        <Dropdown.Item>{t('primitives.examples.rename')}</Dropdown.Item>
        <Dropdown.Item>{t('primitives.examples.duplicate')}</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>{t('primitives.examples.archive')}</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

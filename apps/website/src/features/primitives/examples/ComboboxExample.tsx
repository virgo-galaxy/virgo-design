import { Combobox } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function ComboboxExample() {
  const { t } = useTranslation();

  return (
    <Combobox data-docs-primitive="combobox">
      <Combobox.Input aria-label={t('primitives.examples.displayName')} />
      <Combobox.Content {...portalProps}>
        <Combobox.Option value="virgo" textValue="Example">
          Example
        </Combobox.Option>
        <Combobox.Option value="design" textValue="Design">
          Design
        </Combobox.Option>
      </Combobox.Content>
    </Combobox>
  );
}

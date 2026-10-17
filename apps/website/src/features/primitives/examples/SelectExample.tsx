import { Select } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function SelectExample() {
  const { t } = useTranslation();

  return (
    <Select defaultValue="design" name="project" data-docs-primitive="select">
      <Select.Trigger aria-label={t('primitives.examples.project')}>
        {t('primitives.examples.chooseProject')}
      </Select.Trigger>
      <Select.Content {...portalProps}>
        <Select.Option value="design">Item A</Select.Option>
        <Select.Option value="docs">{t('primitives.examples.virgoDocs')}</Select.Option>
      </Select.Content>
    </Select>
  );
}

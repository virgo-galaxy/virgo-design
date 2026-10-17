import './CheckboxGroupExample.module.scss';

import { Checkbox } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  const name = useId();

  return (
    <Checkbox.Group
      defaultValue={['option-b', 'option-c']}
      name={name}
      aria-label={t('examples.checkbox.copy.options')}
    >
      <Checkbox value="option-a">{t('examples.checkbox.copy.optionA')}</Checkbox>
      <Checkbox value="option-b">{t('examples.checkbox.copy.optionB')}</Checkbox>
      <Checkbox value="option-c">{t('examples.checkbox.copy.optionC')}</Checkbox>
    </Checkbox.Group>
  );
}

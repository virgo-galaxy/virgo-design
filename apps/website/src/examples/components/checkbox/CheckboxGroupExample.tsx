import './CheckboxGroupExample.module.scss';

import { Checkbox } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  const name = useId();
  return (
    <Checkbox.Group
      defaultValue={['pear', 'orange']}
      name={name}
      aria-label={t('examples.checkbox.copy.fruit')}
    >
      <Checkbox value="apple">{t('examples.checkbox.copy.apple')}</Checkbox>
      <Checkbox value="pear">{t('examples.checkbox.copy.pear')}</Checkbox>
      <Checkbox value="orange">{t('examples.checkbox.copy.orange')}</Checkbox>
    </Checkbox.Group>
  );
}

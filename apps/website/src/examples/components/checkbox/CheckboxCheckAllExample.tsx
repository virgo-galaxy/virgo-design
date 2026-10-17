import { Checkbox, Separator } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CheckboxCheckAllExample.module.scss';

const values = ['option-a', 'option-b', 'option-c'];

export default function App() {
  const { t } = useTranslation();

  const name = useId();
  const [selected, setSelected] = useState<string[]>(['option-a', 'option-c']);
  const allChecked = selected.length === values.length;
  const partiallyChecked = selected.length > 0 && !allChecked;

  return (
    <div className={styles.root!}>
      <Checkbox
        checked={allChecked}
        indeterminate={partiallyChecked}
        onChange={(event) => setSelected(event.currentTarget.checked ? [...values] : [])}
      >
        {t('examples.checkbox.copy.checkAll')}
      </Checkbox>
      <Separator decorative />
      <Checkbox.Group
        value={selected}
        onValueChange={setSelected}
        name={name}
        aria-label={t('examples.checkbox.copy.checkAllOptions')}
      >
        <Checkbox value="option-a">{t('examples.checkbox.copy.optionA')}</Checkbox>
        <Checkbox value="option-b">{t('examples.checkbox.copy.optionB')}</Checkbox>
        <Checkbox value="option-c">{t('examples.checkbox.copy.optionC')}</Checkbox>
      </Checkbox.Group>
    </div>
  );
}

import { Checkbox, Separator } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CheckboxCheckAllExample.module.scss';

const values = ['apple', 'pear', 'orange'];

export default function App() {
  const { t } = useTranslation();

  const name = useId();
  const [selected, setSelected] = useState<string[]>(['apple', 'orange']);
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
        aria-label={t('examples.checkbox.copy.checkAllFruit')}
      >
        <Checkbox value="apple">{t('examples.checkbox.copy.apple')}</Checkbox>
        <Checkbox value="pear">{t('examples.checkbox.copy.pear')}</Checkbox>
        <Checkbox value="orange">{t('examples.checkbox.copy.orange')}</Checkbox>
      </Checkbox.Group>
    </div>
  );
}

import { Select } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SelectMultipleExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState<string[]>([]);
  return (
    <div className={styles.root}>
      <Select.Multiple value={value} onValueChange={setValue}>
        <Select.Trigger
          aria-label={t('examples.select.copy.item')}
          placeholder={t('examples.select.copy.allItems')}
        />
        <Select.Content>
          <Select.Option value="design">Item A</Select.Option>
          <Select.Option value="docs">{t('examples.select.copy.itemD')}</Select.Option>
          <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
        </Select.Content>
      </Select.Multiple>
    </div>
  );
}

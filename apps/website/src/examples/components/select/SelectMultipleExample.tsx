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
          aria-label={t('examples.select.copy.project')}
          placeholder={t('examples.select.copy.allProjects')}
        />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">{t('examples.select.copy.cloudDocs')}</Select.Option>
          <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
        </Select.Content>
      </Select.Multiple>
    </div>
  );
}

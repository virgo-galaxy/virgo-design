import { Select } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SelectContentExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Select>
        <Select.Trigger
          aria-label={t('examples.select.copy.chooseProject')}
          placeholder={t('examples.select.copy.chooseAProject')}
        />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">{t('examples.select.copy.cloudDocs')}</Select.Option>
          <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
        </Select.Content>
      </Select>
      <Select defaultValue="docs">
        <Select.Trigger aria-label={t('examples.select.copy.selectedProject')} />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">{t('examples.select.copy.cloudDocs')}</Select.Option>
          <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}

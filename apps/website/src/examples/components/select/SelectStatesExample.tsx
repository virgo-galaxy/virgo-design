import { Select } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SelectStatesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Select>
        <Select.Trigger
          aria-label={t('examples.select.copy.defaultProject')}
          placeholder={t('examples.select.copy.project')}
        />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">{t('examples.select.copy.cloudDocs')}</Select.Option>
          <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
        </Select.Content>
      </Select>
      <Select disabled defaultValue="design">
        <Select.Trigger aria-label={t('examples.select.copy.disabledProject')} />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">{t('examples.select.copy.cloudDocs')}</Select.Option>
          <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
        </Select.Content>
      </Select>
      <Select invalid>
        <Select.Trigger
          aria-label={t('examples.select.copy.invalidProject')}
          placeholder={t('examples.select.copy.chooseAProject')}
        />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">{t('examples.select.copy.cloudDocs')}</Select.Option>
          <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}

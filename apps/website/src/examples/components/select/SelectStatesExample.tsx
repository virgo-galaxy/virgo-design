import { Select } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SelectStatesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Select>
        <Select.Trigger
          aria-label={t('examples.select.copy.defaultItem')}
          placeholder={t('examples.select.copy.item')}
        />
        <Select.Content>
          <Select.Option value="design">Item A</Select.Option>
          <Select.Option value="docs">{t('examples.select.copy.itemD')}</Select.Option>
          <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
        </Select.Content>
      </Select>
      <Select disabled defaultValue="design">
        <Select.Trigger aria-label={t('examples.select.copy.disabledItem')} />
        <Select.Content>
          <Select.Option value="design">Item A</Select.Option>
          <Select.Option value="docs">{t('examples.select.copy.itemD')}</Select.Option>
          <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
        </Select.Content>
      </Select>
      <Select invalid>
        <Select.Trigger
          aria-label={t('examples.select.copy.invalidItem')}
          placeholder={t('examples.select.copy.chooseAnItem')}
        />
        <Select.Content>
          <Select.Option value="design">Item A</Select.Option>
          <Select.Option value="docs">{t('examples.select.copy.itemD')}</Select.Option>
          <Select.Option value="runtime">{t('examples.select.copy.runtime')}</Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}

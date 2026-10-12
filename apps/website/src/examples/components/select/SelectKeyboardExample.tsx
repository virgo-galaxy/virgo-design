import { Select } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SelectKeyboardExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Select>
        <Select.Trigger
          aria-label={t('examples.select.copy.keyboardItem')}
          placeholder={t('examples.select.copy.focusThenUseArrowdown')}
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

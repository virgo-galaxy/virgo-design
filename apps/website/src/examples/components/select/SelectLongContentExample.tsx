import { Select } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SelectLongContentExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Select defaultValue="long">
        <Select.Trigger aria-label={t('examples.select.copy.longItem')} />
        <Select.Content>
          <Select.Option value="short">{t('examples.select.copy.shortName')}</Select.Option>
          <Select.Option value="long">
            {t('examples.select.copy.aVeryLongProjectNameThatShouldNotWidenThe')}
          </Select.Option>
          <Select.Option value="other">{t('examples.select.copy.anotherItem')}</Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}

import { Select } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SelectDisabledOptionExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Select defaultValue="homelab">
        <Select.Trigger aria-label={t('examples.select.copy.environment')} />
        <Select.Content>
          <Select.Option value="local">{t('examples.select.copy.local')}</Select.Option>
          <Select.Option value="homelab">{t('examples.select.copy.homeLab')}</Select.Option>
          <Select.Option value="production" disabled>
            {t('examples.select.copy.production')}
          </Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}

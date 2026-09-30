import { Separator } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SeparatorHorizontalExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <span>{t('examples.separator.copy.accountDetails')}</span>
      <Separator />
      <span>{t('examples.separator.copy.notificationPreferences')}</span>
      <Separator />
      <span>{t('examples.separator.copy.securitySettings')}</span>
    </div>
  );
}

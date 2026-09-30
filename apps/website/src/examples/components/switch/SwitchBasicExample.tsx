import { Switch } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SwitchBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Switch aria-label={t('examples.switch.copy.notificationsOff')} />
      <Switch aria-label={t('examples.switch.copy.notificationsOn')} defaultChecked />
    </div>
  );
}

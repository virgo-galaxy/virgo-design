import { Switch } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SwitchSizesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Switch aria-label={t('examples.switch.copy.defaultSwitch')} defaultChecked />
      <Switch aria-label={t('examples.switch.copy.smallSwitch')} size="small" defaultChecked />
    </div>
  );
}

import { Switch } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SwitchTextExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Switch
        aria-label={t('examples.switch.copy.power')}
        checkedContent="On"
        uncheckedContent="Off"
        defaultChecked
      />
      <Switch
        aria-label={t('examples.switch.copy.binary')}
        checkedContent="1"
        uncheckedContent="0"
      />
    </div>
  );
}

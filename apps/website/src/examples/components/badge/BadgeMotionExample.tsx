import { Badge } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './BadgeMotionExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <span className={styles.status!}>
        <Badge dot intent="success" />
        {t('components.badge.motion.static')}
      </span>
      <span className={styles.status!}>
        <Badge dot intent="success" animation="breathe" />
        {t('components.badge.motion.breathing')}
      </span>
    </div>
  );
}

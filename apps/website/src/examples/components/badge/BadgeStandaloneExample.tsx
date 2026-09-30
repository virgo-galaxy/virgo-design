import { Badge } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './BadgeStandaloneExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <span>
        {t('examples.badge.copy.queued')}
        <Badge count={12} />
      </span>
      <span>
        {t('examples.badge.copy.release')}
        <Badge count="New" intent="info" />
      </span>
    </div>
  );
}

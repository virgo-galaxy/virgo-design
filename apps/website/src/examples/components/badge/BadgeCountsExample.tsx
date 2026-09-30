import { Badge, Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './BadgeCountsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Badge count={8}>
        <Button variant="outline">{t('examples.badge.copy.inbox')}</Button>
      </Badge>
      <Badge count={120} max={99}>
        <Button variant="outline">{t('examples.badge.copy.updates')}</Button>
      </Badge>
      <Badge count="New" intent="info">
        <Button variant="outline">{t('examples.badge.copy.release')}</Button>
      </Badge>
    </div>
  );
}

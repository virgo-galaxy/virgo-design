import { Badge, Button } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './BadgeZeroExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Badge count={0}>
        <Button variant="outline">{t('examples.badge.copy.zeroHidden')}</Button>
      </Badge>
      <Badge count={0} showZero>
        <Button variant="outline">{t('examples.badge.copy.zeroShown')}</Button>
      </Badge>
    </div>
  );
}

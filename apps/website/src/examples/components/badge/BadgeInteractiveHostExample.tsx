import { Badge, Button } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './BadgeInteractiveHostExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [opens, setOpens] = useState(0);
  return (
    <div className={styles.root!}>
      <Badge count={3} intent="danger">
        <Button onClick={() => setOpens((value) => value + 1)}>
          {t('examples.badge.copy.inbox')}
        </Button>
      </Badge>
      <span role="status">
        {t('examples.badge.copy.inboxOpened')} {opens}
      </span>
    </div>
  );
}

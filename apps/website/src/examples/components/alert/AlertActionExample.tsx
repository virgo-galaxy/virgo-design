import { Alert, Button } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './AlertActionExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [retries, setRetries] = useState(0);
  return (
    <div className={styles.root!}>
      <Alert intent="error">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>{t('examples.alert.copy.deploymentFailed')}</Alert.Title>
          <Alert.Description>
            {t('examples.alert.copy.retryAfterCheckingTheServiceConnection')}
          </Alert.Description>
        </Alert.Content>
        <Alert.Action>
          <Button size="small" variant="outline" onClick={() => setRetries((n) => n + 1)}>
            {t('examples.alert.copy.retry')}
          </Button>
        </Alert.Action>
      </Alert>
      <span role="status">
        {t('examples.alert.copy.retryRequests')} {retries}
      </span>
    </div>
  );
}

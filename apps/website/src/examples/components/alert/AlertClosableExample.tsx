import { Alert, Button } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './AlertClosableExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(true);

  return (
    <div className={styles.root!}>
      {visible ? (
        <Alert intent="info">
          <Alert.Icon />
          <Alert.Content>
            <Alert.Title>{t('examples.alert.copy.reviewRequested')}</Alert.Title>
            <Alert.Description>
              {t('examples.alert.copy.aTeammateRequestedFeedbackOnThisWorkspace')}
            </Alert.Description>
          </Alert.Content>
          <Alert.Close onClick={() => setVisible(false)} />
        </Alert>
      ) : (
        <Button size="small" variant="outline" onClick={() => setVisible(true)}>
          {t('examples.alert.copy.restoreAlert')}
        </Button>
      )}
    </div>
  );
}

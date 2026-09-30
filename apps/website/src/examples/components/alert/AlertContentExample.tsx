import { Alert } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './AlertContentExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Alert intent="success" variant="outline">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>{t('examples.alert.copy.changesSaved')}</Alert.Title>
        </Alert.Content>
      </Alert>
      <Alert intent="info">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>{t('examples.alert.copy.scheduledMaintenance')}</Alert.Title>
          <Alert.Description>
            {t('examples.alert.copy.editingWillBeUnavailableForApproximatelyTenMinutes')}
          </Alert.Description>
        </Alert.Content>
      </Alert>
    </div>
  );
}

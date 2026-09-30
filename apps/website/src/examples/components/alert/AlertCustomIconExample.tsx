import { LayoutIcon } from '@virgo-design/icons';
import { Alert } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './AlertCustomIconExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Alert intent="info" icon={<LayoutIcon />} className={styles.root!}>
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>{t('examples.alert.copy.workspacePolicy')}</Alert.Title>
        <Alert.Description>
          {t('examples.alert.copy.thisProjectFollowsTheSharedRetentionPolicy')}
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}

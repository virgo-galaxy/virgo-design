import { Alert } from '@virgo-design/ui';

import styles from './AlertContentExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Alert intent="success" variant="outline">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Changes saved</Alert.Title>
        </Alert.Content>
      </Alert>
      <Alert intent="info">
        <Alert.Icon />
        <Alert.Content>
          <Alert.Title>Scheduled maintenance</Alert.Title>
          <Alert.Description>
            Editing will be unavailable for approximately ten minutes.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    </div>
  );
}

import { LayoutIcon } from '@virgo-design/icons';
import { Alert } from '@virgo-design/ui';

import styles from './AlertCustomIconExample.module.scss';

export default function App() {
  return (
    <Alert intent="info" icon={<LayoutIcon />} className={styles.root!}>
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>Workspace policy</Alert.Title>
        <Alert.Description>This project follows the shared retention policy.</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}

import { LayoutIcon } from '@virgo-design/icons';
import { Alert } from '@virgo-design/ui';

export default function App() {
  return (
    <Alert intent="info" icon={<LayoutIcon />} style={{ width: '100%', maxWidth: 640 }}>
      <Alert.Icon />
      <Alert.Content>
        <Alert.Title>Workspace policy</Alert.Title>
        <Alert.Description>This project follows the shared retention policy.</Alert.Description>
      </Alert.Content>
    </Alert>
  );
}

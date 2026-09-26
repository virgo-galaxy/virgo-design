import { Alert } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 640 }}>
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

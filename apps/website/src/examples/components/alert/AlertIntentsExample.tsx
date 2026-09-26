import { Alert, type AlertIntent } from '@virgo-design/ui';

const intents = [
  {
    intent: 'default',
    title: 'Workspace notice',
    description: 'This message remains part of the page until its owner removes it.',
  },
  {
    intent: 'info',
    title: 'New settings available',
    description: 'Review the latest workspace preferences when convenient.',
  },
  {
    intent: 'success',
    title: 'Deployment complete',
    description: 'The production workspace is running the latest version.',
  },
  {
    intent: 'warning',
    title: 'Configuration problem',
    description: 'Update the settings before the next deployment.',
  },
  {
    intent: 'error',
    title: 'Connection failed',
    description: 'Virgo could not reach the deployment service.',
  },
] as const satisfies ReadonlyArray<{
  intent: AlertIntent;
  title: string;
  description: string;
}>;

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 640 }}>
      {intents.map(({ intent, title, description }) => (
        <Alert key={intent} intent={intent}>
          <Alert.Icon />
          <Alert.Content>
            <Alert.Title>{title}</Alert.Title>
            <Alert.Description>{description}</Alert.Description>
          </Alert.Content>
        </Alert>
      ))}
    </div>
  );
}

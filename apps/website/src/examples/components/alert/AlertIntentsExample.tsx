import { Alert, type AlertIntent } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './AlertIntentsExample.module.scss';

const intents = [
  {
    intent: 'default',
    title: 'Example notice',
    description: 'This message remains part of the page until its owner removes it.',
  },
  {
    intent: 'info',
    title: 'New settings available',
    description: 'Review the latest example preferences when convenient.',
  },
  {
    intent: 'success',
    title: 'Action complete',
    description: 'The example action completed successfully.',
  },
  {
    intent: 'warning',
    title: 'Configuration problem',
    description: 'Check the example value and try again.',
  },
  {
    intent: 'error',
    title: 'Connection failed',
    description: 'The example action could not be completed.',
  },
] as const satisfies ReadonlyArray<{
  intent: AlertIntent;
  title: string;
  description: string;
}>;

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {intents.map(({ intent, title, description }) => (
        <Alert key={intent} intent={intent}>
          <Alert.Icon />
          <Alert.Content>
            <Alert.Title>{translateExampleText(t, 'alert', title)}</Alert.Title>
            <Alert.Description>{translateExampleText(t, 'alert', description)}</Alert.Description>
          </Alert.Content>
        </Alert>
      ))}
    </div>
  );
}

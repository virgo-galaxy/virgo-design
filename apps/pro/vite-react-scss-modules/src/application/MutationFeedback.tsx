import { Alert, Spinner } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { isHttpError } from '@/lib/http';
export function MutationFeedback({ pending, error }: { pending: boolean; error: unknown }) {
  const { t } = useTranslation();
  if (pending)
    return (
      <span role="status">
        <Spinner size="sm" /> {t('shared.remote.saving')}
      </span>
    );
  if (!error) return null;
  const details = isHttpError(error) ? error.data : null;
  return (
    <Alert intent="error">
      <Alert.Title>{t('shared.remote.saveError')}</Alert.Title>
      <Alert.Description>
        {details?.detail ?? t('shared.remote.failed')}
        {details?.fields ? (
          <ul>
            {Object.entries(details.fields).map(([field, messages]) => (
              <li key={field}>{messages.join(' ')}</li>
            ))}
          </ul>
        ) : null}
      </Alert.Description>
    </Alert>
  );
}

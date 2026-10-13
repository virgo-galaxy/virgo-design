import { Button, Result, Skeleton } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { isHttpError } from '@/lib/http';
export function RemoteState({
  loading,
  error,
  retry,
}: {
  loading?: boolean;
  error?: unknown;
  retry: () => void;
}) {
  const { t } = useTranslation();
  if (loading)
    return (
      <div
        role="status"
        aria-label={t('shared.remote.loading')}
        style={{ padding: 'var(--vd-spacing-24)', display: 'grid', gap: 'var(--vd-spacing-16)' }}
      >
        <Skeleton variant="text" />
        <Skeleton style={{ height: 100 }} />
        <Skeleton style={{ height: 220 }} />
      </div>
    );
  return (
    <Result
      status="error"
      title={t('shared.remote.error')}
      description={
        isHttpError(error)
          ? (error.data?.detail ??
            t(
              `shared.remote.${error.kind === 'timeout' ? 'timeout' : error.kind === 'network' ? 'network' : 'failed'}`,
            ))
          : t('shared.remote.failed')
      }
      primaryAction={<Button onClick={retry}>{t('shared.remote.retry')}</Button>}
    />
  );
}

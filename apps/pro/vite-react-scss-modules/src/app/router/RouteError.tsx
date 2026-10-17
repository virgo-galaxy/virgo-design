import { Button, Result } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { proRouteConfig } from '@/routes';

/** Route failures stay within their outlet so navigation and session resources survive. */
export function RouteError() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Result
      status="error"
      title={t('app.routeError.title')}
      description={t('app.routeError.description')}
      primaryAction={
        <Button onClick={() => window.location.reload()}>{t('app.routeError.reload')}</Button>
      }
      secondaryAction={
        <Button onClick={() => void navigate(proRouteConfig.homePath)}>
          {t('app.routeError.home')}
        </Button>
      }
    />
  );
}

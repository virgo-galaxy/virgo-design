'use client';

import { Button, Result } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { useAppNavigation } from '@/routes/navigation';

import { routePath } from '../definitions/paths';
import { proRouteConfig } from '../definitions/routes.config';

export function RouteError() {
  const { t } = useTranslation();
  const navigate = useAppNavigation();

  return (
    <Result
      status="error"
      title={t('app.routeError.title')}
      description={t('app.routeError.description')}
      primaryAction={
        <Button onClick={() => window.location.reload()}>{t('app.routeError.reload')}</Button>
      }
      secondaryAction={
        <Button onClick={() => void navigate(routePath(proRouteConfig.home))}>
          {t('app.routeError.home')}
        </Button>
      }
    />
  );
}

import { ArrowLeftIcon } from '@virgo-design/icons';
import { Button, Result, Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import AccessDenied from '@/assets/exceptions/access-denied';
import PageNotFound from '@/assets/exceptions/page-not-found';
import ServerError from '@/assets/exceptions/server-error';
import { routePath } from '@/routes';
import { useAppNavigation } from '@/routes/navigation';

import * as styles from './ExceptionState.css';

interface ExceptionStateProps {
  code: '403' | '404' | '500';
}

export function ExceptionState({ code }: ExceptionStateProps) {
  const { t } = useTranslation();
  const navigate = useAppNavigation();
  const exception = {
    '403': {
      title: t('exceptions.accessDenied'),
      description: t('exceptions.youDonTHaveAccessToThisResource'),
      illustration: <AccessDenied />,
    },
    '404': {
      title: t('exceptions.pageNotFound'),
      description: t('exceptions.thisPageHasMovedOrNoLongerExists'),
      illustration: <PageNotFound />,
    },
    '500': {
      title: t('exceptions.serverError'),
      description: t('exceptions.somethingWentWrongOnTheServerPleaseTryAgain'),
      illustration: <ServerError />,
    },
  }[code];

  return (
    <Surface border="default" radius={12} className={styles.canvas}>
      <Result
        status={code}
        headingLevel={1}
        title={exception.title}
        description={exception.description}
        className={styles.state}
        icon={
          <span className={styles.illustration} aria-hidden="true">
            {exception.illustration}
          </span>
        }
        secondaryAction={
          code !== '403' ? (
            <Button variant="outline" onClick={() => window.location.reload()}>
              {t('exceptions.retry')}
            </Button>
          ) : undefined
        }
        primaryAction={
          <Button
            leadingIcon={<ArrowLeftIcon />}
            onClick={() => navigate(routePath('dashboard.workplace'))}
          >
            {t('exceptions.backToWorkplace')}
          </Button>
        }
      />
    </Surface>
  );
}

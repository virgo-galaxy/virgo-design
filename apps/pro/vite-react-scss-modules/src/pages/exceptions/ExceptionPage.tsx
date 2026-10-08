import { ArrowLeftIcon } from '@virgo-design/icons';
import { Button, Result, Surface } from '@virgo-design/ui';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import accessDenied from '@/assets/exceptions/access-denied.svg?raw';
import pageNotFound from '@/assets/exceptions/page-not-found.svg?raw';
import serverError from '@/assets/exceptions/server-error.svg?raw';

import styles from './ExceptionPage.module.scss';

function getExceptions(t: TFunction) {
  return {
    '403': {
      title: t('exceptions.accessDenied'),
      description: t('exceptions.youDonTHaveAccessToThisResource'),
      illustration: accessDenied,
    },
    '404': {
      title: t('exceptions.pageNotFound'),
      description: t('exceptions.thisPageHasMovedOrNoLongerExists'),
      illustration: pageNotFound,
    },
    '500': {
      title: t('exceptions.serverError'),
      description: t('exceptions.somethingWentWrongOnTheServerPleaseTryAgain'),
      illustration: serverError,
    },
  } as const;
}

export function ExceptionPage({ code }: { code: keyof ReturnType<typeof getExceptions> }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const exception = getExceptions(t)[code];
  return (
    <Surface border="default" radius={12} className={styles.canvas}>
      <Result
        status={code}
        headingLevel={1}
        title={exception.title}
        description={exception.description}
        className={styles.state}
        icon={
          <span
            className={styles.illustration}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: exception.illustration }}
          />
        }
        secondaryAction={
          code !== '403' ? (
            <Button variant="outline" onClick={() => window.location.reload()}>
              {t('exceptions.retry')}
            </Button>
          ) : undefined
        }
        primaryAction={
          <Button leadingIcon={<ArrowLeftIcon />} onClick={() => navigate('/dashboard/workplace')}>
            {t('exceptions.backToWorkplace')}
          </Button>
        }
      />
    </Surface>
  );
}

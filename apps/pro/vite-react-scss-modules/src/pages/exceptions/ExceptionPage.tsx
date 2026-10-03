import { ArrowLeftIcon } from '@virgo-design/icons';
import { Button, Empty, Surface } from '@virgo-design/ui';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import accessDenied from './art/access-denied.svg?raw';
import pageNotFound from './art/page-not-found.svg?raw';
import serverError from './art/server-error.svg?raw';
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
    <Surface radius={8} className={styles.canvas}>
      <Empty size="md" className={styles.state} aria-labelledby={`exception-${code}`}>
        <h1 id={`exception-${code}`} className={styles.srOnly}>
          {code} · {exception.title}
        </h1>
        <Empty.Icon className={styles.illustration}>
          {/* Only our bundled, static SVG sources are inserted; no external or user markup. */}
          <span dangerouslySetInnerHTML={{ __html: exception.illustration }} />
        </Empty.Icon>
        <Empty.Description>{exception.description}</Empty.Description>
        <Empty.Action>
          {code !== '403' ? (
            <Button variant="outline" onClick={() => window.location.reload()}>
              {t('exceptions.retry')}
            </Button>
          ) : null}
          <Button leadingIcon={<ArrowLeftIcon />} onClick={() => navigate('/dashboard/workplace')}>
            {t('exceptions.backToWorkplace')}
          </Button>
        </Empty.Action>
      </Empty>
    </Surface>
  );
}

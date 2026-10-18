import { ArrowLeftIcon } from '@virgo-design/icons';
import { Button, Result, Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import AccessDenied from '@/assets/exceptions/access-denied';
import PageNotFound from '@/assets/exceptions/page-not-found';
import ServerError from '@/assets/exceptions/server-error';
import { routePath } from '@/routes';
import { useAppNavigation } from '@/routes/navigation';

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
    <Surface
      border="default"
      radius={12}
      className="grid min-w-0 [min-height:min-content] [place-items:center]"
    >
      <Result
        status={code}
        headingLevel={1}
        title={exception.title}
        description={exception.description}
        className={[
          'data-[size=md]:[--result-gap:var(--vd-spacing-20)] data-[size=md]:[--result-padding:var(--vd-spacing-32)]',
          'viewport-max-640:data-[size=md]:[--result-padding:var(--vd-spacing-24)_var(--vd-spacing-16)]',
        ].join(' ')}
        icon={
          <span
            className={[
              '[--art-halo:var(--vd-brand-subtle)] [--art-line:var(--vd-brand-subtle-hover)] [--art-ink:var(--vd-text-secondary)]',
              '[--art-paper:var(--vd-surface-default)] [--art-brand:var(--vd-brand-primary)] [--art-on-brand:var(--vd-brand-foreground)]',
              '[--art-warning:var(--vd-status-warning-solid)]',
              '[&_>_span]:block [&_>_span]:w-full [&_>_span]:h-full [&_svg]:block [&_svg]:w-full [&_svg]:h-full',
              '[width:160px] [height:134px]',
            ].join(' ')}
            aria-hidden="true"
          >
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

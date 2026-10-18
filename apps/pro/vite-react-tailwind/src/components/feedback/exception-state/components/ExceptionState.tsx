import { ArrowLeftIcon } from '@virgo-design/icons';
import { Button, Result, Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import accessDenied from '@/assets/exceptions/access-denied.svg?raw';
import pageNotFound from '@/assets/exceptions/page-not-found.svg?raw';
import serverError from '@/assets/exceptions/server-error.svg?raw';
import { routePath } from '@/routes';

interface ExceptionStateProps {
  code: '403' | '404' | '500';
}

export function ExceptionState({ code }: ExceptionStateProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const exception = {
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

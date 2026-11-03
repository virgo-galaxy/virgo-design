import { useTranslation } from 'react-i18next';

import { Link } from '@/app/Link';
import { workplacePath } from '@/app/paths';
import * as classes from '@/styles/classes';

export function RouteErrorPage({ notFound }: { notFound?: boolean }) {
  const { t } = useTranslation();

  return (
    <section className={classes.errorPage}>
      <h1 className={classes.errorTitle}>{t(notFound ? 'notFound' : 'routeError')}</h1>
      <Link className={classes.errorLink} to={workplacePath}>
        {t('back')}
      </Link>
    </section>
  );
}

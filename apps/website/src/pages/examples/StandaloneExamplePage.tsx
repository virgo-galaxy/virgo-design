import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';

import { PageSkeleton } from '@/components/loading/PageSkeleton';
import { loadStandaloneExample } from '@/examples/components/standalone-example-registry';
import { ROUTE_PATHS } from '@/shared/routes/route-config';
import type { Appearance } from '@/shared/theme/types';
import { useAppearance } from '@/shared/theme/use-appearance';

import styles from './standalone-example-page.module.scss';

function readTheme(value: string | null, fallback: Appearance): Appearance {
  return value === 'dark' || value === 'light' ? value : fallback;
}

export function StandaloneExamplePage() {
  const { t } = useTranslation();
  const { exampleId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const { appearance } = useAppearance();
  const [Example, setExample] = useState<ComponentType | null>();

  useEffect(() => {
    let active = true;
    setExample(undefined);

    void loadStandaloneExample(exampleId).then((component) => {
      if (active) setExample(() => component ?? null);
    });

    return () => {
      active = false;
    };
  }, [exampleId]);

  if (Example === null) {
    return <Navigate to={ROUTE_PATHS.components} replace />;
  }

  const theme = readTheme(searchParams.get('theme'), appearance);

  return (
    <main
      className={styles.root}
      data-theme={theme}
      data-standalone-example={exampleId}
      aria-label={t('examples.standalone.label', { id: exampleId })}
    >
      {Example ? <Example /> : <PageSkeleton variant="example" />}
    </main>
  );
}

import { Navigate, useParams, useSearchParams } from 'react-router-dom';

import { getComponentExample } from '@/examples/components/example-registry';
import { ROUTE_PATHS } from '@/shared/routes/route-config';
import type { Appearance } from '@/shared/theme/types';
import { useAppearance } from '@/shared/theme/use-appearance';

import styles from './standalone-example-page.module.scss';

function readTheme(value: string | null, fallback: Appearance): Appearance {
  return value === 'dark' || value === 'light' ? value : fallback;
}

export function StandaloneExamplePage() {
  const { exampleId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const { appearance } = useAppearance();
  const example = getComponentExample(exampleId);

  if (!example) {
    return <Navigate to={ROUTE_PATHS.components} replace />;
  }

  const theme = readTheme(searchParams.get('theme'), appearance);
  const Example = example.Component;

  return (
    <main
      className={styles.root}
      data-theme={theme}
      data-standalone-example={example.id}
      aria-label={`${example.title} example`}
    >
      <Example />
    </main>
  );
}

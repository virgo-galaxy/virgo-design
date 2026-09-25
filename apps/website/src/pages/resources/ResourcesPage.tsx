import { Link } from 'react-router-dom';

import { ROUTE_PATHS } from '@/shared/routes/route-config';

import styles from './resources-page.module.scss';

const playgrounds = [
  {
    title: 'Primitives Playground',
    description: 'Headless controls rendered with their native, unstyled behavior.',
    path: ROUTE_PATHS.playgroundPrimitives,
  },
] as const;

export function ResourcesPage() {
  return (
    <section className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Internal resources</p>
        <h1>Playgrounds</h1>
        <p className={styles.intro}>
          Open every Virgo Design review environment from the Website dev server.
        </p>

        <div className={styles.grid}>
          {playgrounds.map((playground) => (
            <Link className={styles.card} key={playground.path} to={playground.path}>
              <strong>{playground.title}</strong>
              <span>{playground.description}</span>
              <small>Open playground →</small>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Surface } from '@virgo-design/ui';

import styles from './SurfaceRadiusExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {([0, 6, 12, 24, 'full'] as const).map((radius) => (
        <Surface
          key={radius}
          radius={radius}
          border="default"
          tone="secondary"
          className={styles.surface!}
        >
          {radius}
        </Surface>
      ))}
    </div>
  );
}

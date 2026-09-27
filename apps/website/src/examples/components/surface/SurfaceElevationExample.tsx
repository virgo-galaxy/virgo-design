import { Surface } from '@virgo-design/ui';

import styles from './SurfaceElevationExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {([0, 1, 2, 3, 4, 5] as const).map((elevation) => (
        <Surface
          key={elevation}
          tone="elevated"
          elevation={elevation}
          radius={12}
          className={styles.surface!}
        >
          Level {elevation}
        </Surface>
      ))}
    </div>
  );
}

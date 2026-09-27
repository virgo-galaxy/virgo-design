import { Surface } from '@virgo-design/ui';

import styles from './SurfaceBordersExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['none', 'subtle', 'default', 'strong'] as const).map((border) => (
        <Surface
          key={border}
          border={border}
          tone="secondary"
          radius={8}
          className={styles.surface!}
        >
          {border}
        </Surface>
      ))}
    </div>
  );
}

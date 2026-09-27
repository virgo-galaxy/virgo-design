import { Surface } from '@virgo-design/ui';

import styles from './SurfaceColorBackgroundExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Surface
        background={{ type: 'color', value: '#243852' }}
        radius={12}
        className={styles.surface!}
      >
        <strong>Custom color</strong>
        <p>A flat decorative background below normal content.</p>
      </Surface>
      <Surface
        background={{
          type: 'gradient',
          value: 'linear-gradient(125deg, #263c60, #5e448e 55%, #8b506d)',
        }}
        radius={12}
        className={styles.surface!}
      >
        <strong>Custom gradient</strong>
        <p>Consumers own the foreground contrast.</p>
      </Surface>
    </div>
  );
}

import { Surface } from '@virgo-design/ui';

import styles from './SurfaceTonesExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['default', 'secondary', 'strong', 'elevated'] as const).map((tone) => (
        <Surface key={tone} tone={tone} border="subtle" radius={12} className={styles.surface!}>
          <strong>{tone}</strong>
          <p className={styles.text!}>Theme-aware content and container color.</p>
        </Surface>
      ))}
    </div>
  );
}

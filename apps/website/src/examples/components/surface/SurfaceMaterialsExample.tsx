import { Button, Surface } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './SurfaceMaterialsExample.module.scss';

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className={styles.root!}>
      <div className={styles.stage!}>
        {(['solid', 'translucent', 'glass'] as const).map((material) => (
          <div key={material} className={styles.stage2!}>
            <Surface material={material} radius={12} className={styles.surface!}>
              <strong>{material}</strong>
              <span>Same scene. Different material.</span>
              <Button size="small" variant="outline" onClick={() => setCount((value) => value + 1)}>
                Interact
              </Button>
            </Surface>
          </div>
        ))}
      </div>
      <p role="status" className={styles.text!}>
        Successful interactions: {count}
      </p>
    </div>
  );
}

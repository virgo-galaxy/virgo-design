import { Button, Surface } from '@virgo-design/ui';
import { useId, useState } from 'react';

import styles from './SurfaceOverflowExample.module.scss';

export default function App() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className={styles.root!}>
      <Surface material="glass" radius={24} border="default" className={styles.surface!}>
        <span className={styles.label!}>Outside the edge</span>
        <p>Only the decorative material is rounded. Children may extend beyond it.</p>
        <Button
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Hide content' : 'Show floating content'}
        </Button>
        {open ? (
          <Surface
            id={panelId}
            tone="elevated"
            radius={12}
            elevation={3}
            border="subtle"
            className={styles.surface2!}
          >
            Floating content stays outside the rounded panel.
          </Surface>
        ) : null}
      </Surface>
    </div>
  );
}

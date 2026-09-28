import { Dock } from '@virgo-design/ui';

import styles from './DockLockPinExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <div className={styles.viewport!}>
        <div className={styles.scroll!} tabIndex={0} role="region" aria-label="Dock scroll preview">
          <Dock.Boundary className={styles.canvas!}>
            <Dock.Root defaultPlacement={{ edge: 'top', position: 0.5 }} snapDivisions={false}>
              <Dock.Handle aria-label="Move inspector dock" />
              <Dock.Content className={styles.panel!}>Inspector</Dock.Content>
            </Dock.Root>
            <div className={styles.document!} aria-hidden="true">
              <span>SCROLL PREVIEW</span>
              <strong>A place for your tools</strong>
              <p>Pin the inspector, then scroll this canvas.</p>
              <div className={styles.placeholder!} />
              <div className={styles.placeholder!} />
              <p>The content moves. A pinned inspector stays in view.</p>
            </div>
          </Dock.Boundary>
        </div>
      </div>
    </div>
  );
}

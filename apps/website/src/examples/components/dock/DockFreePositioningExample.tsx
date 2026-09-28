import { Dock } from '@virgo-design/ui';

import styles from './DockFreePositioningExample.module.scss';

export default function App() {
  return (
    <div className={styles.stage!}>
      <Dock.Boundary className={styles.boundary!}>
        <div className={styles.guide!} aria-hidden="true">
          <span>0</span>
          <span>0.25</span>
          <span>0.5</span>
          <span>0.75</span>
          <span>1</span>
        </div>

        <Dock.Root defaultPlacement={{ edge: 'top', position: 0.37 }} snapDivisions={false}>
          {({ placement }) => (
            <>
              <Dock.Handle aria-label="Move free-positioned dock" />
              <Dock.Content className={styles.panel!}>
                <strong>Free</strong>
                <code>{placement.position.toFixed(3)}</code>
              </Dock.Content>
            </>
          )}
        </Dock.Root>

        <p className={styles.hint!}>
          Drag continuously along an edge. Arrow keys fine-tune the position by 1%.
        </p>
      </Dock.Boundary>
    </div>
  );
}

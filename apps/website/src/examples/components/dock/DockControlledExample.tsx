import { Dock, type DockEdge, type DockPlacement } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './DockControlledExample.module.scss';

const edges: DockEdge[] = ['top', 'right', 'bottom', 'left'];

export default function App() {
  const [placement, setPlacement] = useState<DockPlacement>({ edge: 'top', position: 0.5 });

  return (
    <div className={styles.root!}>
      <div className={styles.controls!} aria-label="Dock placement controls">
        {edges.map((edge) => (
          <button
            key={edge}
            type="button"
            data-active={placement.edge === edge || undefined}
            onClick={() => setPlacement({ edge, position: placement.position })}
          >
            {edge}
          </button>
        ))}
      </div>
      <Dock.Boundary className={styles.boundary!}>
        <Dock.Root placement={placement} onPlacementChange={setPlacement} snapDivisions={8}>
          {({ orientation }) => (
            <>
              <Dock.Handle aria-label="Move inspector" />
              <Dock.Content className={styles.panel!}>
                <strong>Inspector</strong>
                <span>{orientation}</span>
              </Dock.Content>
            </>
          )}
        </Dock.Root>
      </Dock.Boundary>
    </div>
  );
}

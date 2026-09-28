import { Dock, type DockHandlePosition } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './DockHandlePositionExample.module.scss';

const handlePositions: DockHandlePosition[] = ['start', 'end'];

export default function App() {
  const [handlePosition, setHandlePosition] = useState<DockHandlePosition>('start');

  return (
    <div className={styles.root!}>
      <div className={styles.controls!}>
        <div className={styles.controlGroup!} role="group" aria-label="Handle position controls">
          <span>Handle</span>
          {handlePositions.map((position) => (
            <button
              key={position}
              type="button"
              data-active={handlePosition === position || undefined}
              onClick={() => setHandlePosition(position)}
            >
              {position}
            </button>
          ))}
        </div>
      </div>

      <Dock.Boundary className={styles.boundary!}>
        <Dock.Root defaultPlacement={{ edge: 'top', position: 0.5 }} chromeVisibility="always">
          <Dock.Handle
            className={styles.handle!}
            position={handlePosition}
            aria-label="Handle position example"
          />
          <Dock.Content className={styles.panel!}>
            <strong>Toolbar</strong>
            <span>{handlePosition}</span>
          </Dock.Content>
        </Dock.Root>
      </Dock.Boundary>
    </div>
  );
}

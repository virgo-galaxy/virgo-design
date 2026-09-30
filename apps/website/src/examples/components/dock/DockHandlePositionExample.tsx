import { Dock, type DockHandlePosition } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DockHandlePositionExample.module.scss';

const handlePositions: DockHandlePosition[] = ['start', 'end'];

export default function App() {
  const { t } = useTranslation();

  const [handlePosition, setHandlePosition] = useState<DockHandlePosition>('start');

  return (
    <div className={styles.root!}>
      <div className={styles.controls!}>
        <div
          className={styles.controlGroup!}
          role="group"
          aria-label={t('examples.dock.copy.handlePositionControls')}
        >
          <span>{t('examples.dock.copy.handle')}</span>
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
            aria-label={t('examples.dock.copy.handlePositionExample')}
          />
          <Dock.Content className={styles.panel!}>
            <strong>{t('examples.dock.copy.toolbar')}</strong>
            <span>{handlePosition}</span>
          </Dock.Content>
        </Dock.Root>
      </Dock.Boundary>
    </div>
  );
}

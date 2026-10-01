import { Dock, type DockHandlePosition, SegmentedControl } from '@virgo-design/ui';
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
        <div className={styles.controlGroup!}>
          <span>{t('examples.dock.copy.handle')}</span>
          <SegmentedControl
            aria-label={t('examples.dock.copy.handlePositionControls')}
            value={handlePosition}
            onValueChange={(position) => {
              if (handlePositions.includes(position as DockHandlePosition)) {
                setHandlePosition(position as DockHandlePosition);
              }
            }}
            size="small"
          >
            {handlePositions.map((position) => (
              <SegmentedControl.Item key={position} value={position}>
                {t(`examples.dock.copy.${position}`)}
              </SegmentedControl.Item>
            ))}
          </SegmentedControl>
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

import { Dock, type DockEdge, type DockPlacement, SegmentedControl } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DockControlledExample.module.scss';

const edges: DockEdge[] = ['top', 'right', 'bottom', 'left'];

export default function App() {
  const { t } = useTranslation();

  const [placement, setPlacement] = useState<DockPlacement>({ edge: 'top', position: 0.5 });

  return (
    <div className={styles.root!}>
      <SegmentedControl
        className={styles.controls!}
        aria-label={t('examples.dock.copy.dockPlacementControls')}
        value={placement.edge}
        onValueChange={(edge) => {
          if (edges.includes(edge as DockEdge)) {
            setPlacement((previous) => ({ ...previous, edge: edge as DockEdge }));
          }
        }}
        size="small"
      >
        {edges.map((edge) => (
          <SegmentedControl.Item key={edge} value={edge}>
            {t(`examples.dock.copy.${edge}`)}
          </SegmentedControl.Item>
        ))}
      </SegmentedControl>
      <Dock.Boundary className={styles.boundary!}>
        <Dock.Root placement={placement} onPlacementChange={setPlacement} snapDivisions={8}>
          {({ orientation }) => (
            <>
              <Dock.Handle aria-label={t('examples.dock.copy.moveInspector')} />
              <Dock.Content className={styles.panel!}>
                <strong>{t('examples.dock.copy.inspector')}</strong>
                <span>{orientation}</span>
              </Dock.Content>
            </>
          )}
        </Dock.Root>
      </Dock.Boundary>
    </div>
  );
}

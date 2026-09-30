import { Dock } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './DockFreePositioningExample.module.scss';

export default function App() {
  const { t } = useTranslation();

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
              <Dock.Handle aria-label={t('examples.dock.copy.moveFreePositionedDock')} />
              <Dock.Content className={styles.panel!}>
                <strong>{t('examples.dock.copy.free')}</strong>
                <code>{placement.position.toFixed(3)}</code>
              </Dock.Content>
            </>
          )}
        </Dock.Root>

        <p className={styles.hint!}>
          {t('examples.dock.copy.dragContinuouslyAlongAnEdgeArrowKeysFineTuneThe')}
        </p>
      </Dock.Boundary>
    </div>
  );
}

import { Dock } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './DockLockPinExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <div className={styles.viewport!}>
        <div
          className={styles.scroll!}
          tabIndex={0}
          role="region"
          aria-label={t('examples.dock.copy.dockScrollPreview')}
        >
          <Dock.Boundary className={styles.canvas!}>
            <Dock.Root defaultPlacement={{ edge: 'top', position: 0.5 }} snapDivisions={false}>
              <Dock.Handle aria-label={t('examples.dock.copy.moveInspectorDock')} />
              <Dock.Content className={styles.panel!}>
                {t('examples.dock.copy.inspector')}
              </Dock.Content>
            </Dock.Root>
            <div className={styles.document!} aria-hidden="true">
              <span>{t('examples.dock.copy.scrollPreview')}</span>
              <strong>{t('examples.dock.copy.aPlaceForYourTools')}</strong>
              <p>{t('examples.dock.copy.pinTheInspectorThenScrollThisCanvas')}</p>
              <div className={styles.placeholder!} />
              <div className={styles.placeholder!} />
              <p>{t('examples.dock.copy.theContentMovesAPinnedInspectorStaysInView')}</p>
            </div>
          </Dock.Boundary>
        </div>
      </div>
    </div>
  );
}

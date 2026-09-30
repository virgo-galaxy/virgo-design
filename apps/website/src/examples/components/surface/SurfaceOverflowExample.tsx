import { Button, Surface } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SurfaceOverflowExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const panelId = useId();
  return (
    <div className={styles.root!}>
      <Surface material="glass" radius={24} border="default" className={styles.surface!}>
        <span className={styles.label!}>{t('examples.surface.copy.outsideTheEdge')}</span>
        <p>
          {t('examples.surface.copy.onlyTheDecorativeMaterialIsRoundedChildrenMayExtendBeyond')}
        </p>
        <Button
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
        >
          {open
            ? t('examples.surface.details.hideContent')
            : t('examples.surface.details.showFloatingContent')}
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
            {t('examples.surface.copy.floatingContentStaysOutsideTheRoundedPanel')}
          </Surface>
        ) : null}
      </Surface>
    </div>
  );
}

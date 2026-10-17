import { ContextMenu } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ContextMenuCheckboxExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [snap, setSnap] = useState(true);

  return (
    <div className={styles.root!}>
      <ContextMenu>
        <ContextMenu.Trigger
          aria-label={t('examples.contextMenu.copy.canvasPreferences')}
          className={styles.trigger!}
        >
          {t('examples.contextMenu.copy.canvasPreferencesRightClick')}
        </ContextMenu.Trigger>
        <ContextMenu.Content aria-label={t('examples.contextMenu.copy.canvasPreferences')}>
          <ContextMenu.CheckboxItem checked={snap} onCheckedChange={setSnap}>
            {t('examples.contextMenu.copy.snapToGrid')}
          </ContextMenu.CheckboxItem>
          <ContextMenu.CheckboxItem>
            {t('examples.contextMenu.copy.showGuides')}
          </ContextMenu.CheckboxItem>
        </ContextMenu.Content>
      </ContextMenu>
      <span role="status">
        {t('examples.contextMenu.copy.snapToGrid')}
        {snap ? 'on' : 'off'}
      </span>
    </div>
  );
}

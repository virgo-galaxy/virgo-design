import { Button, Drawer } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DrawerNonModalExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [clicks, setClicks] = useState(0);

  return (
    <div className={styles.root!}>
      <Drawer.Root modal={false}>
        <Drawer.Trigger>{t('examples.drawer.copy.openNonModalInspector')}</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Content placement="right" size="sm">
            <Drawer.Header>
              <Drawer.Title>{t('examples.drawer.copy.inspector')}</Drawer.Title>
              <Drawer.Description>
                {t('examples.drawer.copy.theCanvasRemainsAvailableBehindThisPanel')}
              </Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
              {t('examples.drawer.copy.inspectTheSelectionWithoutAModalOverlay')}
            </Drawer.Body>
            <Drawer.Close aria-label={t('examples.drawer.copy.closeDrawer')} />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      <Button variant="outline" onClick={() => setClicks((n) => n + 1)}>
        {t('examples.drawer.copy.canvasAction')}
      </Button>
      <span role="status">
        {t('examples.drawer.copy.canvasActions')} {clicks}
      </span>
    </div>
  );
}

import { Button, Drawer, Input } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './DrawerFormExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const formId = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Virgo workspace');
  const [savedName, setSavedName] = useState(name);
  return (
    <div className={styles.root!}>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger>{t('examples.drawer.copy.editWorkspace')}</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay />
          <Drawer.Content size="lg">
            <Drawer.Header>
              <Drawer.Title>{t('examples.drawer.copy.workspaceDetails')}</Drawer.Title>
              <Drawer.Description>
                {t('examples.drawer.copy.updateTheNameShownThroughoutTheWorkspace')}
              </Drawer.Description>
            </Drawer.Header>
            <Drawer.Body>
              <form
                id={formId}
                onSubmit={(event) => {
                  event.preventDefault();
                  setSavedName(name);
                  setOpen(false);
                }}
              >
                <label className={styles.label!}>
                  {t('examples.drawer.copy.workspaceName')}
                  <Input value={name} onChange={(event) => setName(event.target.value)} />
                </label>
              </form>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close>{t('examples.drawer.copy.cancel')}</Drawer.Close>
              <Button type="submit" form={formId}>
                {t('examples.drawer.copy.saveChanges')}
              </Button>
            </Drawer.Footer>
            <Drawer.Close aria-label={t('examples.drawer.copy.closeDrawer')} />
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
      <span role="status">
        {t('examples.drawer.copy.workspace')} {savedName}
      </span>
    </div>
  );
}

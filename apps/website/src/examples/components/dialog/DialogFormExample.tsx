import './DialogFormExample.module.scss';

import { Button, Dialog, Input } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Virgo workspace');

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{t('examples.dialog.copy.editWorkspace')}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Dialog.Header>
              <Dialog.Title>{t('examples.dialog.copy.workspaceSettings')}</Dialog.Title>
              <Dialog.Description>
                {t('examples.dialog.copy.updateTheNameShownThroughoutVirgoDesign')}
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                aria-label={t('examples.dialog.copy.workspaceName')}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close>{t('examples.dialog.copy.cancel')}</Dialog.Close>
              <Button type="submit">{t('examples.dialog.copy.saveChanges')}</Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

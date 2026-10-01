import './DialogFormExample.module.scss';

import { Button, Dialog, Field, Form, Input } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();
  const formId = useId();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Virgo workspace');

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{t('examples.dialog.copy.editWorkspace')}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{t('examples.dialog.copy.workspaceSettings')}</Dialog.Title>
            <Dialog.Description>
              {t('examples.dialog.copy.updateTheNameShownThroughoutVirgoDesign')}
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <Form
              id={formId}
              onSubmit={(event) => {
                event.preventDefault();
                setOpen(false);
              }}
            >
              <Field>
                <Field.Label>{t('examples.dialog.copy.workspaceName')}</Field.Label>
                <Input
                  name="workspaceName"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Field>
            </Form>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.Close>{t('examples.dialog.copy.cancel')}</Dialog.Close>
            <Button type="submit" form={formId}>
              {t('examples.dialog.copy.saveChanges')}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

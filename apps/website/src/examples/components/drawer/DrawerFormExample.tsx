import { Button, Drawer, Field, Form, Input } from '@virgo-design/ui';
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
              <Form
                id={formId}
                onSubmit={(event) => {
                  event.preventDefault();
                  setSavedName(name);
                  setOpen(false);
                }}
              >
                <Field>
                  <Field.Label>{t('examples.drawer.copy.workspaceName')}</Field.Label>
                  <Input
                    name="workspaceName"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Field>
              </Form>
            </Drawer.Body>
            <Button.Group
              layout="custom"
              render={(groupProps) => <Drawer.Footer {...groupProps} />}
            >
              <Drawer.Close>{t('examples.drawer.copy.cancel')}</Drawer.Close>
              <Button type="submit" form={formId}>
                {t('examples.drawer.copy.saveChanges')}
              </Button>
            </Button.Group>
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

import { Button, Checkbox, Field, Form, Input, Popover } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './PopoverFormExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('Virgo workspace');
  const [savedName, setSavedName] = useState(name);
  return (
    <div className={styles.root!}>
      <Popover open={open} onOpenChange={setOpen}>
        <Popover.Trigger>{t('examples.popover.copy.editWorkspace')}</Popover.Trigger>
        <Popover.Content aria-label={t('examples.popover.copy.editWorkspaceSettings')} arrow>
          <Form
            className={styles.form!}
            onSubmit={(event) => {
              event.preventDefault();
              setSavedName(name);
              setOpen(false);
            }}
          >
            <strong>{t('examples.popover.copy.workspaceSettings')}</strong>
            <Field>
              <Field.Label>{t('examples.popover.copy.workspaceName')}</Field.Label>
              <Input
                name="workspaceName"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
            <Checkbox defaultChecked>{t('examples.popover.copy.notifyWorkspaceMembers')}</Checkbox>
            <div className={styles.stage!}>
              <Popover.Close>{t('examples.popover.copy.cancel')}</Popover.Close>
              <Button type="submit" size="small">
                {t('examples.popover.copy.saveChanges')}
              </Button>
            </div>
          </Form>
        </Popover.Content>
      </Popover>
      <span role="status">
        {t('examples.popover.copy.workspace')} {savedName}
      </span>
      <Button variant="text" size="small">
        {t('examples.popover.copy.nextControl')}
      </Button>
    </div>
  );
}

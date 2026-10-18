import { Button, Dialog } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useSession } from '@/features/auth';
import { resetAppLocale } from '@/i18n';

import { resetDemo } from '../client';

import * as styles from './DemoResetAction.css';

export function DemoResetAction() {
  const { t } = useTranslation();
  const { endSession } = useSession();
  const [resetOpen, setResetOpen] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [resetError, setResetError] = useState(false);

  const reset = async () => {
    const session = await resetDemo();

    if (session.authenticated) throw new Error('Demo reset did not end the session');

    await resetAppLocale();
    endSession();
  };

  return (
    <Dialog.Root
      open={resetOpen}
      onOpenChange={(value) => {
        if (!resetting) setResetOpen(value);
      }}
    >
      <Dialog.Trigger className={styles.dangerAction} onClick={() => setResetError(false)}>
        {t('settings.resetDemo')}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content size="sm">
          <Dialog.Header>
            <Dialog.Title>{t('settings.resetDemoTitle')}</Dialog.Title>
            <Dialog.Description>{t('settings.resetDemoDescription')}</Dialog.Description>
          </Dialog.Header>
          {resetError ? (
            <Dialog.Body>
              <p role="alert">{t('settings.resetDemoFailed')}</p>
            </Dialog.Body>
          ) : null}
          <Dialog.Footer>
            <Dialog.Close disabled={resetting}>{t('tasks.cancel')}</Dialog.Close>
            <Button
              variant="outline"
              className={styles.dangerAction}
              disabled={resetting}
              aria-busy={resetting}
              onClick={() => {
                setResetting(true);
                setResetError(false);
                void reset().catch(() => {
                  setResetting(false);
                  setResetError(true);
                });
              }}
            >
              {t(resetting ? 'settings.resettingDemo' : 'settings.resetDemo')}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import { Toast } from '@virgo-design/primitives';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function ToastExample() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider>
      <button type="button" onClick={() => setOpen(true)} data-docs-primitive="toast">
        {t('primitives.examples.showToast')}
      </button>
      <Toast.Root open={open} onOpenChange={setOpen} duration={0}>
        <Toast.Title>{t('primitives.examples.saved')}</Toast.Title>
        <Toast.Description>{t('primitives.examples.yourChangesAreReady')}</Toast.Description>
        <Toast.Action>{t('primitives.examples.undo')}</Toast.Action>
        <Toast.Close>{t('primitives.examples.dismiss')}</Toast.Close>
      </Toast.Root>
      <Toast.Viewport {...portalProps} />
    </Toast.Provider>
  );
}

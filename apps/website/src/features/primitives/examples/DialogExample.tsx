import { Dialog } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function DialogExample() {
  const { t } = useTranslation();

  return (
    <Dialog data-docs-primitive="dialog">
      <Dialog.Trigger>{t('primitives.examples.editProfile')}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay {...portalProps} />
        <Dialog.Content {...portalProps}>
          <Dialog.Title>{t('primitives.examples.profile')}</Dialog.Title>
          <Dialog.Description>
            {t('primitives.examples.updateYourPublicDetails')}
          </Dialog.Description>
          <label>
            {t('primitives.examples.displayName')}
            <input defaultValue="Example" />
          </label>{' '}
          <Dialog.Close>{t('primitives.examples.done')}</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

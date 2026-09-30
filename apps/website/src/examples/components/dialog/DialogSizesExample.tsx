import { Dialog } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './DialogSizesExample.module.scss';

const sizes = ['sm', 'md', 'lg'] as const;

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {sizes.map((size) => (
        <Dialog.Root key={size}>
          <Dialog.Trigger size="small">
            {t('examples.dialog.copy.open')} {size}
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content size={size}>
              <Dialog.Header>
                <Dialog.Title>
                  {size.toUpperCase()} {t('examples.dialog.copy.dialog')}
                </Dialog.Title>
                <Dialog.Description>
                  {t('examples.dialog.copy.chooseTheSmallestDialogThatComfortablyFitsTheTask')}
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                {t('examples.dialog.copy.dialogContentScalesWithoutChangingItsBehavior')}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close variant="primary">{t('examples.dialog.copy.done')}</Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ))}
    </div>
  );
}

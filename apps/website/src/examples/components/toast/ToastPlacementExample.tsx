import { Button, Toast, type ToastPlacement } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ToastPlacementExample.module.scss';

const placements = [
  'top-start',
  'top-center',
  'top-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
] as const;

export default function App() {
  const { t } = useTranslation();

  const [placement, setPlacement] = useState<ToastPlacement>('bottom-end');
  const [open, setOpen] = useState(false);
  return (
    <Toast.Provider hotkey={[]}>
      <div className={styles.root!}>
        <div className={styles.stage!}>
          {placements.map((value) => (
            <Button
              key={value}
              size="small"
              variant={placement === value ? 'primary' : 'outline'}
              onClick={() => {
                setPlacement(value);
                setOpen(true);
              }}
            >
              {value}
            </Button>
          ))}
        </div>
        <div className={styles.stage2!}>
          <Toast.Viewport
            portal={false}
            placement={placement}
            aria-label={t('examples.toast.copy.positionedNotifications')}
            className={styles.viewport!}
          />
        </div>
      </div>
      <Toast.Root open={open} onOpenChange={setOpen} intent="info" duration={0}>
        <Toast.Title>{placement}</Toast.Title>
        <Toast.Description>
          {t('examples.toast.copy.thisExamplePositionsItsViewportInsideTheCanvas')}
        </Toast.Description>
        <Toast.Close aria-label={t('examples.toast.copy.dismissNotification')} />
      </Toast.Root>
    </Toast.Provider>
  );
}

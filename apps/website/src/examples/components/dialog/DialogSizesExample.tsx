import { Dialog } from '@virgo-design/ui';

import styles from './DialogSizesExample.module.scss';

const sizes = ['sm', 'md', 'lg'] as const;

export default function App() {
  return (
    <div className={styles.root!}>
      {sizes.map((size) => (
        <Dialog.Root key={size}>
          <Dialog.Trigger size="small">Open {size}</Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay />
            <Dialog.Content size={size}>
              <Dialog.Header>
                <Dialog.Title>{size.toUpperCase()} dialog</Dialog.Title>
                <Dialog.Description>
                  Choose the smallest dialog that comfortably fits the task.
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>Dialog content scales without changing its behavior.</Dialog.Body>
              <Dialog.Footer>
                <Dialog.Close variant="primary">Done</Dialog.Close>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      ))}
    </div>
  );
}

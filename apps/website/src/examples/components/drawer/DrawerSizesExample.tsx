import { Drawer, type DrawerPlacement, type DrawerSize } from '@virgo-design/ui';

import styles from './DrawerSizesExample.module.scss';

function DrawerFrame({
  placement = 'right',
  size = 'md',
  title,
}: {
  placement?: DrawerPlacement;
  size?: DrawerSize;
  title: string;
}) {
  return (
    <Drawer.Root>
      <Drawer.Trigger size="small">Open {title}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content placement={placement} size={size}>
          <Drawer.Header>
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.Description>
              A {size} panel entering from the {placement} edge.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            Drawer behavior, focus, and dismissal come directly from the Dialog primitive.
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close>Cancel</Drawer.Close>
            <Drawer.Close variant="primary">Done</Drawer.Close>
          </Drawer.Footer>
          <Drawer.Close />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export default function App() {
  return (
    <div className={styles.root!}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <DrawerFrame key={size} size={size} title={`${size} drawer`} />
      ))}
    </div>
  );
}

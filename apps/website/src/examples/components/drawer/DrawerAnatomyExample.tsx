import './DrawerAnatomyExample.module.scss';

import { Drawer } from '@virgo-design/ui';

export default function App() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>Open inspector anatomy</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content placement="left">
          <Drawer.Header>
            <Drawer.Title>Inspector anatomy</Drawer.Title>
            <Drawer.Description>Scroll the body to review all fields.</Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            {Array.from({ length: 18 }, (_, index) => (
              <p key={index}>Inspector field {index + 1}: a detail for the current selection.</p>
            ))}
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

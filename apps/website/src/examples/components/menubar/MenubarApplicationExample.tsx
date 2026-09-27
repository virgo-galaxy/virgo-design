import { LayoutIcon, PlusIcon, TrashIcon } from '@virgo-design/icons';
import { Menu, Menubar } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './MenubarApplicationExample.module.scss';

function SharedItems({ select }: { select: (name: string) => void }) {
  return (
    <>
      <Menu.Group label="Actions">
        <Menu.Item icon={<PlusIcon />} shortcut="⌘N" onSelect={() => select('New')}>
          New
        </Menu.Item>
        <Menu.Item shortcut="F2" onSelect={() => select('Rename')}>
          Rename
        </Menu.Item>
        <Menu.Item disabled>Paste</Menu.Item>
      </Menu.Group>
      <Menu.Separator />
      <Menu.Submenu>
        <Menu.SubmenuTrigger icon={<LayoutIcon />}>Export</Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item onSelect={() => select('Export PDF')}>PDF</Menu.Item>
          <Menu.Submenu>
            <Menu.SubmenuTrigger>Image</Menu.SubmenuTrigger>
            <Menu.SubmenuContent>
              <Menu.Item onSelect={() => select('Export PNG')}>PNG</Menu.Item>
              <Menu.Item onSelect={() => select('Export SVG')}>SVG</Menu.Item>
            </Menu.SubmenuContent>
          </Menu.Submenu>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Submenu>
        <Menu.SubmenuTrigger>Share</Menu.SubmenuTrigger>
        <Menu.SubmenuContent>
          <Menu.Item onSelect={() => select('Copy link')}>Copy link</Menu.Item>
          <Menu.Item onSelect={() => select('Copy selection')}>Copy selection</Menu.Item>
        </Menu.SubmenuContent>
      </Menu.Submenu>
      <Menu.Separator />
      <Menu.Item danger icon={<TrashIcon />} onSelect={() => select('Delete')}>
        Delete
      </Menu.Item>
    </>
  );
}

export default function App() {
  const [action, setAction] = useState('Choose an application action.');
  return (
    <div className={styles.root!}>
      <Menubar aria-label="Application actions">
        <Menubar.Menu value="file">
          <Menubar.Trigger>File</Menubar.Trigger>
          <Menubar.Content>
            <SharedItems select={setAction} />
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu value="edit">
          <Menubar.Trigger>Edit</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.Item shortcut="⌘Z" onSelect={() => setAction('Undo')}>
              Undo
            </Menubar.Item>
            <Menubar.Item shortcut="⌘⇧Z" onSelect={() => setAction('Redo')}>
              Redo
            </Menubar.Item>
            <Menubar.Separator />
            <Menubar.Item shortcut="⌘C" onSelect={() => setAction('Copy')}>
              Copy
            </Menubar.Item>
            <Menubar.Item disabled shortcut="⌘V">
              Paste
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu value="view">
          <Menubar.Trigger>View</Menubar.Trigger>
          <Menubar.Content>
            <Menubar.CheckboxItem defaultChecked>Show toolbar</Menubar.CheckboxItem>
            <Menubar.CheckboxItem>Show guides</Menubar.CheckboxItem>
          </Menubar.Content>
        </Menubar.Menu>
        <Menubar.Menu value="help" disabled>
          <Menubar.Trigger>Help</Menubar.Trigger>
        </Menubar.Menu>
      </Menubar>
      <div className={styles.stage!}>
        <p role="status" className={styles.text!}>
          {action}
        </p>
        <p className={styles.text2!}>
          Shortcut labels are display only; this demo does not bind global keys.
        </p>
      </div>
    </div>
  );
}

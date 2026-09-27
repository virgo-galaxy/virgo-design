import { LayoutIcon, PlusIcon, TrashIcon } from '@virgo-design/icons';
import { ContextMenu, Menu } from '@virgo-design/ui';
import { useState } from 'react';

import styles from './ContextMenuTargetExample.module.scss';

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
  const [action, setAction] = useState('No context action selected.');
  return (
    <div className={styles.root!}>
      <ContextMenu>
        <ContextMenu.Trigger aria-label="Document context" className={styles.trigger!}>
          <LayoutIcon />
          <strong>Document</strong>
          <span>Right-click here · Shift+F10</span>
        </ContextMenu.Trigger>
        <ContextMenu.Content aria-label="Document actions">
          <SharedItems select={setAction} />
        </ContextMenu.Content>
      </ContextMenu>
      <span role="status">{action}</span>
    </div>
  );
}

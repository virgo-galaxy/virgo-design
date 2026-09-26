import { LayoutIcon, PlusIcon, TrashIcon } from '@virgo-design/icons';
import { Menu, Menubar } from '@virgo-design/ui';
import { useState } from 'react';

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
    <div style={{ display: 'grid', justifyItems: 'start', gap: 24, width: '100%' }}>
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
      <div
        style={{
          padding: 24,
          width: '100%',
          minHeight: 120,
          background: 'var(--vd-surface-secondary)',
          borderRadius: 'var(--vd-radius-8)',
        }}
      >
        <p role="status" style={{ marginTop: 0 }}>
          {action}
        </p>
        <p style={{ marginBottom: 0 }}>
          Shortcut labels are display only; this demo does not bind global keys.
        </p>
      </div>
    </div>
  );
}

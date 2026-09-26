import { DashboardIcon, LayoutIcon, SearchIcon, SettingsIcon } from '@virgo-design/icons';
import { Button, Command } from '@virgo-design/ui';
import { useState } from 'react';

function CommandItems({ select }: { select: (value: string) => void }) {
  return (
    <>
      <Command.Empty>No matching commands.</Command.Empty>
      <Command.Group heading="Workspace">
        <Command.Item
          value="open-dashboard"
          keywords={['home']}
          icon={<DashboardIcon />}
          shortcut="G D"
          onSelect={select}
        >
          Open dashboard
        </Command.Item>
        <Command.Item
          value="switch-workspace"
          icon={<LayoutIcon />}
          shortcut="⌘ W"
          onSelect={select}
        >
          Switch workspace
        </Command.Item>
      </Command.Group>
      <Command.Separator />
      <Command.Group heading="Settings">
        <Command.Item
          value="preferences"
          keywords={['settings']}
          icon={<SettingsIcon />}
          shortcut="⌘ ,"
          onSelect={select}
        >
          Open preferences
        </Command.Item>
        <Command.Item value="unavailable" disabled>
          Unavailable command
        </Command.Item>
      </Command.Group>
    </>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState('No command selected.');
  return (
    <div
      style={{ display: 'grid', justifyItems: 'start', gap: 16 }}
      onKeyDown={(event) => {
        if (
          !event.defaultPrevented &&
          (event.metaKey || event.ctrlKey) &&
          event.key.toLowerCase() === 'k'
        ) {
          event.preventDefault();
          setOpen((current) => !current);
        }
      }}
    >
      <Button
        onClick={() => setOpen(true)}
        leadingIcon={<SearchIcon />}
        aria-keyshortcuts="Meta+K Control+K"
      >
        Open command palette
      </Button>
      <p style={{ margin: 0 }}>Focus the button, then press ⌘/Ctrl K.</p>
      <Command.Dialog open={open} onOpenChange={setOpen}>
        <Command.Input
          autoFocus
          aria-label="Search command palette"
          placeholder="Type a command…"
        />
        <Command.List>
          <CommandItems
            select={(value) => {
              setSelection(value);
              setOpen(false);
            }}
          />
        </Command.List>
      </Command.Dialog>
      <span role="status">Selected: {selection}</span>
    </div>
  );
}

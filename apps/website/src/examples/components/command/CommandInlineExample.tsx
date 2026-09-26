import { DashboardIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { Command } from '@virgo-design/ui';
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
  const [selection, setSelection] = useState('No command selected.');
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 400 }}>
      <Command>
        <Command.Input aria-label="Search inline commands" placeholder="Search commands…" />
        <Command.List>
          <CommandItems select={setSelection} />
        </Command.List>
      </Command>
      <p role="status" style={{ margin: 0 }}>
        Selected: {selection}
      </p>
    </div>
  );
}

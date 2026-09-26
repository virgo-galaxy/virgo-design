import './CommandPage.scss';

import { DashboardIcon, LayoutIcon, SearchIcon, SettingsIcon } from '@virgo-design/icons';
import { Button, Command } from '@virgo-design/ui';
import { useEffect, useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

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

export function CommandPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selection, setSelection] = useState('No command selected.');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setDialogOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const select = (value: string) => {
    setSelection(value);
    setDialogOpen(false);
  };

  return (
    <div className="review-board command-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 31</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Command</h1>
          <p>Search application actions, keep focus in one input, and execute the active result.</p>
          <dl className="component-facts">
            <div>
              <dt>Modes</dt>
              <dd>Inline · Dialog</dd>
            </div>
            <div>
              <dt>Search</dt>
              <dd>Built-in</dd>
            </div>
            <div>
              <dt>Results</dt>
              <dd>Grouped</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>inline · grouped · searchable</code>
          </div>
          <div className="hero-stage">
            <Command className="command-demo">
              <Command.Input aria-label="Hero command search" placeholder="Search commands…" />
              <Command.List>
                <CommandItems select={() => {}} />
              </Command.List>
            </Command>
          </div>
          <div className="specimen-caption">
            <span>Single input</span>
            <span>Grouped results</span>
            <span>Keyboard-first</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="command-inline"
        index="01"
        title="Inline command list"
        description="Type settings or home. Arrow keys change the active option; Enter selects it."
      >
        <div className="command-stage">
          <Command className="command-demo">
            <Command.Input aria-label="Search inline commands" placeholder="Search commands…" />
            <Command.List>
              <CommandItems select={setSelection} />
            </Command.List>
          </Command>
          <p role="status">Selected: {selection}</p>
        </div>
      </ReviewSection>

      <ReviewSection
        id="command-dialog"
        index="02"
        title="Dialog palette"
        description="Open with the button or ⌘/Ctrl K. Dialog supplies modal focus, Escape and focus return."
      >
        <div className="command-stage command-dialog-trigger">
          <Button onClick={() => setDialogOpen(true)} leadingIcon={<SearchIcon />}>
            Open command palette
          </Button>
          <kbd>⌘ K</kbd>
          <Command.Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Command.Input
              autoFocus
              aria-label="Search command palette"
              placeholder="Type a command…"
            />
            <Command.List>
              <CommandItems select={select} />
            </Command.List>
          </Command.Dialog>
        </div>
      </ReviewSection>

      <ReviewSection
        id="command-filter"
        index="03"
        title="Custom filter"
        description="This list only matches the beginning of each command value."
      >
        <div className="command-stage">
          <Command
            className="command-demo"
            filter={(value, search) => value.startsWith(search.toLowerCase())}
          >
            <Command.Input aria-label="Prefix filter" placeholder="Try pref…" />
            <Command.List>
              <Command.Empty>No prefix match.</Command.Empty>
              <Command.Item value="preferences">Preferences</Command.Item>
              <Command.Item value="projects">Projects</Command.Item>
              <Command.Item value="profile">Profile</Command.Item>
            </Command.List>
          </Command>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Command V1.0.0</span>
        <span>Combobox · Dialog composition · Classic</span>
      </footer>
    </div>
  );
}

import { PlusIcon, SettingsIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
      <Button iconOnly aria-label="Add item">
        <PlusIcon />
      </Button>
      <Button iconOnly shape="circle" aria-label="Settings">
        <SettingsIcon />
      </Button>
      <Button iconOnly variant="secondary" aria-label="Secondary settings">
        <SettingsIcon />
      </Button>
      <Button iconOnly variant="outline" aria-label="Outlined settings">
        <SettingsIcon />
      </Button>
    </div>
  );
}

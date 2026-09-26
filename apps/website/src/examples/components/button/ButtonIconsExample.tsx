import { CheckIcon, ChevronDownIcon, PlusIcon } from '@virgo-design/icons';
import { Button } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      <Button leadingIcon={<PlusIcon />}>Create</Button>
      <Button variant="secondary" trailingIcon={<ChevronDownIcon />}>
        Options
      </Button>
      <Button variant="outline" leadingIcon={<CheckIcon />} trailingIcon={<ChevronDownIcon />}>
        Approved
      </Button>
    </div>
  );
}

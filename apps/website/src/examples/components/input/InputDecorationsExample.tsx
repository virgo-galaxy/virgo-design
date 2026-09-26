import { CheckIcon, SearchIcon, UserIcon } from '@virgo-design/icons';
import { Input } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 360 }}>
      <Input aria-label="Search" prefix={<SearchIcon />} placeholder="Search components" />
      <Input aria-label="Approved name" defaultValue="Virgo" suffix={<CheckIcon />} />
      <Input
        aria-label="Account"
        defaultValue="mystic"
        prefix={<UserIcon />}
        suffix={<CheckIcon />}
      />
    </div>
  );
}

import { CheckIcon, LayoutIcon, SettingsIcon } from '@virgo-design/icons';
import { Tag } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
      <Tag icon={<LayoutIcon />} intent="info">
        Workspace
      </Tag>
      <Tag icon={<CheckIcon />} intent="success" variant="outline">
        Stable
      </Tag>
      <Tag icon={<SettingsIcon />} intent="warning">
        Configuration
      </Tag>
    </div>
  );
}

import { Select } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 320 }}>
      <Select>
        <Select.Trigger aria-label="Default project" placeholder="Project" />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">Cloud Docs</Select.Option>
          <Select.Option value="runtime">Runtime</Select.Option>
        </Select.Content>
      </Select>
      <Select disabled defaultValue="design">
        <Select.Trigger aria-label="Disabled project" />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">Cloud Docs</Select.Option>
          <Select.Option value="runtime">Runtime</Select.Option>
        </Select.Content>
      </Select>
      <Select invalid>
        <Select.Trigger aria-label="Invalid project" placeholder="Choose a project" />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">Cloud Docs</Select.Option>
          <Select.Option value="runtime">Runtime</Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}

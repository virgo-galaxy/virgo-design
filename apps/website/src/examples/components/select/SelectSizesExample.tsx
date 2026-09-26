import { Select } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 16, width: '100%', maxWidth: 320 }}>
      {(['mini', 'small', 'medium', 'large'] as const).map((size) => (
        <Select key={size} defaultValue="design" size={size}>
          <Select.Trigger aria-label={`${size} project`} />
          <Select.Content>
            <Select.Option value="design">Virgo Design</Select.Option>
            <Select.Option value="docs">Cloud Docs</Select.Option>
            <Select.Option value="runtime">Runtime</Select.Option>
          </Select.Content>
        </Select>
      ))}
    </div>
  );
}

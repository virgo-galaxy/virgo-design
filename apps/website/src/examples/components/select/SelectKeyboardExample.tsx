import { Select } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%', maxWidth: 320 }}>
      <Select>
        <Select.Trigger aria-label="Keyboard project" placeholder="Focus, then use ArrowDown" />
        <Select.Content>
          <Select.Option value="design">Virgo Design</Select.Option>
          <Select.Option value="docs">Cloud Docs</Select.Option>
          <Select.Option value="runtime">Runtime</Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}

import { Select } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%', maxWidth: 320 }}>
      <Select defaultValue="homelab">
        <Select.Trigger aria-label="Environment" />
        <Select.Content>
          <Select.Option value="local">Local</Select.Option>
          <Select.Option value="homelab">Home Lab</Select.Option>
          <Select.Option value="production" disabled>
            Production
          </Select.Option>
        </Select.Content>
      </Select>
    </div>
  );
}

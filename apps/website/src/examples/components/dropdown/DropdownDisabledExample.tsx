import { Dropdown } from '@virgo-design/ui';

export default function App() {
  return (
    <Dropdown disabled>
      <Dropdown.Trigger>Disabled menu</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>Unavailable action</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

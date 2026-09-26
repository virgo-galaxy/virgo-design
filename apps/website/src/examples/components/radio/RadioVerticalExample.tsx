import { Radio } from '@virgo-design/ui';

export default function App() {
  return (
    <Radio.Group defaultValue="pear" orientation="vertical" aria-label="Vertical fruit">
      <Radio value="apple">Apple</Radio>
      <Radio value="pear">Pear</Radio>
      <Radio value="orange">Orange</Radio>
    </Radio.Group>
  );
}

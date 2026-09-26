import { Checkbox } from '@virgo-design/ui';
import { useId } from 'react';

export default function App() {
  const name = useId();
  return (
    <Checkbox.Group defaultValue={['pear', 'orange']} name={name} aria-label="Fruit">
      <Checkbox value="apple">Apple</Checkbox>
      <Checkbox value="pear">Pear</Checkbox>
      <Checkbox value="orange">Orange</Checkbox>
    </Checkbox.Group>
  );
}

import { Radio } from '@virgo-design/ui';
import { useId } from 'react';

export default function App() {
  const name = useId();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Radio name={name} value="apple">
        Apple
      </Radio>
      <Radio name={name} value="pear" defaultChecked>
        Pear
      </Radio>
    </div>
  );
}

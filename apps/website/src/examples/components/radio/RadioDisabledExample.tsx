import { Radio } from '@virgo-design/ui';
import { useId } from 'react';

export default function App() {
  const name = useId();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Radio disabled name={`${name}-off`}>
        Disabled unchecked
      </Radio>
      <Radio defaultChecked disabled name={`${name}-on`}>
        Disabled checked
      </Radio>
    </div>
  );
}

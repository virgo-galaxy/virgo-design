import { SettingsIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [selected, setSelected] = useState('none');
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
      {(['primary', 'secondary', 'outline', 'text'] as const).map((variant) => (
        <FloatingAction
          key={variant}
          variant={variant}
          aria-label={`${variant} settings`}
          onClick={() => setSelected(variant)}
        >
          <SettingsIcon />
        </FloatingAction>
      ))}
      <span role="status">Selected: {selected}</span>
    </div>
  );
}

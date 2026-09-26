import { Checkbox } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      <Checkbox disabled>Unchecked</Checkbox>
      <Checkbox defaultChecked disabled>
        Checked
      </Checkbox>
      <Checkbox indeterminate disabled>
        Indeterminate
      </Checkbox>
    </div>
  );
}

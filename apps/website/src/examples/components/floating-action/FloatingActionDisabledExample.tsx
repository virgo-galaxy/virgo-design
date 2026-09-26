import { SettingsIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';

export default function App() {
  return (
    <FloatingAction disabled aria-label="Settings unavailable">
      <SettingsIcon />
    </FloatingAction>
  );
}

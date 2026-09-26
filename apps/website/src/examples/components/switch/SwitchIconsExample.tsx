import { CheckIcon, CloseIcon } from '@virgo-design/icons';
import { Switch } from '@virgo-design/ui';

export default function App() {
  return (
    <Switch
      aria-label="Verified"
      checkedContent={<CheckIcon size={12} />}
      uncheckedContent={<CloseIcon size={12} />}
      defaultChecked
    />
  );
}

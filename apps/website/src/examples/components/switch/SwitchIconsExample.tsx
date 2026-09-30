import './SwitchIconsExample.module.scss';

import { CheckIcon, CloseIcon } from '@virgo-design/icons';
import { Switch } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Switch
      aria-label={t('examples.switch.copy.verified')}
      checkedContent={<CheckIcon size={12} />}
      uncheckedContent={<CloseIcon size={12} />}
      defaultChecked
    />
  );
}

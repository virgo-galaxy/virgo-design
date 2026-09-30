import './FloatingActionDisabledExample.module.scss';

import { SettingsIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <FloatingAction disabled aria-label={t('examples.floatingAction.copy.settingsUnavailable')}>
      <SettingsIcon />
    </FloatingAction>
  );
}

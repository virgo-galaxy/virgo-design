import './TooltipDisabledExample.module.scss';

import { Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Tooltip disabled>
      <Tooltip.Trigger>{t('examples.tooltip.copy.disabledTooltip')}</Tooltip.Trigger>
      <Tooltip.Content>{t('examples.tooltip.copy.unavailable')}</Tooltip.Content>
    </Tooltip>
  );
}

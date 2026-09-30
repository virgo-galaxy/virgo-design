import './TooltipInstantExample.module.scss';

import { Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Tooltip openDelay={0}>
      <Tooltip.Trigger>{t('examples.tooltip.copy.instantPreview')}</Tooltip.Trigger>
      <Tooltip.Content>{t('examples.tooltip.copy.noHoverDelayForThisExample')}</Tooltip.Content>
    </Tooltip>
  );
}

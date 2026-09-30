import './TooltipBasicExample.module.scss';

import { Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Tooltip>
      <Tooltip.Trigger variant="text">
        {t('examples.tooltip.copy.aLittleMoreContext')}
      </Tooltip.Trigger>
      <Tooltip.Content>{t('examples.tooltip.copy.moveIntoThisTextToKeepReading')}</Tooltip.Content>
    </Tooltip>
  );
}

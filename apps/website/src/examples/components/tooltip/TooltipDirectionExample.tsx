import './TooltipDirectionExample.module.scss';

import { Tooltip } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <div dir="rtl">
      <Tooltip>
        <Tooltip.Trigger>{t('examples.tooltip.copy.rtlPreview')}</Tooltip.Trigger>
        <Tooltip.Content placement="topStart">
          {t('examples.tooltip.copy.workspaceDetails')}
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}

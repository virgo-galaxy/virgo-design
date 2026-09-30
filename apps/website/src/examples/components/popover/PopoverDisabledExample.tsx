import './PopoverDisabledExample.module.scss';

import { Popover } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  return (
    <Popover disabled>
      <Popover.Trigger>{t('examples.popover.copy.disabledPopover')}</Popover.Trigger>
      <Popover.Content>{t('examples.popover.copy.unavailable')}</Popover.Content>
    </Popover>
  );
}

import { Tooltip } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

import { portalProps } from './portal-props';

export function TooltipExample() {
  const { t } = useTranslation();

  return (
    <Tooltip openDelay={100} data-docs-primitive="tooltip">
      <Tooltip.Trigger>{t('primitives.examples.hoverOrFocus')}</Tooltip.Trigger>
      <Tooltip.Content {...portalProps}>{t('primitives.examples.helpfulContext')}</Tooltip.Content>
    </Tooltip>
  );
}

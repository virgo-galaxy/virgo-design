import './TooltipDynamicExample.module.scss';

import { Tooltip } from '@virgo-design/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [detailed, setDetailed] = useState(false);
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => setDetailed(true), 900);
    return () => clearTimeout(timer);
  }, [open]);
  return (
    <Tooltip
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setDetailed(false);
      }}
    >
      <Tooltip.Trigger>{t('examples.tooltip.copy.changingDescription')}</Tooltip.Trigger>
      <Tooltip.Content placement="topRight">
        {detailed
          ? t('examples.tooltip.details.workspaceDetailsAreReadyTheTooltipKeepsItsArrowConnected')
          : t('examples.tooltip.details.workspaceDetails')}
      </Tooltip.Content>
    </Tooltip>
  );
}

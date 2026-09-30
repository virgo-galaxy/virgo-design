import { Tooltip } from '@virgo-design/ui';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TooltipActivationExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const detailsId = useId();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={styles.root!}>
      <Tooltip closeOnClick={false}>
        <Tooltip.Trigger
          aria-expanded={expanded}
          aria-controls={detailsId}
          onClick={() => setExpanded((value) => !value)}
        >
          {t('examples.tooltip.copy.toggleDetails')}
        </Tooltip.Trigger>
        <Tooltip.Content size="small">
          {expanded
            ? t('examples.tooltip.details.hideDetails')
            : t('examples.tooltip.details.showDetails')}
        </Tooltip.Content>
      </Tooltip>
      <span id={detailsId} hidden={!expanded}>
        {t('examples.tooltip.copy.theDescriptionChangesWithoutClosingTheTooltip')}
      </span>
    </div>
  );
}

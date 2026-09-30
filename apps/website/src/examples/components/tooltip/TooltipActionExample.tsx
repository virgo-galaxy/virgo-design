import { SettingsIcon } from '@virgo-design/icons';
import { Tooltip } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './TooltipActionExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [actions, setActions] = useState(0);
  return (
    <div className={styles.root!}>
      <Tooltip>
        <Tooltip.Trigger
          aria-label={t('examples.tooltip.copy.workspaceSettings')}
          onClick={() => setActions((n) => n + 1)}
        >
          <SettingsIcon size={20} />
        </Tooltip.Trigger>
        <Tooltip.Content>{t('examples.tooltip.copy.openWorkspaceSettings')}</Tooltip.Content>
      </Tooltip>
      <span role="status">
        {t('examples.tooltip.copy.settingsOpened')} {actions}
      </span>
    </div>
  );
}

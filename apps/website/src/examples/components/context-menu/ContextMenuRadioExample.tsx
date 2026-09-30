import { ContextMenu } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './ContextMenuRadioExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [units, setUnits] = useState('pixels');
  return (
    <div className={styles.root!}>
      <ContextMenu>
        <ContextMenu.Trigger
          aria-label={t('examples.contextMenu.copy.canvasUnits')}
          className={styles.trigger!}
        >
          {t('examples.contextMenu.copy.canvasUnitsRightClick')}
        </ContextMenu.Trigger>
        <ContextMenu.Content aria-label={t('examples.contextMenu.copy.canvasUnits')}>
          <ContextMenu.RadioGroup
            value={units}
            onValueChange={setUnits}
            aria-label={t('examples.contextMenu.copy.units')}
          >
            <ContextMenu.RadioItem value="pixels">
              {t('examples.contextMenu.copy.pixels')}
            </ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="points">
              {t('examples.contextMenu.copy.points')}
            </ContextMenu.RadioItem>
          </ContextMenu.RadioGroup>
        </ContextMenu.Content>
      </ContextMenu>
      <span role="status">
        {t('examples.contextMenu.copy.units9')} {units}
      </span>
    </div>
  );
}

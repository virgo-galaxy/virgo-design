import { Menu } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './MenuCheckboxExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [grid, setGrid] = useState(true);
  return (
    <div className={styles.root!}>
      <Menu>
        <Menu.Trigger>{t('examples.menu.copy.viewOptions')}</Menu.Trigger>
        <Menu.Content>
          <Menu.CheckboxItem checked={grid} onCheckedChange={setGrid}>
            {t('examples.menu.copy.showGrid')}
          </Menu.CheckboxItem>
          <Menu.CheckboxItem>{t('examples.menu.copy.showGuides')}</Menu.CheckboxItem>
        </Menu.Content>
      </Menu>
      <span role="status">
        {t('examples.menu.copy.grid')}
        {grid ? 'on' : 'off'}
      </span>
    </div>
  );
}

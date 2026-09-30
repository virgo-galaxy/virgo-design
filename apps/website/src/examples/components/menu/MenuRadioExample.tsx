import { Menu } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './MenuRadioExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [zoom, setZoom] = useState('100');
  return (
    <div className={styles.root!}>
      <Menu>
        <Menu.Trigger>{t('examples.menu.copy.zoomOptions')}</Menu.Trigger>
        <Menu.Content>
          <Menu.Group label={t('examples.menu.copy.zoom')}>
            <Menu.RadioGroup
              value={zoom}
              onValueChange={setZoom}
              aria-label={t('examples.menu.copy.zoom')}
            >
              {['50', '100', '200'].map((value) => (
                <Menu.RadioItem key={value} value={value}>
                  {value}%
                </Menu.RadioItem>
              ))}
            </Menu.RadioGroup>
          </Menu.Group>
        </Menu.Content>
      </Menu>
      <span role="status">
        {t('examples.menu.copy.zoom')} {zoom}%
      </span>
    </div>
  );
}

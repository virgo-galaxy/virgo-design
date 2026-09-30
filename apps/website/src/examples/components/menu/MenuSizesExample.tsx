import { CheckIcon } from '@virgo-design/icons';
import { Menu } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './MenuSizesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [action, setAction] = useState('Choose a menu.');
  return (
    <div className={styles.root!}>
      <div className={styles.stage!}>
        {(['small', 'medium', 'large'] as const).map((size) => (
          <Menu key={size} size={size}>
            <Menu.Trigger>{size}</Menu.Trigger>
            <Menu.Content>
              <Menu.Item icon={<CheckIcon />} onSelect={() => setAction(`${size} selected`)}>
                {t('examples.menu.copy.select')}
              </Menu.Item>
              <Menu.Item disabled>{t('examples.menu.copy.unavailable')}</Menu.Item>
            </Menu.Content>
          </Menu>
        ))}
      </div>
      <span role="status">{translateExampleText(t, 'menu', action)}</span>
    </div>
  );
}

import { Dropdown, Popover } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './PopoverNestedMenuExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [visibility, setVisibility] = useState('Private');
  return (
    <Popover>
      <Popover.Trigger>{t('examples.popover.copy.sharingSettings')}</Popover.Trigger>
      <Popover.Content aria-label={t('examples.popover.copy.sharingSettingsPanel')} arrow>
        <div className={styles.root!}>
          <strong>{t('examples.popover.copy.sharing')}</strong>
          <p className={styles.text!}>
            {t('examples.popover.copy.visibility')} {translateExampleText(t, 'popover', visibility)}
          </p>
          <Dropdown>
            <Dropdown.Trigger>{t('examples.popover.copy.changeVisibility')}</Dropdown.Trigger>
            <Dropdown.Content>
              {[
                t('examples.popover.details.private'),
                t('examples.popover.details.team'),
                t('examples.popover.details.public'),
              ].map((value) => (
                <Dropdown.Item
                  key={value}
                  checked={visibility === value}
                  onSelect={() => setVisibility(value)}
                >
                  {value}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
          <Popover.Close>{t('examples.popover.copy.done')}</Popover.Close>
        </div>
      </Popover.Content>
    </Popover>
  );
}

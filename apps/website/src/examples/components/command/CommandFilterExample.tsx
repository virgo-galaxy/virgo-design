import { Command } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './CommandFilterExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [selection, setSelection] = useState<string | null>(null);

  return (
    <div className={styles.root!}>
      <Command filter={(value, search) => value.startsWith(search.toLowerCase())}>
        <Command.Input
          aria-label={t('examples.command.copy.prefixFilter')}
          placeholder={t('examples.command.copy.tryPref')}
        />
        <Command.List>
          <Command.Empty>{t('examples.command.copy.noPrefixMatch')}</Command.Empty>
          {['option-a', 'option-b', 'option-c'].map((value) => (
            <Command.Item key={value} value={value} onSelect={setSelection}>
              {value}
            </Command.Item>
          ))}
        </Command.List>
      </Command>
      <span role="status">
        {t('examples.command.copy.selected')} {selection ?? t('examples.command.details.none')}
      </span>
    </div>
  );
}

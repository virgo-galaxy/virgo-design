import { SettingsIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './FloatingActionVariantsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const [selected, setSelected] = useState('none');

  return (
    <div className={styles.root!}>
      {(['primary', 'secondary', 'outline', 'text'] as const).map((variant) => (
        <FloatingAction
          key={variant}
          variant={variant}
          aria-label={t('examples.floatingAction.details.valueSettings', {
            v0: translateExampleText(t, 'floatingAction', String(variant)),
          })}
          onClick={() => setSelected(variant)}
        >
          <SettingsIcon />
        </FloatingAction>
      ))}
      <span role="status">
        {t('examples.floatingAction.copy.selected')} {selected}
      </span>
    </div>
  );
}

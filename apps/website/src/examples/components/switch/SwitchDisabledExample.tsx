import { Switch } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './SwitchDisabledExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['toggle', 'fader'] as const).map((appearance) => (
        <div key={appearance} className={styles.stage!}>
          <span>{appearance}</span>
          <Switch
            aria-label={t('examples.switch.details.disabledValueOff', {
              v0: translateExampleText(t, 'switch', String(appearance)),
            })}
            appearance={appearance}
            disabled
          />
          <Switch
            aria-label={t('examples.switch.details.disabledValueOn', {
              v0: translateExampleText(t, 'switch', String(appearance)),
            })}
            appearance={appearance}
            defaultChecked
            disabled
          />
        </div>
      ))}
    </div>
  );
}

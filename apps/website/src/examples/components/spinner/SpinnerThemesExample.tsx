import { Spinner } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './SpinnerThemesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {(['light', 'dark'] as const).map((theme) => (
        <div key={theme} data-theme={theme} className={styles.stage!}>
          <Spinner
            intent="neutral"
            aria-label={t('examples.spinner.details.loadingInValueTheme', {
              v0: translateExampleText(t, 'spinner', String(theme)),
            })}
          />
        </div>
      ))}
    </div>
  );
}

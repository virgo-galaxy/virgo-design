import { Progress } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './ProgressValuesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      {[0, 25, 80, 100].map((value) => (
        <Progress
          key={value}
          value={value}
          label={t('examples.progress.details.valueOf100', {
            v0: translateExampleText(t, 'progress', String(value)),
          })}
          showValue
        />
      ))}
      <Progress value={3} max={4} label={t('examples.progress.copy.threeOfFour')} showValue />
    </div>
  );
}

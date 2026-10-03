import { Statistic } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './StatisticCompositionExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <Statistic.Root>
        <Statistic.Label>{t('components.statistic.label')}</Statistic.Label>
        <Statistic.Value>$12,840</Statistic.Value>
        <Statistic.Trend direction="up" intent="positive">
          12.8%
        </Statistic.Trend>
        <Statistic.Description>{t('components.statistic.support')}</Statistic.Description>
      </Statistic.Root>
    </div>
  );
}

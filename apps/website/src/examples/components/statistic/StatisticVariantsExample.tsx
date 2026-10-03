import { Statistic } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './StatisticVariantsExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <Statistic
        label={t('components.statistic.label')}
        value="12,840"
        prefix="$"
        suffix="USD"
        trend={
          <Statistic.Trend direction="up" intent="positive">
            12.8%
          </Statistic.Trend>
        }
        description={t('components.statistic.support')}
      />
      <Statistic
        label={t('components.statistic.other')}
        value={24}
        trend={
          <Statistic.Trend direction="down" intent="negative">
            −3
          </Statistic.Trend>
        }
      />
      <Statistic label={t('components.statistic.loading')} loading />
    </div>
  );
}

import { Button, Statistic } from '@virgo-design/ui';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './StatisticAnimationExample.module.scss';

export default function App() {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(256);
  const [version, setVersion] = useState(0);
  const format = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 0 }),
    [i18n.language],
  );
  return (
    <div className={styles.root}>
      <Statistic
        key={version}
        label={t('components.statistic.animatedValue')}
        value={value}
        animation
        formatter={format.format}
      />
      <div className={styles.actions}>
        <Button variant="outline" onClick={() => setValue((current) => current - 10)}>
          −10
        </Button>
        <Button variant="outline" onClick={() => setValue((current) => current + 10)}>
          +10
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setValue(256);
            setVersion((current) => current + 1);
          }}
        >
          {t('components.statistic.replay')}
        </Button>
      </div>
    </div>
  );
}

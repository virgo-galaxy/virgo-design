import { Slider } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SliderRangeExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [range, setRange] = useState([20, 80]);
  const [bounded, setBounded] = useState([20, 50, 80]);
  const start = t('examples.slider.copy.minimum');
  const end = t('examples.slider.copy.maximum');
  const current = t('examples.slider.copy.current');
  return (
    <div className={styles.root}>
      <div>
        <p>
          {start}: {range[0]} · {end}: {range[1]}
        </p>
        <Slider.Range
          aria-label={t('examples.slider.copy.interval')}
          value={range}
          onValueChange={setRange}
          thumbLabels={[start, end]}
        />
      </div>
      <div>
        <p>
          {start}: {bounded[0]} · {current}: {bounded[1]} · {end}: {bounded[2]}
        </p>
        <Slider.Range
          aria-label={t('examples.slider.copy.bounded')}
          value={bounded}
          onValueChange={setBounded}
          thumbLabels={[start, current, end]}
        />
      </div>
    </div>
  );
}

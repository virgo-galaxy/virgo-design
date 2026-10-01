import { Field, Slider } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SliderControlledExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  const [value, setValue] = useState(40);
  return (
    <div className={styles.root}>
      <Field>
        <Field.Label>
          {t('examples.slider.copy.label')}: {value}
        </Field.Label>
        <Slider value={value} onValueChange={setValue} min={0} max={100} />
        <Field.Description>{t('examples.slider.copy.hint')}</Field.Description>
      </Field>
    </div>
  );
}

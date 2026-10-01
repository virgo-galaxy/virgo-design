import { Field, Slider } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SliderStepsExample.module.scss';
export default function App() {
  const { t } = useTranslation();
  return (
    <div className={styles.root}>
      <>
        <Field>
          <Field.Label>{t('examples.slider.copy.step')}</Field.Label>
          <Slider min={0} max={10} step={2} defaultValue={4} size="small" />
        </Field>
        <Field readOnly>
          <Field.Label>{t('examples.slider.copy.readonly')}</Field.Label>
          <Slider defaultValue={60} />
        </Field>
        <Field disabled>
          <Field.Label>{t('examples.slider.copy.disabled')}</Field.Label>
          <Slider defaultValue={25} size="large" />
        </Field>
      </>
    </div>
  );
}

import { Radio } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './RadioDisabledExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const name = useId();
  return (
    <div className={styles.root!}>
      <Radio disabled name={`${name}-off`}>
        {t('examples.radio.copy.disabledUnchecked')}
      </Radio>
      <Radio defaultChecked disabled name={`${name}-on`}>
        {t('examples.radio.copy.disabledChecked')}
      </Radio>
    </div>
  );
}

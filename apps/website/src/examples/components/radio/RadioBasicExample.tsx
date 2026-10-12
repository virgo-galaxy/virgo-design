import { Radio } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './RadioBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const name = useId();
  return (
    <div className={styles.root!}>
      <Radio name={name} value="option-a">
        {t('examples.radio.copy.optionA')}
      </Radio>
      <Radio name={name} value="option-b" defaultChecked>
        {t('examples.radio.copy.optionB')}
      </Radio>
    </div>
  );
}

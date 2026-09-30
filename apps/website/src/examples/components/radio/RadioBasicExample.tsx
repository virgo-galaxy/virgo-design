import { Radio } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './RadioBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  const name = useId();
  return (
    <div className={styles.root!}>
      <Radio name={name} value="apple">
        {t('examples.radio.copy.apple')}
      </Radio>
      <Radio name={name} value="pear" defaultChecked>
        {t('examples.radio.copy.pear')}
      </Radio>
    </div>
  );
}

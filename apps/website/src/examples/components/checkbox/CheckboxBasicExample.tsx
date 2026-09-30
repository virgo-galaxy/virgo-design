import { Checkbox } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CheckboxBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Checkbox>{t('examples.checkbox.copy.unchecked')}</Checkbox>
      <Checkbox defaultChecked>{t('examples.checkbox.copy.checked')}</Checkbox>
      <Checkbox indeterminate>{t('examples.checkbox.copy.indeterminate')}</Checkbox>
    </div>
  );
}

import { Checkbox } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CheckboxDisabledExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Checkbox disabled>{t('examples.checkbox.copy.unchecked')}</Checkbox>
      <Checkbox defaultChecked disabled>
        {t('examples.checkbox.copy.checked')}
      </Checkbox>
      <Checkbox indeterminate disabled>
        {t('examples.checkbox.copy.indeterminate')}
      </Checkbox>
    </div>
  );
}

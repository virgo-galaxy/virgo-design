import { Input } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './InputClearableExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Input clearable aria-label={t('examples.input.copy.clearableValue')} defaultValue="Item A" />
    </div>
  );
}

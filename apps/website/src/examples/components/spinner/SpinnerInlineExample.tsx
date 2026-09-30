import { Spinner } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SpinnerInlineExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <span className={styles.root!}>
      <Spinner size="sm" />
      {t('examples.spinner.copy.syncingChanges')}
    </span>
  );
}

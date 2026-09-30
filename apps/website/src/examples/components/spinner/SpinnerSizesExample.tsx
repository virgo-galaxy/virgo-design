import { Spinner } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SpinnerSizesExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Spinner
        size="sm"
        intent="neutral"
        aria-label={t('examples.spinner.copy.smallLoadingIndicator')}
      />
      <Spinner
        size="md"
        intent="brand"
        aria-label={t('examples.spinner.copy.mediumLoadingIndicator')}
      />
      <Spinner size="lg" aria-label={t('examples.spinner.copy.largeLoadingIndicator')} />
    </div>
  );
}

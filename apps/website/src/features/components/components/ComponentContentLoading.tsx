import { Spinner } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './component-content-loading.module.scss';

export function ComponentContentLoading() {
  const { t } = useTranslation();
  return (
    <div className={styles.root} data-component-content-loading="">
      <Spinner size="lg" intent="brand" aria-label={t('app.controls.loadingPage')} />
    </div>
  );
}

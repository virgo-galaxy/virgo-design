import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './PaginationDisabledExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Pagination
        total={85}
        defaultPage={3}
        showAll
        disabled
        aria-label={t('examples.pagination.copy.disabledPagination')}
      />
    </div>
  );
}

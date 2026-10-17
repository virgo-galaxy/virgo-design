import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './PaginationTotalExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Pagination
        total={85}
        showTotal
        aria-label={t('examples.pagination.copy.totalPagination')}
      />
    </div>
  );
}

import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { usePaginationLabels } from '@/examples/components/pagination/use-pagination-labels';

import styles from './PaginationTotalExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const paginationLabels = usePaginationLabels();

  return (
    <div className={styles.root!}>
      <Pagination
        labels={paginationLabels}
        total={85}
        showTotal
        aria-label={t('examples.pagination.copy.totalPagination')}
      />
    </div>
  );
}

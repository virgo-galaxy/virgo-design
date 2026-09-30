import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { usePaginationLabels } from '@/examples/components/pagination/use-pagination-labels';

import styles from './PaginationPageSizeExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const paginationLabels = usePaginationLabels();

  return (
    <div className={styles.root!}>
      <Pagination
        labels={paginationLabels}
        total={500}
        defaultPage={3}
        showSizeChanger
        aria-label={t('examples.pagination.copy.pageSizePagination')}
      />
    </div>
  );
}

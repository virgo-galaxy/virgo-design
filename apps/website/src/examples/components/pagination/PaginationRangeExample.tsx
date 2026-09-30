import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { usePaginationLabels } from '@/examples/components/pagination/use-pagination-labels';
import { translateExampleText } from '@/i18n/translate-example-text';

import styles from './PaginationRangeExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const paginationLabels = usePaginationLabels();

  return (
    <div className={styles.root!}>
      <Pagination
        labels={paginationLabels}
        total={85}
        defaultPageSize={20}
        showTotal={(total, [start, end]) =>
          t('examples.pagination.details.valueValueOfValueItems', {
            v0: translateExampleText(t, 'pagination', String(start)),
            v1: translateExampleText(t, 'pagination', String(end)),
            v2: translateExampleText(t, 'pagination', String(total)),
          })
        }
        aria-label={t('examples.pagination.copy.rangePagination')}
      />
    </div>
  );
}

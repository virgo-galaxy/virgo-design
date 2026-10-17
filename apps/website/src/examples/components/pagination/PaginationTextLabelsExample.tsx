import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './PaginationTextLabelsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Pagination
        total={500}
        previousLabel={t('examples.pagination.details.previousPage')}
        nextLabel={t('examples.pagination.details.nextPage')}
        aria-label={t('examples.pagination.copy.textNavigationPagination')}
      />
    </div>
  );
}

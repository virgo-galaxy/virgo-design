import { Pagination } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './PaginationQuickJumpExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Pagination
        total={500}
        showQuickJumper
        aria-label={t('examples.pagination.copy.quickJumpPagination')}
      />
    </div>
  );
}

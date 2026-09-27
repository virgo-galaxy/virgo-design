import { Pagination } from '@virgo-design/ui';

import styles from './PaginationRangeExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Pagination
        total={85}
        defaultPageSize={20}
        showTotal={(total, [start, end]) => `${start}–${end} of ${total} items`}
        aria-label="Range pagination"
      />
    </div>
  );
}

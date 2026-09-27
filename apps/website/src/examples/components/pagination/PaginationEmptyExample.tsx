import { Pagination } from '@virgo-design/ui';

import styles from './PaginationEmptyExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Pagination
        total={0}
        showAll
        showTotal={(total, [start, end]) => `${start}–${end} of ${total} items`}
        aria-label="Empty pagination"
      />
    </div>
  );
}

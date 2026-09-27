import { Pagination } from '@virgo-design/ui';

import styles from './PaginationTextLabelsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Pagination
        total={500}
        previousLabel="Previous"
        nextLabel="Next"
        aria-label="Text navigation pagination"
      />
    </div>
  );
}

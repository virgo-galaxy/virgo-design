import { Pagination } from '@virgo-design/ui';

import styles from './PaginationBasicExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Pagination total={50} aria-label="Basic pagination" />
    </div>
  );
}

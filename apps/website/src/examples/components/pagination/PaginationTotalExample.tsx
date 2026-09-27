import { Pagination } from '@virgo-design/ui';

import styles from './PaginationTotalExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Pagination total={85} showTotal aria-label="Total pagination" />
    </div>
  );
}

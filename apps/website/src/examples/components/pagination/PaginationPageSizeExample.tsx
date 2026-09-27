import { Pagination } from '@virgo-design/ui';

import styles from './PaginationPageSizeExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Pagination total={500} defaultPage={3} showSizeChanger aria-label="Page size pagination" />
    </div>
  );
}

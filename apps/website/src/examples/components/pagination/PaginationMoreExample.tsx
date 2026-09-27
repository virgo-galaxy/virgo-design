import { Pagination } from '@virgo-design/ui';

import styles from './PaginationMoreExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Pagination total={500} defaultPage={6} aria-label="Long pagination" />
    </div>
  );
}

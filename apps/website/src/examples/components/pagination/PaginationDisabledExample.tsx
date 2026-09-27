import { Pagination } from '@virgo-design/ui';

import styles from './PaginationDisabledExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Pagination total={85} defaultPage={3} showAll disabled aria-label="Disabled pagination" />
    </div>
  );
}

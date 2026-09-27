import { Pagination } from '@virgo-design/ui';

import styles from './PaginationQuickJumpExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Pagination total={500} showQuickJumper aria-label="Quick jump pagination" />
    </div>
  );
}

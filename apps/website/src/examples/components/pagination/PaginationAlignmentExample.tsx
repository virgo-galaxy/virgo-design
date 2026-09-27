import { Pagination } from '@virgo-design/ui';

import styles from './PaginationAlignmentExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      {(['left', 'center', 'right'] as const).map((align) => (
        <Pagination key={align} total={50} align={align} aria-label={`${align} pagination`} />
      ))}
    </div>
  );
}

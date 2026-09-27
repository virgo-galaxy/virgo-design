import { SearchIcon } from '@virgo-design/icons';
import { Empty } from '@virgo-design/ui';

import styles from './EmptySearchExample.module.scss';

export default function App() {
  return (
    <Empty size="sm" aria-label="No search results" className={styles.root!}>
      <Empty.Icon>
        <SearchIcon />
      </Empty.Icon>
      <Empty.Title>No matching results</Empty.Title>
      <Empty.Description>Try a different search term.</Empty.Description>
    </Empty>
  );
}

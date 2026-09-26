import { SearchIcon } from '@virgo-design/icons';
import { Empty } from '@virgo-design/ui';

export default function App() {
  return (
    <Empty size="sm" aria-label="No search results" style={{ width: '100%', maxWidth: 320 }}>
      <Empty.Icon>
        <SearchIcon />
      </Empty.Icon>
      <Empty.Title>No matching results</Empty.Title>
      <Empty.Description>Try a different search term.</Empty.Description>
    </Empty>
  );
}

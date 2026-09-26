import { Pagination } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%' }}>
      <Pagination
        total={0}
        showAll
        showTotal={(total, [start, end]) => `${start}–${end} of ${total} items`}
        aria-label="Empty pagination"
      />
    </div>
  );
}

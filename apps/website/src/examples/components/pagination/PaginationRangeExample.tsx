import { Pagination } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%' }}>
      <Pagination
        total={85}
        defaultPageSize={20}
        showTotal={(total, [start, end]) => `${start}–${end} of ${total} items`}
        aria-label="Range pagination"
      />
    </div>
  );
}

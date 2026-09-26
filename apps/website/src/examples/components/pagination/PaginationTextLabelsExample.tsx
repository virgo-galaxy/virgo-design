import { Pagination } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%' }}>
      <Pagination
        total={500}
        previousLabel="Previous"
        nextLabel="Next"
        aria-label="Text navigation pagination"
      />
    </div>
  );
}

import { Pagination } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%' }}>
      <Pagination total={500} defaultPage={3} showSizeChanger aria-label="Page size pagination" />
    </div>
  );
}

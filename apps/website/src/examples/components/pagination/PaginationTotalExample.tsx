import { Pagination } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%' }}>
      <Pagination total={85} showTotal aria-label="Total pagination" />
    </div>
  );
}

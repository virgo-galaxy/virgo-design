import { Pagination } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%' }}>
      <Pagination total={500} showQuickJumper aria-label="Quick jump pagination" />
    </div>
  );
}

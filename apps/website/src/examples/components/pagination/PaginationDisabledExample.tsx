import { Pagination } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ width: '100%' }}>
      <Pagination total={85} defaultPage={3} showAll disabled aria-label="Disabled pagination" />
    </div>
  );
}

import { Pagination } from '@virgo-design/ui';

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 24, width: '100%' }}>
      {(['left', 'center', 'right'] as const).map((align) => (
        <Pagination key={align} total={50} align={align} aria-label={`${align} pagination`} />
      ))}
    </div>
  );
}

import { Layout } from '@virgo-design/ui';

export default function App() {
  return (
    <Layout style={{ width: '100%' }}>
      <Layout.Header
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        style={{
          display: 'grid',
          placeItems: 'center',
          padding: 16,
          color: 'var(--vd-neutral-1)',
          minHeight: 56,
        }}
      >
        Header
      </Layout.Header>
      <Layout.Content
        surface={{ background: { type: 'color', value: 'var(--vd-brand-7)' }, border: 'none' }}
        style={{
          display: 'grid',
          placeItems: 'center',
          padding: 16,
          color: 'var(--vd-neutral-1)',
          minHeight: 120,
        }}
      >
        Content
      </Layout.Content>
      <Layout.Footer
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        style={{
          display: 'grid',
          placeItems: 'center',
          padding: 16,
          color: 'var(--vd-neutral-1)',
          minHeight: 56,
        }}
      >
        Footer
      </Layout.Footer>
    </Layout>
  );
}

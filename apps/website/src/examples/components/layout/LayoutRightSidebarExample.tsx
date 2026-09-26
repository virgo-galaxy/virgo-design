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
      <Layout direction="horizontal">
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
        <Layout.Sidebar
          width="25%"
          surface={{ background: { type: 'color', value: 'var(--vd-brand-6)' }, border: 'none' }}
        >
          <span
            style={{
              display: 'grid',
              height: '100%',
              placeItems: 'center',
              padding: 8,
              color: 'var(--vd-neutral-1)',
              overflowWrap: 'anywhere',
            }}
          >
            Sidebar
          </span>
        </Layout.Sidebar>
      </Layout>
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

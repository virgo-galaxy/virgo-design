import { Layout } from '@virgo-design/ui';

const labelStyle = {
  display: 'grid',
  placeItems: 'center',
  color: 'color-mix(in srgb, var(--vd-neutral-1) 80%, transparent)',
  fontSize: 12,
  fontWeight: 400,
} as const;

export default function App() {
  return (
    <Layout style={{ width: '100%', height: 400 }}>
      <Layout.Header
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        style={{ ...labelStyle, minHeight: 64 }}
      >
        Header
      </Layout.Header>
      <Layout direction="horizontal">
        <Layout.Sidebar
          width={64}
          surface={{ background: { type: 'color', value: 'var(--vd-brand-6)' }, border: 'none' }}
          style={{ borderInlineEnd: '1px solid var(--vd-brand-5)' }}
        >
          <span style={{ ...labelStyle, height: '100%' }}>Rail</span>
        </Layout.Sidebar>
        <Layout.Sidebar
          width={160}
          surface={{ background: { type: 'color', value: 'var(--vd-brand-6)' }, border: 'none' }}
        >
          <span style={{ ...labelStyle, height: '100%' }}>Sidebar</span>
        </Layout.Sidebar>
        <Layout.Content
          surface={{ background: { type: 'color', value: 'var(--vd-brand-7)' }, border: 'none' }}
          style={{ ...labelStyle, minHeight: 240 }}
        >
          Content
        </Layout.Content>
      </Layout>
      <Layout.Footer
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        style={{ ...labelStyle, minHeight: 48 }}
      >
        Footer
      </Layout.Footer>
    </Layout>
  );
}

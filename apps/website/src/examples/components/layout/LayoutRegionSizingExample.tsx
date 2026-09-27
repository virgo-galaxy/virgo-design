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
        height={64}
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        style={labelStyle}
      >
        Header
      </Layout.Header>
      <Layout direction="horizontal">
        <Layout.Sidebar
          width={224}
          surface={{ background: { type: 'color', value: 'var(--vd-brand-6)' }, border: 'none' }}
        >
          <span style={{ ...labelStyle, height: '100%' }}>Sidebar</span>
        </Layout.Sidebar>
        <Layout.Content
          padding={24}
          surface={{ background: { type: 'color', value: 'var(--vd-brand-4)' }, border: 'none' }}
          style={{ boxShadow: 'inset 0 0 0 1px var(--vd-brand-3)' }}
        >
          <div
            style={{
              ...labelStyle,
              height: '100%',
              background: 'var(--vd-brand-7)',
              boxShadow: 'inset 0 0 0 1px var(--vd-brand-8)',
            }}
          >
            Content
          </div>
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

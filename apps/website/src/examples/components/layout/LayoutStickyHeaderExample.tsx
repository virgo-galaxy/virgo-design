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
    <div style={{ width: '100%', height: 400, overflow: 'auto' }}>
      <Layout style={{ width: '100%', minHeight: 720 }}>
        <Layout.Header
          position="sticky"
          top={0}
          height={64}
          surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
          style={labelStyle}
        >
          Header
        </Layout.Header>
        <Layout.Content
          surface={{ background: { type: 'color', value: 'var(--vd-brand-7)' }, border: 'none' }}
          style={{ ...labelStyle, minHeight: 608 }}
        >
          Content
        </Layout.Content>
        <Layout.Footer
          surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
          style={{ ...labelStyle, minHeight: 48 }}
        >
          Footer
        </Layout.Footer>
      </Layout>
    </div>
  );
}

import { Layout } from '@virgo-design/ui';

const labelStyle = {
  display: 'grid',
  placeItems: 'center',
  color: 'color-mix(in srgb, var(--vd-neutral-1) 80%, transparent)',
  fontSize: 12,
  fontWeight: 400,
} as const;

const hatchStyle = {
  backgroundImage:
    'repeating-linear-gradient(135deg, transparent 0 7px, color-mix(in srgb, var(--vd-neutral-1) 14%, transparent) 7px 8px)',
} as const;

export default function App() {
  return (
    <Layout style={{ width: '100%', height: 400 }}>
      <Layout.Header
        height={64}
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        style={{ ...labelStyle, ...hatchStyle }}
      >
        Header
      </Layout.Header>
      <Layout direction="horizontal">
        <Layout.Sidebar
          width={224}
          surface={{ background: { type: 'color', value: 'var(--vd-brand-6)' }, border: 'none' }}
        >
          <span style={{ ...labelStyle, ...hatchStyle, width: '100%', height: '100%' }}>
            Sidebar
          </span>
        </Layout.Sidebar>
        <Layout.Content
          surface={{ background: { type: 'color', value: 'var(--vd-brand-7)' }, border: 'none' }}
          style={{ ...labelStyle, ...hatchStyle }}
        >
          Content
        </Layout.Content>
      </Layout>
      <Layout.Footer
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        style={{ ...labelStyle, ...hatchStyle, minHeight: 48 }}
      >
        Footer
      </Layout.Footer>
    </Layout>
  );
}

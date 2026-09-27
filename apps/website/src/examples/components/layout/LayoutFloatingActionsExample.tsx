import { CircleInfoIcon, DashboardIcon } from '@virgo-design/icons';
import { FloatingAction, Layout, Surface } from '@virgo-design/ui';

const headerSideWidth = 224;
const headerLogoGap = 16;
const headerLogoWidth = headerSideWidth - headerLogoGap * 2;

const labelStyle = {
  fontSize: 12,
  fontWeight: 400,
  color: 'var(--vd-text-tertiary)',
} as const;

export default function App() {
  return (
    <div
      style={{
        width: '100%',
        height: 560,
        border: '1px solid var(--vd-border-subtle)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Layout style={{ height: '100%' }}>
        <Layout.Header
          height={64}
          surface={{ tone: 'default', border: 'subtle' }}
          style={{ position: 'relative', padding: 0 }}
        >
          <span
            aria-label="Logo"
            style={{
              position: 'absolute',
              insetInlineStart: headerLogoGap,
              insetBlockStart: '50%',
              width: headerLogoWidth,
              height: 'var(--vd-sizing-32)',
              borderRadius: 'var(--vd-radius-6)',
              background: 'var(--vd-surface-strong)',
              transform: 'translateY(-50%)',
            }}
          />
          <span
            style={{
              ...labelStyle,
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              pointerEvents: 'none',
            }}
          >
            Header
          </span>
        </Layout.Header>
        <Layout.Content padding={16} surface={{ tone: 'secondary' }} style={{ minHeight: 0 }}>
          <Surface
            tone="elevated"
            radius={12}
            border="subtle"
            style={{ position: 'relative', height: '100%', minHeight: 0 }}
          >
            <span
              style={{
                ...labelStyle,
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              Content
            </span>
            <Layout.Floating offset={16}>
              <FloatingAction variant="primary" aria-label="Help">
                <CircleInfoIcon />
              </FloatingAction>
              <FloatingAction.Group>
                <FloatingAction.Trigger aria-label="Quick actions" />
                <FloatingAction.Content aria-label="Content actions">
                  <FloatingAction aria-label="Inspect layout">
                    <DashboardIcon />
                  </FloatingAction>
                  <FloatingAction aria-label="Show tips">
                    <CircleInfoIcon />
                  </FloatingAction>
                </FloatingAction.Content>
              </FloatingAction.Group>
            </Layout.Floating>
          </Surface>
        </Layout.Content>
      </Layout>
    </div>
  );
}

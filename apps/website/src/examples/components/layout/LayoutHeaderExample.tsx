import { LayoutIcon } from '@virgo-design/icons';
import { Layout, NavigationMenu, Surface } from '@virgo-design/ui';
import { useState } from 'react';

const headerSideWidth = 224;
const headerLogoGap = 16;
const headerLogoWidth = headerSideWidth - headerLogoGap * 2;

const contentLabelStyle = {
  fontSize: 12,
  fontWeight: 400,
  color: 'var(--vd-text-tertiary)',
} as const;

export default function App() {
  const [selected, setSelected] = useState('nav-01');

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
      <Layout surface={{ tone: 'secondary' }} style={{ height: '100%' }}>
        <Layout.Header
          position="static"
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
          <div
            style={{
              position: 'absolute',
              insetBlock: 0,
              insetInlineStart: headerSideWidth,
              insetInlineEnd: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <NavigationMenu
              value={selected}
              onValueChange={setSelected}
              aria-label="Header navigation"
            >
              <NavigationMenu.List style={{ flexWrap: 'wrap' }}>
                {[
                  { id: 'nav-01', label: 'Nav 01' },
                  { id: 'nav-02', label: 'Nav 02' },
                  { id: 'nav-03', label: 'Nav 03' },
                ].map(({ id, label }) => (
                  <NavigationMenu.Item key={id} value={id} icon={<LayoutIcon />}>
                    <NavigationMenu.Link
                      href={`#${id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        setSelected(id);
                      }}
                    >
                      {label}
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                ))}
              </NavigationMenu.List>
            </NavigationMenu>
          </div>
        </Layout.Header>
        <Layout.Content padding={16} style={{ minHeight: 0 }}>
          <Surface
            tone="elevated"
            radius={12}
            border="subtle"
            style={{ display: 'grid', height: '100%', minHeight: 0, placeItems: 'center' }}
          >
            <span style={contentLabelStyle}>Content</span>
          </Surface>
        </Layout.Content>
        <Layout.Footer
          surface={{ tone: 'default', border: 'subtle' }}
          style={{ display: 'grid', height: 48, placeItems: 'center', padding: '0 16px' }}
        >
          <span style={contentLabelStyle}>Footer</span>
        </Layout.Footer>
      </Layout>
    </div>
  );
}

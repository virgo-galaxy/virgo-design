import { Button, Layout, NavigationMenu, Surface } from '@virgo-design/ui';
import { useState } from 'react';

export default function App() {
  const [colorful, setColorful] = useState(false);
  const [selected, setSelected] = useState('Overview');
  return (
    <div
      style={{
        width: '100%',
        border: '1px solid var(--vd-border-subtle)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <Layout surface={{ tone: 'secondary' }}>
        <Layout.Header
          position="static"
          height={64}
          logo={<strong>Virgo</strong>}
          style={{ flexWrap: 'wrap', gap: 12, padding: '12px 16px' }}
          surface={{
            tone: 'default',
            border: 'subtle',
            ...(colorful
              ? {
                  background: {
                    type: 'gradient' as const,
                    value:
                      'linear-gradient(120deg, var(--vd-brand-subtle), var(--vd-surface-elevated))',
                  },
                }
              : {}),
          }}
          actions={
            <Button size="small" variant="text" onClick={() => setColorful((value) => !value)}>
              {colorful ? 'Plain header' : 'Gradient header'}
            </Button>
          }
        >
          <NavigationMenu
            value={selected}
            onValueChange={setSelected}
            aria-label="Header navigation"
          >
            <NavigationMenu.List style={{ flexWrap: 'wrap' }}>
              {['Overview', 'Projects', 'Activity'].map((label) => (
                <NavigationMenu.Item key={label} value={label}>
                  <NavigationMenu.Link
                    href={`#${label.toLowerCase()}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setSelected(label);
                    }}
                  >
                    {label}
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>
          </NavigationMenu>
        </Layout.Header>
        <Layout.Content padding={16}>
          <Surface
            tone="elevated"
            radius={8}
            border="subtle"
            style={{ padding: 24, minHeight: 160 }}
          >
            Your workspace content.
          </Surface>
        </Layout.Content>
        <Layout.Footer style={{ padding: 16, color: 'var(--vd-text-tertiary)' }}>
          Layout owns structure. Surface owns appearance.
        </Layout.Footer>
      </Layout>
    </div>
  );
}

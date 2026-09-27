import { Layout, Surface } from '@virgo-design/ui';

import styles from './SurfaceLayoutCompositionExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Layout surface={{ material: 'glass', radius: 12, border: 'subtle' }}>
        <Layout.Header
          surface={{ material: 'glass', border: 'subtle' }}
          logo={<strong>Virgo</strong>}
        >
          Workspace
        </Layout.Header>
        <Layout direction="horizontal" minHeight={200}>
          <Layout.Sidebar width="30%" surface={{ material: 'translucent', border: 'none' }}>
            <span className={styles.label!}>Sidebar</span>
          </Layout.Sidebar>
          <Layout.Content padding={16} surface={{ tone: 'elevated' }}>
            <strong>Content</strong>
            <Surface tone="secondary" border="subtle" radius={8} className={styles.surface!}>
              A nested semantic surface.
            </Surface>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}

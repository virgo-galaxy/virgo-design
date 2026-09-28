import { CircleInfoIcon, DashboardIcon } from '@virgo-design/icons';
import { FloatingAction, Layout, Surface } from '@virgo-design/ui';

import styles from './LayoutFloatingActionsExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Layout className={styles.layout!}>
        <Layout.Header
          contentAlign="center"
          height={64}
          surface={{ tone: 'default', border: 'subtle' }}
          className={styles.header!}
        >
          <span aria-label="Logo" className={styles.label!} />
          <span className={styles.label2!}>Header</span>
        </Layout.Header>
        <Layout.Content padding={16} surface={{ tone: 'secondary' }} className={styles.content!}>
          <Surface tone="elevated" radius={12} border="subtle" className={styles.surface!}>
            <span className={styles.label3!}>Content</span>
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

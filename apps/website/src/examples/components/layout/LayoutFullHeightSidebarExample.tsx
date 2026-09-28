import { Layout } from '@virgo-design/ui';

import styles from './LayoutFullHeightSidebarExample.module.scss';

export default function App() {
  return (
    <Layout direction="horizontal" className={styles.root!}>
      <Layout.Sidebar
        width={224}
        surface={{ background: { type: 'color', value: 'var(--vd-brand-6)' }, border: 'none' }}
      >
        <span className={styles.label!}>Sidebar</span>
      </Layout.Sidebar>
      <Layout>
        <Layout.Header
          contentAlign="center"
          surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
          className={styles.header!}
        >
          Header
        </Layout.Header>
        <Layout.Content
          surface={{ background: { type: 'color', value: 'var(--vd-brand-7)' }, border: 'none' }}
          className={styles.content!}
        >
          Content
        </Layout.Content>
        <Layout.Footer
          surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
          className={styles.footer!}
        >
          Footer
        </Layout.Footer>
      </Layout>
    </Layout>
  );
}

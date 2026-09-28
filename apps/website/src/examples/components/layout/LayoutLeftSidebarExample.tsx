import { Layout } from '@virgo-design/ui';

import styles from './LayoutLeftSidebarExample.module.scss';

export default function App() {
  return (
    <Layout className={styles.root!}>
      <Layout.Header
        contentAlign="center"
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        className={styles.header!}
      >
        Header
      </Layout.Header>
      <Layout direction="horizontal">
        <Layout.Sidebar
          width={224}
          surface={{ background: { type: 'color', value: 'var(--vd-brand-6)' }, border: 'none' }}
        >
          <span className={styles.label!}>Sidebar</span>
        </Layout.Sidebar>
        <Layout.Content
          surface={{ background: { type: 'color', value: 'var(--vd-brand-7)' }, border: 'none' }}
          className={styles.content!}
        >
          Content
        </Layout.Content>
      </Layout>
      <Layout.Footer
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        className={styles.footer!}
      >
        Footer
      </Layout.Footer>
    </Layout>
  );
}

import { Layout } from '@virgo-design/ui';

import styles from './LayoutRegionSizingExample.module.scss';

export default function App() {
  return (
    <Layout className={styles.root!}>
      <Layout.Header
        height={64}
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
          padding={24}
          surface={{ background: { type: 'color', value: 'var(--vd-brand-4)' }, border: 'none' }}
          className={styles.content!}
        >
          <div className={styles.stage!}>Content</div>
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

import { Layout } from '@virgo-design/ui';

import styles from './LayoutLaneExample.module.scss';

export default function App() {
  return (
    <Layout className={styles.root!}>
      <Layout.Header
        contentAlign="center"
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

        <Layout.Lane
          inset={24}
          surface={{ background: { type: 'color', value: 'var(--vd-brand-4)' }, border: 'none' }}
          className={styles.lane!}
        >
          <Layout.Content className={styles.content!}>
            <div className={styles.stage!}>Content</div>
          </Layout.Content>
        </Layout.Lane>
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

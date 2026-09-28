import { Layout } from '@virgo-design/ui';

import styles from './LayoutStickyHeaderExample.module.scss';

export default function App() {
  return (
    <div className={styles.root!}>
      <Layout className={styles.layout!}>
        <Layout.Header
          contentAlign="center"
          position="sticky"
          top={0}
          height={64}
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
    </div>
  );
}

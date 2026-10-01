import { Layout } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './LayoutResizableSidebarExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Layout className={styles.root!}>
      <Layout.Header
        contentAlign="center"
        height={64}
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        className={styles.header!}
      >
        {t('examples.layout.copy.header')}
      </Layout.Header>
      <Layout direction="horizontal">
        <Layout.Sidebar
          width={224}
          minWidth={160}
          maxWidth={360}
          resizable
          surface={{ background: { type: 'color', value: 'var(--vd-brand-6)' }, border: 'none' }}
        >
          <span className={styles.label!}>{t('examples.layout.copy.sidebar')}</span>
        </Layout.Sidebar>
        <Layout.Content
          as="div"
          surface={{ background: { type: 'color', value: 'var(--vd-brand-7)' }, border: 'none' }}
          className={styles.header!}
        >
          {t('examples.layout.copy.content')}
        </Layout.Content>
      </Layout>
      <Layout.Footer
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        className={styles.footer!}
      >
        {t('examples.layout.copy.footer')}
      </Layout.Footer>
    </Layout>
  );
}

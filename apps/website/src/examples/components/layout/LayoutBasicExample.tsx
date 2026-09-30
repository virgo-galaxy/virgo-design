import { Layout } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './LayoutBasicExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <Layout className={styles.root!}>
      <Layout.Header
        contentAlign="center"
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        className={styles.header!}
      >
        {t('examples.layout.copy.header')}
      </Layout.Header>
      <Layout.Content
        surface={{ background: { type: 'color', value: 'var(--vd-brand-7)' }, border: 'none' }}
        className={styles.content!}
      >
        {t('examples.layout.copy.content')}
      </Layout.Content>
      <Layout.Footer
        surface={{ background: { type: 'color', value: 'var(--vd-brand-5)' }, border: 'none' }}
        className={styles.footer!}
      >
        {t('examples.layout.copy.footer')}
      </Layout.Footer>
    </Layout>
  );
}

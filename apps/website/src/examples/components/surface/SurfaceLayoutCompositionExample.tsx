import { Layout, Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './SurfaceLayoutCompositionExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Layout surface={{ material: 'glass', radius: 12, border: 'subtle' }}>
        <Layout.Header
          contentAlign="center"
          surface={{ material: 'glass', border: 'subtle' }}
          logo={<strong>Virgo</strong>}
        >
          {t('examples.surface.copy.workspace')}
        </Layout.Header>
        <Layout direction="horizontal" minHeight={200}>
          <Layout.Sidebar width="30%" surface={{ material: 'translucent', border: 'none' }}>
            <span className={styles.label!}>{t('examples.surface.copy.sidebar')}</span>
          </Layout.Sidebar>
          <Layout.Content as="div" padding={16} surface={{ tone: 'elevated' }}>
            <strong>{t('examples.surface.copy.content')}</strong>
            <Surface tone="secondary" border="subtle" radius={8} className={styles.surface!}>
              {t('examples.surface.copy.aNestedSemanticSurface')}
            </Surface>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
}

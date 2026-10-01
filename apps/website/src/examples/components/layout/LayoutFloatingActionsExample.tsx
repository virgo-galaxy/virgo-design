import { CircleInfoIcon, DashboardIcon } from '@virgo-design/icons';
import { FloatingAction, Layout, Surface } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './LayoutFloatingActionsExample.module.scss';

export default function App() {
  const { t } = useTranslation();

  return (
    <div className={styles.root!}>
      <Layout className={styles.layout!}>
        <Layout.Header
          contentAlign="center"
          height={64}
          surface={{ tone: 'default', border: 'subtle' }}
          className={styles.header!}
        >
          <span aria-label={t('examples.layout.copy.logo')} className={styles.label!} />
          <span className={styles.label2!}>{t('examples.layout.copy.header')}</span>
        </Layout.Header>
        <Layout.Content
          as="div"
          padding={16}
          surface={{ tone: 'secondary' }}
          className={styles.content!}
        >
          <Surface tone="elevated" radius={12} border="subtle" className={styles.surface!}>
            <span className={styles.label3!}>{t('examples.layout.copy.content')}</span>
            <Layout.Floating offset={16}>
              <FloatingAction variant="primary" aria-label={t('examples.layout.copy.help')}>
                <CircleInfoIcon />
              </FloatingAction>
              <FloatingAction.Group>
                <FloatingAction.Trigger aria-label={t('examples.layout.copy.quickActions')} />
                <FloatingAction.Content aria-label={t('examples.layout.copy.contentActions')}>
                  <FloatingAction aria-label={t('examples.layout.copy.inspectLayout')}>
                    <DashboardIcon />
                  </FloatingAction>
                  <FloatingAction aria-label={t('examples.layout.copy.showTips')}>
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

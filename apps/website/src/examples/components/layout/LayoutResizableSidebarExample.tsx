import {
  Layout,
  type LayoutSidebarDisplayState,
  type LayoutSidebarResizeResult,
  Tag,
} from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LayoutResizableSidebarExample.module.scss';

export default function App() {
  const { t } = useTranslation();
  const [state, setState] = useState<LayoutSidebarDisplayState>('expanded');
  const [width, setWidth] = useState(224);
  const [committed, setCommitted] = useState<LayoutSidebarResizeResult | null>(null);
  const stateLabels = {
    expanded: t('examples.layout.details.expanded'),
    collapsed: t('examples.layout.details.collapsed'),
    hidden: t('examples.layout.details.hidden'),
  };

  return (
    <Layout.SidebarProvider state={state} onStateChange={setState}>
      <Layout className={styles.root!}>
        <Layout.Header height={56} surface={{ border: 'none' }} className={styles.header!}>
          <Layout.SidebarTrigger
            action="expand"
            aria-label={t('examples.layout.details.showSidebar')}
            onClick={() => {
              setWidth(224);
              setCommitted(null);
            }}
          />
          <strong>{t('examples.layout.copy.workspaceNavigation')}</strong>
          <Tag intent="brand">{stateLabels[state]}</Tag>
        </Layout.Header>
        <Layout direction="horizontal">
          <Layout.Sidebar
            width={width}
            collapsedWidth={48}
            minWidth={200}
            maxWidth={320}
            resizable
            collapsible
            resizeSnap={{ collapseAt: 160, hideAt: 24, hysteresis: 16 }}
            onWidthChange={setWidth}
            onResizeEnd={setCommitted}
            surface={{ border: 'none' }}
          >
            {({ collapsed }) => (
              <div className={styles.destinations}>
                {([1, 2, 3] as const).map((item) => (
                  <span key={item}>
                    {collapsed ? item : t(`examples.layout.details.menu${item}`)}
                  </span>
                ))}
              </div>
            )}
          </Layout.Sidebar>
          <Layout.Content
            as="div"
            className={styles.content!}
            surface={{ tone: 'secondary', border: 'none' }}
          >
            <p>{t('examples.layout.details.resizeInstructions')}</p>
            <code>{t('examples.layout.details.expandedWidth', { width })}</code>
            <p className={styles.commit} aria-live="polite">
              {committed
                ? t('examples.layout.details.resizeCommitted', {
                    width: committed.width,
                    state: stateLabels[committed.state],
                  })
                : t('examples.layout.details.resizeRange')}
            </p>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout.SidebarProvider>
  );
}

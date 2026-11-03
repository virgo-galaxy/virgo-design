import { Layout, type LayoutSidebarDisplayState } from '@virgo-design/ui';
import type { RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import * as classes from '@/styles/classes';

import { SidebarControls } from './SidebarControls';
import { SidebarNavigation } from './SidebarNavigation';

export function AppSidebar({
  narrow,
  state,
  toggleRef,
}: {
  narrow: boolean;
  state: LayoutSidebarDisplayState;
  toggleRef: RefObject<HTMLButtonElement | null>;
}) {
  const { t } = useTranslation();
  const overlay = narrow && state === 'expanded';

  return (
    <>
      <Layout.Sidebar
        className={classes.sidebar}
        width={224}
        collapsedWidth={52}
        mode={overlay ? 'overlay' : 'inline'}
        collapsible
        surface={{ tone: 'default', border: 'none', elevation: overlay ? 2 : 0 }}
        trigger={
          <SidebarControls
            state={state}
            railIconSize="regular"
            breathe
            workspaceLabel={t('app.workspace')}
            toggleRef={toggleRef}
          />
        }
      >
        {({ collapsed }) => <SidebarNavigation collapsed={collapsed} />}
      </Layout.Sidebar>
      {overlay ? (
        <Layout.SidebarTrigger
          action="collapse"
          className={classes.backdrop}
          aria-label={t('sidebar.closeNavigation')}
          onClick={() => toggleRef.current?.focus()}
        />
      ) : null}
    </>
  );
}

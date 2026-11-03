import { Badge, Layout, type LayoutSidebarDisplayState, Tooltip } from '@virgo-design/ui';
import type { ReactNode, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import * as classes from '@/styles/classes';

export function SidebarControls({
  state,
  railIconSize,
  breathe,
  workspaceLabel,
  toggleRef,
}: {
  state: LayoutSidebarDisplayState;
  railIconSize: 'regular' | 'large';
  breathe: boolean;
  workspaceLabel?: ReactNode;
  toggleRef: RefObject<HTMLButtonElement | null>;
}) {
  const { t } = useTranslation();

  return (
    <div className={classes.sidebarControls} data-state={state} data-rail-icon-size={railIconSize}>
      {state === 'expanded' ? (
        <span className={classes.workspace}>
          <Badge
            dot
            intent="success"
            animation={breathe ? 'breathe' : 'none'}
            className={classes.statusDot}
          />
          {workspaceLabel ?? t('app.virgoDesignPro')}
        </span>
      ) : null}
      <Tooltip className={classes.sidebarTooltip}>
        <Tooltip.Trigger
          ref={toggleRef}
          render={(props) => (
            <Layout.SidebarTrigger {...props} className={classes.sidebarTrigger} />
          )}
        />
        <Tooltip.Content placement="right" offset={12}>
          {state !== 'expanded' ? t('sidebar.expand') : t('sidebar.collapse')}
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}

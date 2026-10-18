import { Badge, Layout, type LayoutSidebarDisplayState, Tooltip } from '@virgo-design/ui';
import type { ReactNode, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './SidebarControls.module.scss';

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
    <div className={styles.controls} data-state={state} data-rail-icon-size={railIconSize}>
      {state === 'expanded' ? (
        <span className={styles.workspace}>
          <Badge
            dot
            intent="success"
            animation={breathe ? 'breathe' : 'none'}
            className={styles.statusDot}
          />
          {workspaceLabel ?? t('app.virgoDesignPro')}
        </span>
      ) : null}
      <Tooltip className={styles.toggleHint}>
        <Tooltip.Trigger
          ref={toggleRef}
          render={(props) => <Layout.SidebarTrigger {...props} className={styles.toggleButton} />}
        />
        <Tooltip.Content placement="right" offset={12}>
          {state !== 'expanded' ? t('sidebar.expand') : t('sidebar.collapse')}
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}

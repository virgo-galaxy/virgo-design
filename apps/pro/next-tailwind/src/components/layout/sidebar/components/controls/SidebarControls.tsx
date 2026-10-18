import { Badge, Layout, type LayoutSidebarDisplayState, Tooltip } from '@virgo-design/ui';
import type { ReactNode, RefObject } from 'react';
import { useTranslation } from 'react-i18next';

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
    <div
      className={[
        'pro-sidebar-controls-controls data-[state=expanded]:grid',
        'data-[state=expanded]:[grid-template-columns:minmax(0,_1fr)_var(--vd-sizing-28)] data-[state=expanded]:gap-x-8',
        'data-[state=expanded]:items-center data-[state=expanded]:px-8 [box-sizing:border-box] flex [flex:1] min-w-0',
        '[min-height:var(--vd-sizing-28)] justify-center',
      ].join(' ')}
      data-state={state}
      data-rail-icon-size={railIconSize}
    >
      {state === 'expanded' ? (
        <span
          className={[
            "[.pro-sidebar-controls-controls[data-state='expanded']_&]:[grid-column:1]",
            "[.pro-sidebar-controls-controls[data-state='expanded']_&]:[justify-self:center]",
            'flex items-center gap-8 text-text-tertiary [font-family:var(--vd-font-family-mono)] [font-size:var(--vd-font-size-10)]',
            '[letter-spacing:0.8px] whitespace-nowrap',
          ].join(' ')}
        >
          <Badge
            dot
            intent="success"
            animation={breathe ? 'breathe' : 'none'}
            className="flex-none"
          />
          {workspaceLabel ?? t('app.virgoDesignPro')}
        </span>
      ) : null}
      <Tooltip className="[.pro-sidebar-controls-controls[data-state='expanded']_&]:[grid-column:2] [.pro-sidebar-controls-controls[data-state='expanded']_&]:[justify-self:end]">
        <Tooltip.Trigger
          ref={toggleRef}
          render={(props) => (
            <Layout.SidebarTrigger
              {...props}
              className={[
                "[.pro-sidebar-controls-controls[data-state='collapsed'][data-rail-icon-size='large']_&_>_svg]:flex-none",
                "[.pro-sidebar-controls-controls[data-state='collapsed'][data-rail-icon-size='large']_&_>_svg]:[width:var(--vd-sizing-20)]",
                "[.pro-sidebar-controls-controls[data-state='collapsed'][data-rail-icon-size='large']_&_>_svg]:[height:var(--vd-sizing-20)]",
                'flex-none [width:var(--vd-sizing-28)] [min-width:var(--vd-sizing-28)] [height:var(--vd-sizing-28)]',
                '[&_>_svg]:[width:var(--vd-sizing-16)] [&_>_svg]:[height:var(--vd-sizing-16)]',
              ].join(' ')}
            />
          )}
        />
        <Tooltip.Content placement="right" offset={12}>
          {state !== 'expanded' ? t('sidebar.expand') : t('sidebar.collapse')}
        </Tooltip.Content>
      </Tooltip>
    </div>
  );
}

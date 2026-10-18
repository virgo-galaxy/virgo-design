import virgoDesignLogoAsset from '@virgo-design/icons/brands/virgo-design.svg';
import { Layout, type LayoutSidebarDisplayState, Tag, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { proRouteConfig, routePath } from '@/routes';
import { AppLink, useAppNavigation } from '@/routes/navigation';

const virgoDesignLogo = virgoDesignLogoAsset.src;

export function HeaderBrand({
  scale,
  sidebarState,
  onSidebarWidthChange,
}: {
  scale: 'regular' | 'large';
  sidebarState: LayoutSidebarDisplayState;
  onSidebarWidthChange: (width: number) => void;
}) {
  const { t } = useTranslation();
  const navigate = useAppNavigation();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div
      className={[
        'pro-header-brand-brand',
        '[&_img]:block [&_img]:flex-none [&_img]:[width:var(--vd-sizing-32)] [&_img]:[height:auto]',
        'data-[scale=large]:text-(length:--vd-font-size-20)',
        "[&[data-scale='large']_img]:[width:var(--vd-sizing-40)]",
        'viewport-max-640:[&_>_span]:hidden',
        'flex items-center gap-8 text-text-primary no-underline [font-size:var(--vd-font-size-16)] [font-weight:var(--vd-font-weight-600)]',
        '[letter-spacing:-0.5px]',
      ].join(' ')}
      data-scale={scale}
    >
      <Tooltip open={sidebarState === 'hidden' && tooltipOpen} onOpenChange={setTooltipOpen}>
        <Tooltip.Trigger
          render={(props) => (
            <Layout.SidebarTrigger
              {...props}
              action="expand"
              className={[
                'flex-none [width:var(--vd-sizing-36)] [height:var(--vd-sizing-36)]',
                "[&:not([data-state='hidden']):hover]:[color:inherit] [&:not([data-state='hidden']):hover]:[background:transparent]",
                "[&:not([data-state='hidden']):active]:[color:inherit] [&:not([data-state='hidden']):active]:[background:transparent]",
                "[.pro-header-brand-brand[data-scale='large']_&]:[width:var(--vd-sizing-44)]",
                "[.pro-header-brand-brand[data-scale='large']_&]:[height:var(--vd-sizing-44)]",
              ].join(' ')}
              aria-label={
                sidebarState === 'hidden' ? t('app.restoreNavigation') : t('app.virgoDesignProHome')
              }
              onClick={(event) => {
                props.onClick?.(event);

                if (event.defaultPrevented) return;

                if (sidebarState === 'hidden') {
                  onSidebarWidthChange(224);
                } else {
                  event.preventDefault();
                  navigate(routePath(proRouteConfig.home));
                }
              }}
            >
              <img src={virgoDesignLogo} alt="" width="590" height="470" />
            </Layout.SidebarTrigger>
          )}
        />
        <Tooltip.Content>{t('app.restoreNavigation')}</Tooltip.Content>
      </Tooltip>
      <AppLink
        href={routePath(proRouteConfig.home)}
        className="[color:inherit] no-underline viewport-max-640:hidden"
        aria-label={t('app.virgoDesignProHome')}
      >
        {t('app.virgoDesign')}
      </AppLink>
      <Tag
        size="md"
        intent="brand"
        variant="soft"
        className="data-[intent=brand]:[border-color:color-mix(in_srgb,_var(--vd-brand-primary)_24%,_transparent)]"
      >
        {t('app.pro')}
      </Tag>
    </div>
  );
}

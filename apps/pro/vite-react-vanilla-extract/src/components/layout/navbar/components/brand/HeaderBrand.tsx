import virgoDesignLogo from '@virgo-design/icons/brands/virgo-design.svg';
import { Layout, type LayoutSidebarDisplayState, Tag, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';

import { proRouteConfig, routePath } from '@/routes';

import * as styles from './HeaderBrand.css';

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
  const navigate = useNavigate();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className={styles.brand} data-scale={scale}>
      <Tooltip open={sidebarState === 'hidden' && tooltipOpen} onOpenChange={setTooltipOpen}>
        <Tooltip.Trigger
          render={(props) => (
            <Layout.SidebarTrigger
              {...props}
              action="expand"
              className={styles.brandTrigger}
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
      <Link
        to={routePath(proRouteConfig.home)}
        className={styles.brandHome}
        aria-label={t('app.virgoDesignProHome')}
      >
        {t('app.virgoDesign')}
      </Link>
      <Tag size="md" intent="brand" variant="soft" className={styles.proBadge}>
        {t('app.pro')}
      </Tag>
    </div>
  );
}

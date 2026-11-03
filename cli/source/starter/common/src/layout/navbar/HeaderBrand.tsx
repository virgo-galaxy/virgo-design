import { Layout, type LayoutSidebarDisplayState, Tag, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@/app/Link';
import { useNavigate } from '@/app/navigation';
import { workplacePath } from '@/app/paths';
import * as classes from '@/styles/classes';

export function HeaderBrand({
  scale,
  sidebarState,
}: {
  scale: 'regular' | 'large';
  sidebarState: LayoutSidebarDisplayState;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className={classes.brand} data-scale={scale}>
      <Tooltip open={sidebarState === 'hidden' && tooltipOpen} onOpenChange={setTooltipOpen}>
        <Tooltip.Trigger
          render={(props) => (
            <Layout.SidebarTrigger
              {...props}
              action="expand"
              className={classes.brandTrigger}
              aria-label={
                sidebarState === 'hidden' ? t('app.restoreNavigation') : t('app.virgoDesignProHome')
              }
              onClick={(event) => {
                props.onClick?.(event);

                if (event.defaultPrevented) return;

                if (sidebarState !== 'hidden') {
                  event.preventDefault();
                  navigate(workplacePath);
                }
              }}
            >
              <img src="/virgo-design.svg" alt="" width="590" height="470" />
            </Layout.SidebarTrigger>
          )}
        />
        <Tooltip.Content>{t('app.restoreNavigation')}</Tooltip.Content>
      </Tooltip>
      <Link
        to={workplacePath}
        className={classes.brandLink}
        aria-label={t('app.virgoDesignProHome')}
      >
        {t('app.virgoDesign')}
      </Link>
      <Tag size="md" intent="brand" variant="soft" className={classes.brandTag}>
        {t('app.pro')}
      </Tag>
    </div>
  );
}

import { Breadcrumb, Layout } from '@virgo-design/ui';
import { type ReactNode, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { proRouting, routeIcons } from '@/routes';

import styles from './AppContent.module.scss';

export function AppContent({
  children,
  showBreadcrumb,
  footer,
}: {
  children: ReactNode;
  showBreadcrumb: boolean;
  footer?: ReactNode;
}) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const contentRef = useRef<HTMLElement>(null);
  const currentPage = proRouting.match(pathname);
  const currentGroup = currentPage?.group;
  const currentGroupLabel = currentGroup ? t(currentGroup.labelKey) : undefined;
  const currentPageLabel = currentPage ? t(currentPage.labelKey) : t('app.pageNotFound');
  const GroupIcon = currentGroup ? routeIcons[currentGroup.icon] : undefined;
  const PageIcon = currentPage?.icon ? routeIcons[currentPage.icon] : undefined;

  useEffect(() => {
    document.title = t('app.valueVirgoDesignPro', { v0: currentPageLabel });
  }, [currentPageLabel, t]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
    contentRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <Layout.Content
      id="pro-main"
      ref={contentRef}
      tabIndex={-1}
      scrollable
      className={styles.main!}
    >
      <div className={styles.content} data-layout={currentPage?.contentLayout}>
        {showBreadcrumb && currentPage?.breadcrumb ? (
          <div className={styles.contextBar}>
            <Breadcrumb aria-label={t('app.pageBreadcrumb')}>
              {GroupIcon && currentGroup ? (
                <Breadcrumb.Item
                  aria-current={false}
                  icon={<GroupIcon />}
                  className={styles.breadcrumbIcon!}
                >
                  <span className={styles.breadcrumbIconLabel}>{currentGroupLabel}</span>
                </Breadcrumb.Item>
              ) : null}
              {currentGroup && currentGroupLabel !== currentPageLabel ? (
                <Breadcrumb.Item aria-current={false}>{currentGroupLabel}</Breadcrumb.Item>
              ) : null}
              <Breadcrumb.Item {...(PageIcon ? { icon: <PageIcon /> } : {})}>
                {currentPageLabel}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        ) : null}
        <div className={styles.pageContent}>{children}</div>
        {footer}
      </div>
    </Layout.Content>
  );
}

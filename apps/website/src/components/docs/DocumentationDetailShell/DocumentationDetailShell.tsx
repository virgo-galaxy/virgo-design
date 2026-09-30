import { GithubIcon } from '@virgo-design/icons';
import { Button, Layout } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { VirgoMark } from '@/components/brand/VirgoBrand/VirgoMark';
import { ROUTE_PATHS } from '@/shared/routes/route-config';

import styles from './documentation-detail-shell.module.scss';

interface DocumentationDetailShellProps {
  breadcrumb: ReactNode;
  children: ReactNode;
}

const laneBoundary = {
  maxWidth: 'calc(1180px + var(--vd-spacing-64))',
  insetInline: 'var(--docs-lane-inset)',
};

/** The main column of a documentation page; an optional sidebar stays outside this shell. */
export function DocumentationDetailShell({ breadcrumb, children }: DocumentationDetailShellProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Layout className={styles.shell!} data-docs-detail-shell="">
      <Layout.Content>
        <Layout.Lane {...laneBoundary} className={`${styles.lane} ${styles.contentLane}`}>
          <div className={styles.breadcrumb}>{breadcrumb}</div>
          {children}
        </Layout.Lane>
      </Layout.Content>

      <Layout.Footer className={styles.footer!} aria-label={t('docs.detailShell.footerLabel')}>
        <Layout.Lane {...laneBoundary} className={styles.lane!}>
          <div className={styles.footerContent}>
            <Button
              className={styles.poweredBy}
              variant="outline"
              size="medium"
              leadingIcon={<VirgoMark />}
              onClick={() => navigate(ROUTE_PATHS.root)}
            >
              {t('docs.detailShell.poweredBy')}
            </Button>
            <nav aria-label={t('docs.detailShell.projectLinks')}>
              <a className={styles.projectLink} href="https://github.com/virgo-galaxy/virgo-design">
                <GithubIcon size={16} aria-hidden="true" />
                <span>GitHub</span>
              </a>
            </nav>
            <span className={styles.copyright}>© {new Date().getFullYear()} Virgo Design</span>
          </div>
        </Layout.Lane>
      </Layout.Footer>
    </Layout>
  );
}

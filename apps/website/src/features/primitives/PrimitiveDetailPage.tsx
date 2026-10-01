import { Breadcrumb, Card, Layout, Tag } from '@virgo-design/ui';
import { type ReactNode, useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useParams } from 'react-router-dom';

import { RegistryApiReference } from '@/components/docs/ApiReference';
import { DocumentationDetailShell } from '@/components/docs/DocumentationDetailShell';
import {
  DocumentationSidebar,
  DocumentationSidebarCopy,
  DocumentationSidebarGroup,
  DocumentationSidebarIndex,
  DocumentationSidebarItem,
  DocumentationSidebarSeparator,
} from '@/components/docs/DocumentationSidebar';
import { PrimitiveSpecimen } from '@/components/docs/PrimitiveSpecimen/PrimitiveSpecimen';
import { primitiveApiReference } from '@/generated/primitive-api-reference.generated';
import { useAppLocale } from '@/i18n/use-app-locale';
import { ROUTE_PATHS } from '@/shared/routes/route-config';
import { useAppearance } from '@/shared/theme/use-appearance';

import {
  getPrimitiveDoc,
  primitiveCategories,
  primitiveDocs,
  type PrimitiveSlug,
} from './primitiveDocs';
import { PrimitiveExample } from './PrimitiveExample';
import styles from './primitives-docs.module.scss';

const primitiveNavigationGroups = primitiveCategories.map((category) => ({
  category,
  docs: primitiveDocs.filter((doc) => doc.category === category),
}));

const primitiveNavigationDocs = primitiveNavigationGroups.flatMap((group) => group.docs);
const primitiveIndexBySlug = new Map(
  primitiveNavigationDocs.map((primitive, index) => [
    primitive.slug,
    String(index + 1).padStart(2, '0'),
  ]),
);

function DetailList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.detailList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export interface PrimitiveDetailPageProps {
  renderRelationships?: (primitiveSlug: PrimitiveSlug) => ReactNode;
}

export function PrimitiveDetailPage({ renderRelationships }: PrimitiveDetailPageProps) {
  const { t } = useTranslation();
  const locale = useAppLocale();
  const { slug = '' } = useParams();
  const { appearance } = useAppearance();
  const location = useLocation();
  const previousPathname = useRef(location.pathname);
  const doc = getPrimitiveDoc(slug);

  useLayoutEffect(() => {
    if (previousPathname.current === location.pathname) {
      return;
    }

    previousPathname.current = location.pathname;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  if (!doc) {
    return <Navigate replace to={ROUTE_PATHS.primitives} />;
  }

  const importStatement = `import { ${doc.exportName} } from '@virgo-design/primitives';`;

  return (
    <div className={styles.documentation} data-docs-page="primitive-detail">
      <Layout className={styles.documentationShell!} data-theme={appearance} direction="horizontal">
        <DocumentationSidebar
          label={t('docs.sidebar.primitivesLabel')}
          navigationLabel={t('docs.sidebar.primitiveNavigation')}
          activeValue={location.pathname}
        >
          {primitiveNavigationGroups.map((group, groupIndex) => {
            const groupId = `primitive-group-${groupIndex}`;

            return (
              <DocumentationSidebarGroup
                key={group.category}
                id={groupId}
                label={t(`primitives.categories.${group.category}`)}
              >
                {group.docs.map((primitive) => {
                  const path = `/primitives/${primitive.slug}`;

                  return (
                    <DocumentationSidebarItem key={primitive.slug} to={path}>
                      <DocumentationSidebarIndex>
                        {primitiveIndexBySlug.get(primitive.slug)}
                      </DocumentationSidebarIndex>
                      <DocumentationSidebarCopy>
                        <strong>{primitive.exportName}</strong>
                        <small>
                          {locale === 'zh-CN'
                            ? t(`primitives.catalogue.names.${primitive.slug}`)
                            : t('primitives.catalogue.headless')}
                        </small>
                      </DocumentationSidebarCopy>
                    </DocumentationSidebarItem>
                  );
                })}
                {groupIndex < primitiveNavigationGroups.length - 1 ? (
                  <DocumentationSidebarSeparator />
                ) : null}
              </DocumentationSidebarGroup>
            );
          })}
        </DocumentationSidebar>

        <DocumentationDetailShell
          breadcrumb={
            <Breadcrumb>
              <Breadcrumb.Item aria-current={false}>
                {t('app.navigation.primitives')}
              </Breadcrumb.Item>
              <Breadcrumb.Item>{doc.exportName}</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <article className={styles.detailPage}>
            <div className={styles.detailInner}>
              <header className={styles.detailHero}>
                <div className={styles.detailKicker}>
                  <p className={styles.eyebrow}>@virgo-design/primitives</p>
                  <Tag size="sm" variant="outline">
                    {t(`primitives.categories.${doc.category}`)}
                  </Tag>
                </div>
                <h1>{doc.exportName}</h1>
                <p>{t(doc.description)}</p>
              </header>

              <div className={styles.detailGrid}>
                <div className={styles.detailMain}>
                  <PrimitiveSpecimen>
                    <PrimitiveExample slug={doc.slug as PrimitiveSlug} />
                  </PrimitiveSpecimen>

                  <Card variant="outlined" className={styles.detailCard}>
                    <Card.Header>
                      <Card.Title as="h2">{t('primitives.detail.package')}</Card.Title>
                      <Card.Description>
                        {t('primitives.detail.importDescription')}
                      </Card.Description>
                    </Card.Header>
                    <Card.Body>
                      <pre className={styles.importBlock}>
                        <code>{importStatement}</code>
                      </pre>
                    </Card.Body>
                  </Card>

                  <Card variant="outlined" className={styles.detailCard}>
                    <Card.Header>
                      <Card.Title as="h2">{t('primitives.detail.anatomy')}</Card.Title>
                      <Card.Description>
                        {t('primitives.detail.anatomyDescription')}
                      </Card.Description>
                    </Card.Header>
                    <Card.Body>
                      {doc.parts.length > 0 ? (
                        <ul
                          className={styles.partList}
                          aria-label={t('primitives.detail.parts', { name: doc.exportName })}
                        >
                          {doc.parts.map((part) => (
                            <li key={part}>
                              <code>{part}</code>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className={styles.partNote}>{doc.partNote ? t(doc.partNote) : null}</p>
                      )}
                    </Card.Body>
                  </Card>

                  <Card variant="outlined" className={styles.detailCard}>
                    <Card.Header>
                      <Card.Title as="h2">{t('primitives.detail.behavior')}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <DetailList items={doc.behaviors.map((key) => t(key))} />
                    </Card.Body>
                  </Card>

                  <Card variant="outlined" className={styles.detailCard}>
                    <Card.Header>
                      <Card.Title as="h2">{t('primitives.detail.accessibility')}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <DetailList items={doc.accessibility.map((key) => t(key))} />
                    </Card.Body>
                  </Card>
                </div>

                <aside className={styles.apiPanel} aria-labelledby="public-api-heading">
                  <Card variant="outlined" size="sm">
                    <Card.Header>
                      <Card.Title as="h2" id="public-api-heading">
                        {t('primitives.detail.publicApi')}
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <ul>
                        {doc.publicApi.map((entry) => (
                          <li key={entry}>
                            <code>{entry}</code>
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </aside>
              </div>

              <RegistryApiReference
                registry={primitiveApiReference}
                slug={doc.slug}
                id="primitive-api"
                title={t('primitives.detail.typescriptApi')}
                className={styles.fullApi}
              />

              {renderRelationships?.(doc.slug as PrimitiveSlug)}
            </div>
          </article>
        </DocumentationDetailShell>
      </Layout>
    </div>
  );
}

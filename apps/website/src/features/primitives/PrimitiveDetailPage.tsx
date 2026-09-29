import { ChevronLeftIcon } from '@virgo-design/icons';
import { Breadcrumb, Card, Layout, NavigationMenu, Tag } from '@virgo-design/ui';
import { type ReactNode, useLayoutEffect, useRef } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';

import { RegistryApiReference } from '@/components/docs/ApiReference';
import { DocumentationDetailShell } from '@/components/docs/DocumentationDetailShell/DocumentationDetailShell';
import { PrimitiveSpecimen } from '@/components/docs/PrimitiveSpecimen/PrimitiveSpecimen';
import { primitiveApiReference } from '@/generated/api-reference.generated';
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
        <Layout.Sidebar
          className={styles.primitiveNavigation}
          aria-label="Primitives sidebar"
          collapsible
          collapsedWidth={12}
          triggerPlacement="edge"
          trigger={
            <Layout.SidebarTrigger className={styles.primitiveNavigationTrigger}>
              <ChevronLeftIcon aria-hidden="true" />
            </Layout.SidebarTrigger>
          }
          width="var(--primitives-navigation-width)"
          surface={{ border: 'none' }}
        >
          {({ collapsed }) => (
            <NavigationMenu.Root
              aria-label="Primitive navigation"
              aria-hidden={collapsed || undefined}
              inert={collapsed || undefined}
              orientation="vertical"
              value={location.pathname}
            >
              <NavigationMenu.List className={styles.primitiveGroups}>
                {primitiveNavigationGroups.map((group, groupIndex) => {
                  const groupId = `primitive-group-${groupIndex}`;

                  return (
                    <NavigationMenu.Group
                      key={group.category}
                      className={styles.primitiveGroup}
                      aria-labelledby={groupId}
                    >
                      <NavigationMenu.GroupLabel
                        id={groupId}
                        className={styles.primitiveGroupLabel}
                      >
                        {group.category}
                      </NavigationMenu.GroupLabel>
                      <NavigationMenu.List className={styles.primitiveLinkList}>
                        {group.docs.map((primitive) => {
                          const path = `/primitives/${primitive.slug}`;

                          return (
                            <NavigationMenu.Item key={primitive.slug} value={path}>
                              <NavigationMenu.Link
                                className={styles.primitiveLink}
                                render={(props) => <Link {...props} to={path} />}
                              >
                                <span className={styles.primitiveNumber}>
                                  {primitiveIndexBySlug.get(primitive.slug)}
                                </span>
                                <span>
                                  <strong>{primitive.exportName}</strong>
                                  <small>Headless</small>
                                </span>
                              </NavigationMenu.Link>
                            </NavigationMenu.Item>
                          );
                        })}
                        {groupIndex < primitiveNavigationGroups.length - 1 ? (
                          <NavigationMenu.Separator className={styles.primitiveGroupSeparator} />
                        ) : null}
                      </NavigationMenu.List>
                    </NavigationMenu.Group>
                  );
                })}
              </NavigationMenu.List>
            </NavigationMenu.Root>
          )}
        </Layout.Sidebar>

        <DocumentationDetailShell
          breadcrumb={
            <Breadcrumb>
              <Breadcrumb.Item aria-current={false}>Primitives</Breadcrumb.Item>
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
                    {doc.category}
                  </Tag>
                </div>
                <h1>{doc.exportName}</h1>
                <p>{doc.description}</p>
              </header>

              <div className={styles.detailGrid}>
                <main className={styles.detailMain}>
                  <PrimitiveSpecimen>
                    <PrimitiveExample slug={doc.slug as PrimitiveSlug} />
                  </PrimitiveSpecimen>

                  <Card variant="outlined" className={styles.detailCard}>
                    <Card.Header>
                      <Card.Title as="h2">Package</Card.Title>
                      <Card.Description>
                        Import the public primitive directly from the package entry point.
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
                      <Card.Title as="h2">Anatomy</Card.Title>
                      <Card.Description>
                        The public parts that compose this primitive.
                      </Card.Description>
                    </Card.Header>
                    <Card.Body>
                      {doc.parts.length > 0 ? (
                        <ul className={styles.partList} aria-label={`${doc.exportName} parts`}>
                          {doc.parts.map((part) => (
                            <li key={part}>
                              <code>{part}</code>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className={styles.partNote}>{doc.partNote}</p>
                      )}
                    </Card.Body>
                  </Card>

                  <Card variant="outlined" className={styles.detailCard}>
                    <Card.Header>
                      <Card.Title as="h2">Behavior</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <DetailList items={doc.behaviors} />
                    </Card.Body>
                  </Card>

                  <Card variant="outlined" className={styles.detailCard}>
                    <Card.Header>
                      <Card.Title as="h2">Accessibility</Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <DetailList items={doc.accessibility} />
                    </Card.Body>
                  </Card>
                </main>

                <aside className={styles.apiPanel} aria-labelledby="public-api-heading">
                  <h2 id="public-api-heading">Public API</h2>
                  <ul>
                    {doc.publicApi.map((entry) => (
                      <li key={entry}>
                        <code>{entry}</code>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>

              <RegistryApiReference
                registry={primitiveApiReference}
                slug={doc.slug}
                id="primitive-api"
                title="TypeScript API"
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

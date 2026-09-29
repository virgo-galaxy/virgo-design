import { Card, Tag } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

import { RegistryApiReference } from '@/components/docs/ApiReference';
import { PrimitiveSpecimen } from '@/components/docs/PrimitiveSpecimen/PrimitiveSpecimen';
import { primitiveApiReference } from '@/generated/api-reference.generated';
import { ROUTE_PATHS } from '@/shared/routes/route-config';

import { getPrimitiveDoc, type PrimitiveSlug } from './primitiveDocs';
import { PrimitiveExample } from './PrimitiveExample';
import styles from './primitives-docs.module.scss';

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
  const doc = getPrimitiveDoc(slug);

  if (!doc) {
    return <Navigate replace to={ROUTE_PATHS.primitives} />;
  }

  const importStatement = `import { ${doc.exportName} } from '@virgo-design/primitives';`;

  return (
    <article className={styles.page} data-docs-page="primitive-detail">
      <div className={`${styles.inner} ${styles.detailInner}`}>
        <Link className={styles.backLink} to={ROUTE_PATHS.primitives}>
          ← All primitives
        </Link>

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
                <Card.Description>The public parts that compose this primitive.</Card.Description>
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
  );
}

import { Card, Tag } from '@virgo-design/ui';
import { Link } from 'react-router-dom';

import { primitiveCategories, primitiveDocs } from './primitiveDocs';
import styles from './primitives-docs.module.scss';

export function PrimitiveCataloguePage() {
  return (
    <section className={styles.page} data-docs-page="primitives-catalogue">
      <div className={styles.inner}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>@virgo-design/primitives</p>
          <h1>Primitives</h1>
          <p>
            Headless building blocks for building custom interfaces with Virgo Design behavior,
            accessibility and interaction protocols.
          </p>
        </header>

        <div className={styles.catalogue}>
          {primitiveCategories.map((category) => {
            const docs = primitiveDocs.filter((doc) => doc.category === category);

            return (
              <section className={styles.category} key={category} aria-labelledby={category}>
                <header className={styles.categoryHeader}>
                  <h2 id={category}>{category}</h2>
                  <span>{docs.length.toString().padStart(2, '0')}</span>
                </header>

                <div className={styles.cardGrid}>
                  {docs.map((doc) => (
                    <Link className={styles.cardLink} key={doc.slug} to={`/primitives/${doc.slug}`}>
                      <Card variant="outlined" className={styles.card}>
                        <Card.Header className={styles.cardHeader}>
                          <Card.Title as="h3">{doc.exportName}</Card.Title>
                          <Tag size="sm" variant="outline">
                            Headless
                          </Tag>
                        </Card.Header>
                        <Card.Body>
                          <Card.Description>{doc.description}</Card.Description>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

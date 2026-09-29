import { Card, Tag } from '@virgo-design/ui';
import { componentMetadataRegistry } from '@virgo-design/ui/metadata';
import { Link } from 'react-router-dom';

import { componentGroups, componentRoutes } from './app/componentRoutes';
import styles from './components-catalogue.module.scss';

const metadataByName = new Map(
  Object.values(componentMetadataRegistry).map((metadata) => [
    metadata.name.replaceAll(' ', '').toLowerCase(),
    metadata,
  ]),
);

export function ComponentsCataloguePage() {
  return (
    <section className={styles.page} data-docs-page="components-catalogue">
      <div className={styles.inner}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>@virgo-design/ui</p>
          <h1>Components</h1>
          <p>
            Production-ready interface components built from Virgo Design primitives, tokens and
            interaction patterns.
          </p>
        </header>

        <div className={styles.catalogue}>
          {componentGroups.map((group) => {
            const routes = componentRoutes.filter((route) => route.group === group.id);

            return (
              <section className={styles.category} key={group.id} aria-labelledby={group.id}>
                <header className={styles.categoryHeader}>
                  <h2 id={group.id}>{group.label}</h2>
                  <span>{routes.length.toString().padStart(2, '0')}</span>
                </header>

                <div className={styles.cardGrid}>
                  {routes.map((route) => {
                    const metadata = metadataByName.get(
                      route.name.replaceAll(' ', '').toLowerCase(),
                    );

                    return (
                      <Link className={styles.cardLink} key={route.id} to={route.path}>
                        <Card variant="outlined" className={styles.card}>
                          <Card.Header className={styles.cardHeader}>
                            <Card.Title as="h3">{route.name}</Card.Title>
                            <Tag size="sm" variant="outline">
                              {route.version.replace(/^V/, '')}
                            </Tag>
                          </Card.Header>
                          <Card.Body>
                            <Card.Description>
                              {metadata?.description ?? route.category}
                            </Card.Description>
                          </Card.Body>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}

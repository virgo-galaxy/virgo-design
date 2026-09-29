import { Card } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './documentation-catalogue.module.scss';

interface DocumentationCatalogueRootProps {
  children: ReactNode;
  description: ReactNode;
  eyebrow: ReactNode;
  pageId: string;
  title: ReactNode;
}

export function DocumentationCatalogue({
  children,
  description,
  eyebrow,
  pageId,
  title,
}: DocumentationCatalogueRootProps) {
  return (
    <section className={styles.page} data-docs-page={pageId}>
      <div className={styles.inner}>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>

        <div className={styles.catalogue}>{children}</div>
      </div>
    </section>
  );
}

interface DocumentationCatalogueGroupProps {
  children: ReactNode;
  count: number;
  id: string;
  label: ReactNode;
}

export function DocumentationCatalogueGroup({
  children,
  count,
  id,
  label,
}: DocumentationCatalogueGroupProps) {
  return (
    <section className={styles.category} aria-labelledby={id}>
      <header className={styles.categoryHeader}>
        <h2 id={id}>{label}</h2>
        <span>{count.toString().padStart(2, '0')}</span>
      </header>

      <div className={styles.cardGrid}>{children}</div>
    </section>
  );
}

interface DocumentationCatalogueItemProps {
  accessory?: ReactNode;
  children: ReactNode;
  title: ReactNode;
  to: string;
}

export function DocumentationCatalogueItem({
  accessory,
  children,
  title,
  to,
}: DocumentationCatalogueItemProps) {
  return (
    <Link className={styles.cardLink} to={to}>
      <Card variant="outlined" className={styles.card}>
        <Card.Header className={styles.cardHeader}>
          <Card.Title as="h3">{title}</Card.Title>
          {accessory}
        </Card.Header>
        <Card.Body>
          <Card.Description>{children}</Card.Description>
        </Card.Body>
      </Card>
    </Link>
  );
}

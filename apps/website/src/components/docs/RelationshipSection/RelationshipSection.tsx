import { Card } from '@virgo-design/ui';
import { Link } from 'react-router-dom';

import styles from './relationship-section.module.scss';

export interface RelationshipItem {
  href: string;
  label: string;
}

export interface RelationshipSectionProps {
  items: readonly RelationshipItem[];
  title: 'Built with' | 'Used by';
}

export function RelationshipSection({ items, title }: RelationshipSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} data-docs-relationships="">
      <header className={styles.header}>
        <h2>Relationships</h2>
        <h3>{title}</h3>
      </header>

      <div className={styles.links}>
        {items.map((item) => (
          <Link className={styles.link} key={item.href} to={item.href}>
            <Card variant="outlined" size="sm" className={styles.card}>
              <Card.Body className={styles.cardBody}>
                <span>{item.label}</span>
                <span aria-hidden="true">→</span>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

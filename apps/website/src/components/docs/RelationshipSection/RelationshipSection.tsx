import { ChevronRightIcon } from '@virgo-design/icons';
import { Card } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import styles from './relationship-section.module.scss';

export interface RelationshipItem {
  href: string;
  label: string;
}

export interface RelationshipSectionProps {
  items: readonly RelationshipItem[];
  kind: 'builtWith' | 'usedBy';
}

export function RelationshipSection({ items, kind }: RelationshipSectionProps) {
  const { t } = useTranslation();

  if (items.length === 0) {
    return null;
  }

  const title =
    kind === 'builtWith' ? t('docs.relationships.builtWith') : t('docs.relationships.usedBy');

  return (
    <section className={styles.section} data-docs-relationships="">
      <header className={styles.header}>
        <h2>{t('docs.relationships.heading')}</h2>
        <h3>{title}</h3>
      </header>

      <div className={styles.links}>
        {items.map((item) => (
          <Link className={styles.link} key={item.href} to={item.href}>
            <Card variant="outlined" size="sm" className={styles.card}>
              <Card.Body className={styles.cardBody}>
                <span>{item.label}</span>
                <ChevronRightIcon size={16} aria-hidden="true" />
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

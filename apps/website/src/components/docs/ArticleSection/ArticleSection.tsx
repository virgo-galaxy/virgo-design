import type { ReactNode } from 'react';

import styles from './article-section.module.scss';

interface ArticleSectionProps {
  id: string;
  index: string;
  title: string;
  description: string;
  children: ReactNode;
}

/** Article structure only. The example below owns its own preview/source frame. */
export function ArticleSection({ id, index, title, description, children }: ArticleSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      className={styles.root}
      id={id}
      aria-labelledby={headingId}
      data-review-section={id}
      data-article-section
    >
      <header className={styles.header}>
        <h2 id={headingId}>
          <span className={styles.index} aria-hidden="true">
            {index}
          </span>
          {title}
        </h2>
        <p>{description}</p>
      </header>
      <div className={styles.examples}>{children}</div>
    </section>
  );
}

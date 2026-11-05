import type { ReactNode } from 'react';

import styles from './token-page.module.scss';

interface TokenPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

interface TokenSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  eyebrow?: string;
  id?: string;
}

export function TokenPage({ title, description, children }: TokenPageProps) {
  return (
    <section className={styles.page}>
      <header className={styles.pageHeader}>
        <div className={styles.eyebrow}>@virgo-design/tokens</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>
      <div className={styles.sections}>{children}</div>
    </section>
  );
}

export function TokenSection({ title, description, children, eyebrow, id }: TokenSectionProps) {
  return (
    <section id={id} className={styles.tokenSection}>
      <header className={styles.sectionHeader}>
        {eyebrow ? <div className={styles.sectionEyebrow}>{eyebrow}</div> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>

      {children}
    </section>
  );
}

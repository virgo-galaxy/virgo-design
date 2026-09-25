import type { ReactNode } from 'react';

type ReviewSectionProps = {
  id: string;
  index: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function ReviewSection({ id, index, title, description, children }: ReviewSectionProps) {
  return (
    <section className="review-section" id={id} data-review-section={id}>
      <header className="section-header">
        <div className="section-index">{index}</div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

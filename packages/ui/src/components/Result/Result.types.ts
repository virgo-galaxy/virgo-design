import type { HTMLAttributes, ReactNode } from 'react';
export type ResultStatus = 'success' | 'error' | 'warning' | 'info' | '403' | '404' | '500';
export interface ResultProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Outcome or exception status. */
  status?: ResultStatus;
  /** Custom decorative artwork replacing the status icon. */
  icon?: ReactNode;
  /** Outcome title used to name the result. */
  title?: ReactNode;
  /** Supporting explanation and recovery guidance. */
  description?: ReactNode;
  /** Heading level matching the document hierarchy. */
  headingLevel?: 1 | 2 | 3;
  /** Primary recovery or continuation action. */
  primaryAction?: ReactNode;
  /** Optional secondary navigation or recovery action. */
  secondaryAction?: ReactNode;
  /** Additional business content below the actions. */
  extra?: ReactNode;
}

export interface ResultTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading element for the composed title. */
  as?: 'h1' | 'h2' | 'h3';
}

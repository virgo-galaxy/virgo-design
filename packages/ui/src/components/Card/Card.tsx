import { createElement, forwardRef } from 'react';

import { Surface } from '../Surface';
import styles from './Card.module.scss';
import type {
  CardBodyProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
} from './Card.types';

function classes(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

const Root = forwardRef<HTMLDivElement, CardProps>(function CardRoot(
  { variant = 'default', size = 'md', className, ...props },
  ref,
) {
  const outlined = variant === 'outlined';
  const elevated = variant === 'elevated';

  return (
    <Surface
      {...props}
      ref={ref}
      className={classes(styles.root, className)}
      tone={elevated ? 'elevated' : 'default'}
      material="solid"
      elevation={elevated ? 2 : 0}
      radius={12}
      border={outlined ? 'subtle' : 'none'}
      data-variant={variant}
      data-size={size}
    />
  );
});

const Header = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.header, className)} />;
});

const Body = forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.body, className)} />;
});

const Footer = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, ...props },
  ref,
) {
  return <div {...props} ref={ref} className={classes(styles.footer, className)} />;
});

const Title = forwardRef<HTMLElement, CardTitleProps>(function CardTitle(
  { as = 'div', className, ...props },
  ref,
) {
  return createElement(as, {
    ...props,
    ref,
    className: classes(styles.title, className),
  });
});

const Description = forwardRef<HTMLParagraphElement, CardDescriptionProps>(function CardDescription(
  { className, ...props },
  ref,
) {
  return <p {...props} ref={ref} className={classes(styles.description, className)} />;
});

Root.displayName = 'Card';
Header.displayName = 'Card.Header';
Body.displayName = 'Card.Body';
Footer.displayName = 'Card.Footer';
Title.displayName = 'Card.Title';
Description.displayName = 'Card.Description';

export const Card = Object.assign(Root, {
  Root,
  Header,
  Body,
  Footer,
  Title,
  Description,
});

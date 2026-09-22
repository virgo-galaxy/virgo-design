import { Children, type ForwardedRef, forwardRef } from 'react';

import type {
  BreadcrumbCurrentItemProps,
  BreadcrumbItemProps,
  BreadcrumbLinkItemProps,
  BreadcrumbProps,
} from './Breadcrumb.types';

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  {
    children,
    separator = '/',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  forwardedRef,
) {
  const items = Children.toArray(children);
  const fallbackLabel =
    ariaLabel === undefined && ariaLabelledBy === undefined ? 'Breadcrumb' : undefined;

  return (
    <nav
      {...props}
      ref={forwardedRef}
      aria-label={ariaLabel ?? fallbackLabel}
      aria-labelledby={ariaLabelledBy}
    >
      <ol data-slot="list">
        {items.map((item, index) => (
          <li key={index} data-slot="item">
            {index > 0 ? (
              <span aria-hidden="true" data-slot="separator">
                {separator}
              </span>
            ) : null}
            {item}
          </li>
        ))}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export const BreadcrumbItem = forwardRef<HTMLAnchorElement | HTMLSpanElement, BreadcrumbItemProps>(
  function BreadcrumbItem(props, forwardedRef) {
    if (props.href !== undefined) {
      const { children, href, ...linkProps } = props as BreadcrumbLinkItemProps;

      return (
        <a
          {...linkProps}
          ref={forwardedRef as ForwardedRef<HTMLAnchorElement>}
          href={href}
          data-link="true"
        >
          {children}
        </a>
      );
    }

    const {
      children,
      'aria-current': ariaCurrent,
      ...currentProps
    } = props as BreadcrumbCurrentItemProps;

    return (
      <span
        {...currentProps}
        ref={forwardedRef as ForwardedRef<HTMLSpanElement>}
        aria-current={ariaCurrent ?? 'page'}
        data-current="true"
      >
        {children}
      </span>
    );
  },
);

BreadcrumbItem.displayName = 'Breadcrumb.Item';

import NextLink from 'next/link';
import type { ComponentProps } from 'react';

export function Link({
  to,
  onClick,
  onMouseEnter,
  onTouchStart,
  ...props
}: ComponentProps<'a'> & { to: string }) {
  return (
    <NextLink
      {...props}
      {...(onClick ? { onClick } : {})}
      {...(onMouseEnter ? { onMouseEnter } : {})}
      {...(onTouchStart ? { onTouchStart } : {})}
      href={to}
    />
  );
}

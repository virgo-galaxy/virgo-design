'use client';

import NextLink from 'next/link';
import type { ComponentProps } from 'react';

import { useAppNavigation } from './use-app-navigation';

type NativeLinkProps = ComponentProps<typeof NextLink>;

type AppLinkProps = { [Key in keyof NativeLinkProps]: NativeLinkProps[Key] | undefined } & {
  href: NativeLinkProps['href'];
};

export function AppLink({ href, onNavigate, ...props }: AppLinkProps) {
  const navigate = useAppNavigation();
  const definedProps = Object.fromEntries(
    Object.entries(props).filter(([, value]) => value !== undefined),
  ) as Omit<NativeLinkProps, 'href' | 'onNavigate'>;
  return (
    <NextLink
      {...definedProps}
      href={href}
      onNavigate={(event) => {
        let cancelled = false;
        onNavigate?.({
          preventDefault: () => {
            cancelled = true;
            event.preventDefault();
          },
        });
        if (cancelled || typeof href !== 'string') return;
        event.preventDefault();
        navigate(href, { replace: props.replace ?? false, scroll: props.scroll ?? false });
      }}
    />
  );
}

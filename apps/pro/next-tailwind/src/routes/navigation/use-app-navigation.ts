'use client';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useNavigationContext } from './context';

export function useAppNavigation() {
  const router = useRouter();
  const { request } = useNavigationContext();
  return useCallback(
    (href: string, options?: { replace?: boolean; scroll?: boolean }) => {
      request(href, () => {
        if (options?.replace) router.replace(href, { scroll: options.scroll ?? false });
        else router.push(href, { scroll: options?.scroll ?? false });
      });
    },
    [router, request],
  );
}

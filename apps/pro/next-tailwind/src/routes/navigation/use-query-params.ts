'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

import { useAppNavigation } from './use-app-navigation';

type QueryValue = URLSearchParams | Record<string, string>;
export function useQueryParams() {
  const pathname = usePathname();
  const nativeParams = useSearchParams();
  const serialized = nativeParams.toString();
  const params = useMemo(() => new URLSearchParams(serialized), [serialized]);
  const navigate = useAppNavigation();
  const update = useCallback(
    (
      next: QueryValue | ((previous: URLSearchParams) => QueryValue),
      options?: { replace?: boolean },
    ) => {
      const result = new URLSearchParams(
        typeof next === 'function' ? next(new URLSearchParams(serialized)) : next,
      );
      navigate(pathname + (result.size ? '?' + result.toString() : ''), {
        replace: options?.replace ?? false,
      });
    },
    [navigate, pathname, serialized],
  );
  return [params, update] as const;
}

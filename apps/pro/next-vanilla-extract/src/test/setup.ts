import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

import { i18nInstance } from '@/i18n';
import { initializeAppLocale } from '@/i18n/bootstrap';
import { disposePreferences } from '@/preferences';

await initializeAppLocale();

beforeEach(async () => {
  if (typeof window !== 'undefined') await i18nInstance.changeLanguage('en-US');
});

afterEach(() => {
  cleanup();
  disposePreferences();
});

vi.mock('next/navigation', async () => {
  const router = await import('react-router');
  return {
    usePathname: () => router.useLocation().pathname,
    useParams: router.useParams,
    useSearchParams: () => router.useSearchParams()[0],
  };
});
vi.mock('@/routes/navigation', async () => {
  const router = await import('react-router');
  const React = await import('react');
  return {
    AppLink: ({ href, ...props }: { href: string }) =>
      React.createElement(router.Link, { ...props, to: href }),
    useAppNavigation: router.useNavigate,
    useQueryParams: router.useSearchParams,
    useNavigationBlocker: router.useBlocker,
    RouteRedirect: router.Navigate,
  };
});

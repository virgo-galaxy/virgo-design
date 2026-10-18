import { RouterProvider, type RouterProviderProps } from 'react-router';

import { LocaleProvider } from '@/i18n/react';

export function App({ router }: { router: RouterProviderProps['router'] }) {
  return (
    <LocaleProvider>
      <RouterProvider router={router} />
    </LocaleProvider>
  );
}

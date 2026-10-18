import { RouterProvider } from 'react-router';

import { LocaleProvider } from '@/i18n/react';

import { router } from './bootstrap/initialize';

export function App() {
  return (
    <LocaleProvider>
      <RouterProvider router={router} />
    </LocaleProvider>
  );
}

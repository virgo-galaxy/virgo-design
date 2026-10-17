import { BrowserRouter, useLocation } from 'react-router-dom';

import { AppRouter } from '@/app/routes/AppRouter';
import { LocaleProvider } from '@/i18n/react';
import { AppLayout } from '@/layout/AppLayout';

function RoutedApp() {
  const { pathname } = useLocation();
  const standaloneExample = pathname.startsWith('/examples/');

  return standaloneExample ? (
    <AppRouter />
  ) : (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
}

export function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <RoutedApp />
      </BrowserRouter>
    </LocaleProvider>
  );
}

import { LocaleProvider } from '@/i18n/react';

import { AppBootstrap } from '../bootstrap/AppBootstrap';
import { RouterApp } from '../router/RouterApp';

export function App() {
  return (
    <LocaleProvider>
      <AppBootstrap>
        <RouterApp />
      </AppBootstrap>
    </LocaleProvider>
  );
}

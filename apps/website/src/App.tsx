import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '@/app/routes/AppRouter';
import { AppLayout } from '@/layout/AppLayout';

export function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </BrowserRouter>
  );
}

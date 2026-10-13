import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';

import { createAppRouter } from '@/app/router';
import { RouteLoading } from '@/app/RouteViews';
export function App() {
  const [router, setRouter] = useState<ReturnType<typeof createAppRouter> | null>(null);
  useEffect(() => {
    const next = createAppRouter();
    setRouter(next);
    return () => next.dispose();
  }, []);
  return router ? <RouterProvider router={router} /> : <RouteLoading />;
}

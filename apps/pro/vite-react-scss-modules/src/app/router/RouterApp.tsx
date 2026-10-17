import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';

import { createAppRouter } from './router';
import { RouteLoading } from './RouteViews';

export function RouterApp() {
  const [router, setRouter] = useState<ReturnType<typeof createAppRouter> | null>(null);

  useEffect(() => {
    const next = createAppRouter();
    setRouter(next);

    return () => next.dispose();
  }, []);

  return router ? <RouterProvider router={router} /> : <RouteLoading />;
}

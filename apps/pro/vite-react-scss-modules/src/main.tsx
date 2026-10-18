import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app';
import { createAppRouter } from '@/routes/router';

if (import.meta.env.VITE_API_MOCKING === 'true') {
  const { startMocking } = await import('@/mock');

  await startMocking();
}

const router = createAppRouter();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App router={router} />
  </StrictMode>,
);

import.meta.hot?.dispose(() => router.dispose());

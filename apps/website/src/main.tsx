import './i18n';
import './styles.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppearanceProvider } from '@/app/theme/AppearanceProvider';

import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppearanceProvider>
      <App />
    </AppearanceProvider>
  </StrictMode>,
);

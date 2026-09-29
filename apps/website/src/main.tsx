import '@virgo-design/fonts/default.css';
import '@virgo-design/tokens/styles.css';
import './styles.scss';
import '@/i18n/runtime';

import { fontFamily } from '@virgo-design/tokens';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppearanceProvider } from '@/app/theme/AppearanceProvider';

import { App } from './App';

document.documentElement.style.setProperty('--app-font-family-mono', fontFamily.mono);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppearanceProvider>
      <App />
    </AppearanceProvider>
  </StrictMode>,
);

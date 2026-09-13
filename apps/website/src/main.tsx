import '@virgo-design/fonts/default.css';
import './i18n';
import './styles.scss';

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

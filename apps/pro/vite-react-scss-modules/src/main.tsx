import '@virgo-design/fonts/sans/inter.css';
import '@virgo-design/fonts/mono/jetbrains-mono.css';
import '@virgo-design/tokens/styles.css';
import './styles/global.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

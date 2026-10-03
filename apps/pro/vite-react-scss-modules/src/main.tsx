import '@virgo-design/fonts/sans/inter.css';
import '@virgo-design/fonts/sans/noto-sans-sc.css';
import '@virgo-design/fonts/mono/jetbrains-mono.css';
import '@virgo-design/tokens/styles.css';
import './styles/global.scss';
import './i18n/runtime';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';
import { ProControlLabels } from '@/app/ProControlLabels';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProControlLabels>
      <App />
    </ProControlLabels>
  </StrictMode>,
);

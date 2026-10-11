import '@virgo-design/fonts/sans/inter.css';
import '@virgo-design/fonts/sans/noto-sans-sc.css';
import '@virgo-design/fonts/mono/jetbrains-mono.css';
import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css';
import './styles/global.scss';
import './i18n/runtime';

import { initializeTheme } from '@virgo-design/themes';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';
import { ProControlLabels } from '@/app/ProControlLabels';
import { AppBootstrap } from '@/application/AppBootstrap';

initializeTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProControlLabels>
      <AppBootstrap>
        <App />
      </AppBootstrap>
    </ProControlLabels>
  </StrictMode>,
);

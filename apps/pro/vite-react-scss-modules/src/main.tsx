import '@virgo-design/fonts/sans/inter.css';
import '@virgo-design/fonts/sans/noto-sans-sc.css';
import '@virgo-design/fonts/mono/jetbrains-mono.css';
import '@virgo-design/tokens/styles.css';
import '@virgo-design/themes/styles.css';
import './styles/global.scss';
import './app/composition/i18n/initialize';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';
import { AppBootstrap } from '@/app/AppBootstrap';
import { ProControlLabels } from '@/app/ProControlLabels';
import { initializeProTheme } from '@/features/settings';

initializeProTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProControlLabels>
      <AppBootstrap>
        <App />
      </AppBootstrap>
    </ProControlLabels>
  </StrictMode>,
);

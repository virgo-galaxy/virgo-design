import '@/styles/global.css';

import { getInitialThemeScript } from '@virgo-design/themes';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import defaults from '@/config/settings.json';
import { navigationBootstrapScript } from '@/routes/navigation/bootstrap';

import { AppProviders } from './_components/AppProviders';

export const metadata: Metadata = {
  title: 'Virgo Design Pro',
  icons: { icon: '/favicon.ico' },
};

const themeScript = getInitialThemeScript({
  defaultTheme: defaults.theme,
  defaultAppearance: defaults.appearance as 'light' | 'dark' | 'system',
  storage: {
    key: 'virgo-pro:settings',
    themeField: 'theme',
    appearanceField: 'appearance',
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <script
          data-virgo-navigation
          dangerouslySetInnerHTML={{ __html: navigationBootstrapScript }}
        />
        <script data-virgo-bootstrap dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

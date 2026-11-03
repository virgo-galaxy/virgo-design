import '@/styles/global.css';

import { getInitialThemeScript } from '@virgo-design/themes';
import type { ReactNode } from 'react';

import { appearanceStorageKey } from '@/preferences/appearance';

import { StarterLayout } from './starter-layout';

export const metadata = { title: 'Virgo Starter', icons: '/favicon.ico' };

const themeScript = getInitialThemeScript({
  defaultAppearance: 'system',
  appearanceStorageKey,
  respectServerAttributes: true,
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US" data-virgo-theme="virgo" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <StarterLayout>{children}</StarterLayout>
      </body>
    </html>
  );
}

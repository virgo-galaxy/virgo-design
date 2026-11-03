import '../styles.css';

import type { ReactNode } from 'react';

export const metadata = {
  title: 'Hello Virgo',
  icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-virgo-theme="virgo" data-theme="light">
      <body>{children}</body>
    </html>
  );
}

'use client';

import { type ReactNode, useEffect } from 'react';

import { initializeLocale, restoreLocale } from '@/i18n/locale';
import { AppShell } from '@/layout/AppShell';

void initializeLocale('en-US');

export function StarterLayout({ children }: { children: ReactNode }) {
  useEffect(restoreLocale, []);

  return <AppShell>{children}</AppShell>;
}

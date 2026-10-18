import type { ReactNode } from 'react';

import { LanguageControl } from '@/components/language-control';

import { AppearanceControl } from './appearance-control/AppearanceControl';
import { ThemeStyleControl } from './theme-style-control/ThemeStyleControl';

export function HeaderActions({
  theme,
  onAppearanceChange,
  children,
}: {
  theme: 'light' | 'dark';
  onAppearanceChange: (appearance: 'light' | 'dark') => void;
  children?: ReactNode;
}) {
  return (
    <>
      <LanguageControl />
      <AppearanceControl appearance={theme} onAppearanceChange={onAppearanceChange} />
      <ThemeStyleControl />
      {children}
    </>
  );
}

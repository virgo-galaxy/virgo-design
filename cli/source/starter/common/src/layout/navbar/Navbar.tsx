import { Layout, type LayoutSidebarDisplayState, Toolbar } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import type { AppearanceMode } from '@/preferences/appearance';
import * as classes from '@/styles/classes';

import { AppearanceControl } from './AppearanceControl';
import { HeaderBrand } from './HeaderBrand';
import { LanguageControl } from './LanguageControl';

export function Navbar({
  narrow,
  sidebarState,
  appearance,
  appearanceMode,
  onAppearanceChange,
}: {
  narrow: boolean;
  sidebarState: LayoutSidebarDisplayState;
  appearance: 'light' | 'dark';
  appearanceMode: AppearanceMode;
  onAppearanceChange: (mode: AppearanceMode) => void;
}) {
  const { t } = useTranslation();

  return (
    <Layout.Header
      className={classes.navbar}
      height={64}
      gap={narrow ? 'var(--vd-spacing-12)' : 'var(--vd-spacing-24)'}
      paddingInline={narrow ? 'var(--vd-spacing-12)' : 'var(--vd-spacing-24)'}
      surface={{ tone: 'default', material: 'glass', border: 'none' }}
      logo={<HeaderBrand scale="regular" sidebarState={sidebarState} />}
      actions={
        <Toolbar layout="custom" aria-label={t('app.globalActions')} className={classes.toolbar}>
          <LanguageControl />
          <AppearanceControl
            appearance={appearance}
            mode={appearanceMode}
            onChange={onAppearanceChange}
          />
        </Toolbar>
      }
    />
  );
}

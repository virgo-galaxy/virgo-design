import { Layout, type LayoutSidebarDisplayState, Separator, Toolbar } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { type AppPreferences, getFixedHeaderMaterial } from '@/preferences';

import { HeaderActions } from './actions/HeaderActions';
import { HeaderBrand } from './brand/HeaderBrand';
import { HeaderSearch } from './search/HeaderSearch';

export function Navbar({
  preferences,
  updatePreferences,
  theme,
  narrow,
  sidebarState,
  onSidebarWidthChange,
  actions,
  accountMenu,
  settingsTrigger,
}: {
  preferences: AppPreferences;
  updatePreferences: (patch: Partial<AppPreferences>) => void;
  theme: 'light' | 'dark';
  narrow: boolean;
  sidebarState: LayoutSidebarDisplayState;
  onSidebarWidthChange: (width: number) => void;
  actions?: ReactNode;
  accountMenu?: ReactNode;
  settingsTrigger?: ReactNode;
}) {
  const { t } = useTranslation();
  const scale = preferences.headerHeight > 64 ? 'large' : 'regular';
  const headerMaterial = getFixedHeaderMaterial(preferences.theme) ?? preferences.headerMaterial;

  return (
    <Layout.Header
      className={[
        'pro-navbar-header absolute [inset-block-start:0] [inset-inline:0] flex-none',
        '[border-bottom:var(--vd-stroke-width,_var(--vd-border-width-1))_solid_var(--vd-border-subtle)] [z-index:4]',
        '[&[hidden]]:hidden',
        'data-[scale=large]:[--pro-search-width:310px]',
        'viewport-max-640:px-12 viewport-max-640:gap-12',
      ].join(' ')}
      data-scale={scale}
      hidden={!preferences.showHeader}
      height={preferences.headerHeight}
      gap={narrow ? 'var(--vd-spacing-12)' : 'var(--vd-spacing-24)'}
      paddingInline={narrow ? 'var(--vd-spacing-12)' : 'var(--vd-spacing-24)'}
      surface={{ tone: 'default', material: headerMaterial, border: 'none' }}
      logo={
        <HeaderBrand
          scale={scale}
          sidebarState={sidebarState}
          onSidebarWidthChange={onSidebarWidthChange}
        />
      }
      actions={
        <Toolbar
          layout="custom"
          aria-label={t('app.globalActions')}
          className="flex items-center gap-8 viewport-max-640:gap-4"
        >
          <HeaderActions
            theme={theme}
            onAppearanceChange={(appearance) => updatePreferences({ appearance })}
          >
            {actions}
            {settingsTrigger}
          </HeaderActions>
          {accountMenu ? (
            <>
              <Separator
                orientation="vertical"
                decorative
                className="[.pro-navbar-header[data-scale='large']_&]:[height:var(--vd-sizing-32)] data-[orientation=vertical]:self-center data-[orientation=vertical]:[height:var(--vd-sizing-24)]"
              />
              {accountMenu}
            </>
          ) : null}
        </Toolbar>
      }
    >
      <HeaderSearch />
    </Layout.Header>
  );
}

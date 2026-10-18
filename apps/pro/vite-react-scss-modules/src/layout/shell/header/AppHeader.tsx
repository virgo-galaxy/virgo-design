import { Layout, type LayoutSidebarDisplayState, Separator, Toolbar } from '@virgo-design/ui';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { type AppPreferences, getFixedHeaderMaterial } from '@/preferences';

import { HeaderActions } from './actions/HeaderActions';
import { HeaderBrand } from './brand/HeaderBrand';
import { HeaderSearch } from './search/HeaderSearch';

import styles from './AppHeader.module.scss';

export function AppHeader({
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
      className={styles.header!}
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
        <Toolbar layout="custom" aria-label={t('app.globalActions')} className={styles.actions}>
          <HeaderActions
            theme={theme}
            onAppearanceChange={(appearance) => updatePreferences({ appearance })}
          >
            {actions}
            {settingsTrigger}
          </HeaderActions>
          {accountMenu ? (
            <>
              <Separator orientation="vertical" decorative className={styles.actionDivider} />
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

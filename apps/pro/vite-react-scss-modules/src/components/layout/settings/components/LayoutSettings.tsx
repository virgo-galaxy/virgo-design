import { SegmentedControl, Separator, Slider } from '@virgo-design/ui';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';

import {
  type AppPreferences,
  getFixedHeaderMaterial,
  headerHeightRange,
  sidebarWidthRanges,
} from '@/preferences';

import { PixelInput, SettingToggle } from './SettingsFields';

import styles from './SettingsDrawer.module.scss';

export function LayoutSettings({
  settings,
  onChange,
  onHeaderChange,
}: {
  settings: AppPreferences;
  onChange: (patch: Partial<AppPreferences>) => void;
  onHeaderChange: (showHeader: boolean, anchorY: number) => void;
}) {
  const { t } = useTranslation();
  const id = useId();
  const fixedHeaderMaterial = getFixedHeaderMaterial(settings.theme);
  const rail = settings.sidebarMode === 'collapsed';
  const widthRange = sidebarWidthRanges[settings.sidebarMode];
  const widthLabel = rail ? t('settings.railWidth') : t('settings.expandedWidth');
  const sidebarWidth = rail ? settings.sidebarRailWidth : settings.sidebarWidth;

  const changeWidth = (width: number) =>
    onChange(rail ? { sidebarRailWidth: width } : { sidebarWidth: width });

  return (
    <>
      <section aria-labelledby={`${id}-layout`} className={styles.section}>
        <h2 id={`${id}-layout`}>{t('settings.layout')}</h2>
        <SettingToggle
          label={t('settings.header')}
          description={t('settings.hidingTheHeaderClosesSettingsUseTheGearOn')}
          checked={settings.showHeader}
          onChange={onHeaderChange}
        />
        <SettingToggle
          label={t('settings.sidebar')}
          description={t('settings.showOrHideNavigationKeepItsLayoutAndWidth')}
          checked={settings.sidebarState !== 'hidden'}
          onChange={(visible) =>
            onChange({ sidebarState: visible ? settings.sidebarMode : 'hidden' })
          }
        />
        <SettingToggle
          label={t('settings.breadcrumb')}
          description={t('settings.showTheCurrentPagePathAboveTheContent')}
          checked={settings.showBreadcrumb}
          onChange={(showBreadcrumb) => onChange({ showBreadcrumb })}
        />
        <SettingToggle
          label={t('settings.footer')}
          description={t('settings.showTheVirgoDesignProHomeLink')}
          checked={settings.showFooter}
          onChange={(showFooter) => onChange({ showFooter })}
        />
      </section>
      <Separator decorative />
      <section aria-labelledby={`${id}-header`} className={styles.section}>
        <h2 id={`${id}-header`}>{t('settings.header')}</h2>
        <div className={styles.width}>
          <div className={styles.widthLabel}>
            <label htmlFor={`${id}-height`}>{t('settings.height')}</label>
            <PixelInput
              id={`${id}-height`}
              type="number"
              width={settings.headerHeight}
              min={headerHeightRange.min}
              max={headerHeightRange.max}
              onChange={(headerHeight) => onChange({ headerHeight })}
            />
          </div>
          <p id={`${id}-height-hint`} className={styles.hint}>
            {t('settings.valueValuePixels', {
              v0: headerHeightRange.min,
              v1: headerHeightRange.max,
            })}
          </p>
        </div>
        {fixedHeaderMaterial ? (
          <p className={styles.hint}>
            {t(
              fixedHeaderMaterial === 'glass'
                ? 'settings.themeUsesGlassHeader'
                : 'settings.themeUsesOpaqueHeader',
            )}
          </p>
        ) : (
          <>
            <SegmentedControl
              aria-label={t('settings.headerMaterial')}
              motion="slide"
              value={settings.headerMaterial}
              onValueChange={(value) => {
                if (value === 'solid' || value === 'glass') onChange({ headerMaterial: value });
              }}
              className={styles.segments!}
              size="medium"
            >
              <SegmentedControl.Item value="solid">
                {t('settings.opaque')}
              </SegmentedControl.Item>
              <SegmentedControl.Item value="glass">
                {t('settings.frostedGlass')}
              </SegmentedControl.Item>
            </SegmentedControl>
            <p className={styles.hint}>
              {t('settings.softenContentScrollingBeneathTheHeader')}
            </p>
          </>
        )}
      </section>
      <Separator decorative />
      <section aria-labelledby={`${id}-navigation`} className={styles.section}>
        <h2 id={`${id}-navigation`}>{t('settings.sidebar')}</h2>
        <SegmentedControl
          aria-label={t('settings.sidebarLayout')}
          motion="slide"
          value={settings.sidebarMode}
          onValueChange={(value) => {
            if (value === 'expanded' || value === 'collapsed')
              onChange({
                sidebarMode: value,
                ...(settings.sidebarState !== 'hidden' ? { sidebarState: value } : {}),
              });
          }}
          className={styles.segments!}
          size="medium"
        >
          <SegmentedControl.Item value="expanded">
            {t('settings.expanded')}
          </SegmentedControl.Item>
          <SegmentedControl.Item value="collapsed">
            {t('settings.iconRail')}
          </SegmentedControl.Item>
        </SegmentedControl>
        <div className={styles.width}>
          <div className={styles.widthLabel}>
            <label htmlFor={`${id}-width`}>{widthLabel}</label>
            <PixelInput
              key={settings.sidebarMode}
              id={`${id}-width`}
              width={sidebarWidth}
              min={widthRange.min}
              max={widthRange.max}
              onChange={changeWidth}
            />
          </div>
          <Slider
            aria-label={t('settings.valueSlider', { v0: widthLabel })}
            value={sidebarWidth}
            min={widthRange.min}
            max={widthRange.max}
            step={1}
            onValueChange={changeWidth}
          />
          <div className={styles.range}>
            <span>{t('settings.valuePx', { v0: widthRange.min })}</span>
            <span>{t('settings.valuePx', { v0: widthRange.max })}</span>
          </div>
          <p id={`${id}-width-hint`} className={styles.hint}>
            {t('settings.valueValuePixelsValue', {
              v0: widthRange.min,
              v1: widthRange.max,
              v2: rail
                ? t('settings.savedForTheIconRail')
                : t('settings.savedForWhenTheSidebarIsExpanded'),
            })}
          </p>
        </div>
        <SettingToggle
          label={t('settings.dragToResize')}
          description={t('settings.adjustTheSidebarFromItsDivider')}
          checked={settings.sidebarResizable}
          onChange={(sidebarResizable) => onChange({ sidebarResizable })}
        />
        <SettingToggle
          label={t('settings.magneticSnap')}
          description={t('settings.dragInwardToTheIconRailThenHide')}
          checked={settings.sidebarSnap}
          onChange={(sidebarSnap) => onChange({ sidebarSnap })}
        />
        <SettingToggle
          label={t('settings.fixedGroupLabels')}
          description={t('settings.keepGroupsExpandedAndRemoveDisclosureArrows')}
          checked={settings.sidebarStyle === 'labels'}
          onChange={(fixed) => onChange({ sidebarStyle: fixed ? 'labels' : 'collapsible' })}
        />
        <SettingToggle
          label={t('settings.submenuHeader')}
          description={t('settings.showTheGroupNameAndDividerInIconRail')}
          checked={settings.showSubmenuHeader}
          onChange={(showSubmenuHeader) => onChange({ showSubmenuHeader })}
        />
      </section>
    </>
  );
}

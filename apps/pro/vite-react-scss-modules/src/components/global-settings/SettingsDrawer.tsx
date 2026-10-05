import { MonitorIcon, MoonFilledIcon, SettingsIcon, SunFilledIcon } from '@virgo-design/icons';
import {
  Button,
  Drawer,
  Input,
  SegmentedControl,
  Separator,
  Slider,
  Switch,
  Tooltip,
} from '@virgo-design/ui';
import { type CSSProperties, forwardRef, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { headerHeightRange, type ProSettings, sidebarWidthRanges } from './settings';
import styles from './SettingsDrawer.module.scss';

function PixelInput({
  id,
  width,
  min,
  max,
  type = 'text',
  onChange,
}: {
  id: string;
  width: number;
  min: number;
  max: number;
  type?: 'text' | 'number';
  onChange: (width: number) => void;
}) {
  const { t } = useTranslation();
  // Associate a draft with the current width so slider changes replace stale input.
  const [draft, setDraft] = useState<{ width: number; text: string } | null>(null);
  const text = draft?.width === width ? draft.text : String(width);
  const commit = (value: string) => {
    const number = Number(value);
    if (/^\d+$/.test(value) && Number.isFinite(number))
      onChange(Math.min(max, Math.max(min, number)));
    setDraft(null);
  };

  return (
    <Input
      id={id}
      size="medium"
      type={type}
      steppers={type === 'number'}
      stepperReverse={type === 'number'}
      min={min}
      max={max}
      step={1}
      inputMode="numeric"
      value={text}
      suffix={t('settings.px')}
      aria-describedby={`${id}-hint`}
      rootClassName={type === 'number' ? styles.heightInputFrame! : styles.widthInputFrame!}
      className={styles.widthInput!}
      onChange={(event) => {
        const value = event.currentTarget.value;
        const number = Number(value);
        const valid = /^\d+$/.test(value) && number >= min && number <= max;
        setDraft({ width: valid ? number : width, text: value });
        if (valid) onChange(number);
      }}
      onBlur={(event) => commit(event.currentTarget.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          event.currentTarget.blur();
        } else if (event.key === 'Escape') {
          // Cancel the draft without also dismissing the settings drawer.
          event.preventDefault();
          event.stopPropagation();
          event.currentTarget.value = String(width);
          setDraft(null);
          event.currentTarget.blur();
        }
      }}
    />
  );
}

function SettingToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean, anchorY: number) => void;
}) {
  const id = useId();
  const pointerY = useRef<number | null>(null);
  return (
    <div
      className={styles.row}
      onPointerDownCapture={(event) => {
        pointerY.current = event.clientY;
      }}
      onKeyDownCapture={() => {
        pointerY.current = null;
      }}
    >
      <div>
        <label htmlFor={id}>{label}</label>
        <p id={`${id}-hint`}>{description}</p>
      </div>
      <Switch
        id={id}
        checked={checked}
        onChange={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          onChange(event.currentTarget.checked, pointerY.current ?? bounds.top + bounds.height / 2);
          pointerY.current = null;
        }}
        aria-describedby={`${id}-hint`}
        size="default"
      />
    </div>
  );
}

// The shell swaps this trigger between its header and the viewport edge.
export const SettingsTrigger = forwardRef<
  HTMLButtonElement,
  {
    anchorY?: number;
    tooltipOpen: boolean;
    onTooltipOpenChange: (open: boolean) => void;
    onTooltipInteraction: () => void;
  }
>(function SettingsTrigger(
  { anchorY, tooltipOpen, onTooltipOpenChange, onTooltipInteraction },
  ref,
) {
  const { t } = useTranslation();
  const docked = anchorY !== undefined;
  return (
    <Tooltip open={tooltipOpen} onOpenChange={onTooltipOpenChange}>
      <Tooltip.Trigger
        ref={ref}
        onFocus={onTooltipInteraction}
        onPointerMove={(event) => {
          // Overlay removal can send enter events without any user pointer movement.
          if (event.pointerType === 'mouse' && (event.movementX !== 0 || event.movementY !== 0))
            onTooltipInteraction();
        }}
        render={(tooltipProps) => (
          <Drawer.Trigger
            {...tooltipProps}
            render={(props) => (
              <Button
                {...props}
                iconOnly
                size="medium"
                variant={docked ? 'primary' : 'text'}
                aria-label={t('settings.settings')}
                {...(docked
                  ? {
                      className: styles.edgeTrigger,
                      style: { '--settings-anchor-y': `${anchorY}px` } as CSSProperties,
                    }
                  : {})}
              >
                <SettingsIcon animated={docked ? 'always' : false} />
              </Button>
            )}
          />
        )}
      />
      <Tooltip.Content placement={docked ? 'left' : 'bottom'}>
        {t('settings.settings')}
      </Tooltip.Content>
    </Tooltip>
  );
});

export function SettingsDrawer({
  settings,
  theme,
  storageAvailable,
  onChange,
  onReset,
  onHeaderChange,
  onCloseAutoFocus,
}: {
  settings: ProSettings;
  theme: 'light' | 'dark';
  storageAvailable: boolean;
  onChange: (patch: Partial<ProSettings>) => void;
  onReset: () => void;
  onHeaderChange: (showHeader: boolean, anchorY: number) => void;
  onCloseAutoFocus: (event: Event) => void;
}) {
  const { t } = useTranslation();
  const id = useId();
  const rail = settings.sidebarMode === 'collapsed';
  const widthRange = sidebarWidthRanges[settings.sidebarMode];
  const widthLabel = rail ? t('settings.railWidth') : t('settings.expandedWidth');
  const sidebarWidth = rail ? settings.sidebarRailWidth : settings.sidebarWidth;
  const changeWidth = (width: number) =>
    onChange(rail ? { sidebarRailWidth: width } : { sidebarWidth: width });
  return (
    <Drawer.Portal>
      <Drawer.Overlay />
      <Drawer.Content
        placement="right"
        className={styles.panel}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <Drawer.Header>
          <Drawer.Title className={styles.title}>
            <SettingsIcon aria-hidden="true" />
            {t('settings.settings')}
          </Drawer.Title>
          <Drawer.Description>{t('settings.makeThisWorkspaceFeelRight')}</Drawer.Description>
        </Drawer.Header>
        <Drawer.Body className={styles.body}>
          <section aria-labelledby={`${id}-appearance`} className={styles.section}>
            <h2 id={`${id}-appearance`}>{t('settings.appearance')}</h2>
            <SegmentedControl
              aria-label={t('settings.appearance')}
              motion="slide"
              value={settings.appearance}
              onValueChange={(value) => {
                if (value === 'light' || value === 'dark' || value === 'system')
                  onChange({ appearance: value });
              }}
              className={styles.segments!}
              size="medium"
            >
              <SegmentedControl.Item value="light">
                <span className={styles.appearanceLabel}>
                  <SunFilledIcon aria-hidden="true" />
                  {t('settings.light')}
                </span>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="dark">
                <span className={styles.appearanceLabel}>
                  <MoonFilledIcon aria-hidden="true" />
                  {t('settings.dark')}
                </span>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="system">
                <span className={styles.appearanceLabel}>
                  <MonitorIcon aria-hidden="true" />
                  {t('settings.system')}
                </span>
              </SegmentedControl.Item>
            </SegmentedControl>
            <p className={styles.hint}>
              {settings.appearance === 'system'
                ? t('settings.followingSystem', {
                    theme: theme === 'dark' ? t('settings.dark') : t('settings.light'),
                  })
                : t('settings.alsoAvailableFromTheHeaderAppearanceButton')}
            </p>
          </section>
          <Separator decorative />
          <section aria-labelledby={`${id}-display`} className={styles.section}>
            <h2 id={`${id}-display`}>{t('settings.display')}</h2>
            <SettingToggle
              label={t('settings.overlayArrows')}
              description={t('settings.showArrowsOnTooltipsAndPopupMenus')}
              checked={settings.showOverlayArrows}
              onChange={(showOverlayArrows) => onChange({ showOverlayArrows })}
            />
            <SettingToggle
              label={t('settings.breathingIndicator')}
              description={t('settings.animateTheWorkspaceStatusDot')}
              checked={settings.breathe}
              onChange={(breathe) => onChange({ breathe })}
            />
            <div className={styles.width}>
              <p id={`${id}-notification-indicator`} className={styles.controlLabel}>
                {t('settings.notificationIndicator')}
              </p>
              <SegmentedControl
                aria-labelledby={`${id}-notification-indicator`}
                motion="slide"
                value={settings.notificationIndicator}
                onValueChange={(value) => {
                  if (value === 'dot' || value === 'count' || value === 'none')
                    onChange({ notificationIndicator: value });
                }}
                className={styles.segments!}
                size="medium"
              >
                <SegmentedControl.Item value="dot">{t('settings.dot')}</SegmentedControl.Item>
                <SegmentedControl.Item value="count">{t('settings.number')}</SegmentedControl.Item>
                <SegmentedControl.Item value="none">{t('settings.none')}</SegmentedControl.Item>
              </SegmentedControl>
            </div>
          </section>
          <Separator decorative />
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
              <SegmentedControl.Item value="solid">{t('settings.opaque')}</SegmentedControl.Item>
              <SegmentedControl.Item value="glass">
                {t('settings.frostedGlass')}
              </SegmentedControl.Item>
            </SegmentedControl>
            <p className={styles.hint}>{t('settings.softenContentScrollingBeneathTheHeader')}</p>
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
        </Drawer.Body>
        <Drawer.Footer className={styles.footer}>
          <p role="status">
            {storageAvailable
              ? t('settings.changesApplyImmediatelyAndSaveInThisBrowser')
              : t('settings.changesApplyForThisSessionBrowserStorageIsUnavailable')}
          </p>
          <Button.Group layout="custom" className={styles.footerActions}>
            <Button variant="outline" onClick={onReset}>
              {t('settings.restoreDefaults')}
            </Button>
            <Drawer.Close variant="primary">{t('settings.done')}</Drawer.Close>
          </Button.Group>
        </Drawer.Footer>
        <Tooltip>
          <Tooltip.Trigger
            render={(props) => (
              <Drawer.Close {...props} size="medium" aria-label={t('settings.closeSettings')} />
            )}
          />
          <Tooltip.Content placement="left">{t('settings.closeSettings')}</Tooltip.Content>
        </Tooltip>
      </Drawer.Content>
    </Drawer.Portal>
  );
}

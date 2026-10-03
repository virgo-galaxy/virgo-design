import { MonitorIcon, MoonIcon, SettingsIcon, SunIcon } from '@virgo-design/icons';
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
      size={type === 'number' ? 'medium' : 'mini'}
      type={type}
      steppers={type === 'number'}
      stepperReverse={type === 'number'}
      min={min}
      max={max}
      step={1}
      inputMode="numeric"
      value={text}
      suffix="px"
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
        size="small"
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
                size={docked ? 'large' : 'medium'}
                variant={docked ? 'primary' : 'text'}
                aria-label="Settings"
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
      <Tooltip.Content placement={docked ? 'left' : 'bottom'}>Settings</Tooltip.Content>
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
  const id = useId();
  const rail = settings.sidebarMode === 'collapsed';
  const widthRange = sidebarWidthRanges[settings.sidebarMode];
  const widthLabel = rail ? 'Rail width' : 'Expanded width';
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
            Settings
          </Drawer.Title>
          <Drawer.Description>Make this workspace feel right.</Drawer.Description>
        </Drawer.Header>
        <Drawer.Body className={styles.body}>
          <section aria-labelledby={`${id}-appearance`} className={styles.section}>
            <h2 id={`${id}-appearance`}>Appearance</h2>
            <SegmentedControl
              aria-label="Appearance"
              motion="slide"
              value={settings.appearance}
              onValueChange={(value) => {
                if (value === 'light' || value === 'dark' || value === 'system')
                  onChange({ appearance: value });
              }}
              className={styles.segments!}
              size="small"
            >
              <SegmentedControl.Item value="light">
                <span className={styles.appearanceLabel}>
                  <SunIcon aria-hidden="true" />
                  Light
                </span>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="dark">
                <span className={styles.appearanceLabel}>
                  <MoonIcon aria-hidden="true" />
                  Dark
                </span>
              </SegmentedControl.Item>
              <SegmentedControl.Item value="system">
                <span className={styles.appearanceLabel}>
                  <MonitorIcon aria-hidden="true" />
                  System
                </span>
              </SegmentedControl.Item>
            </SegmentedControl>
            <p className={styles.hint}>
              {settings.appearance === 'system'
                ? `Following system · ${theme === 'dark' ? 'Dark' : 'Light'}`
                : 'Also available from the header appearance button.'}
            </p>
          </section>
          <Separator decorative />
          <section aria-labelledby={`${id}-display`} className={styles.section}>
            <h2 id={`${id}-display`}>Display</h2>
            <SettingToggle
              label="Overlay arrows"
              description="Show arrows on tooltips and popup menus."
              checked={settings.showOverlayArrows}
              onChange={(showOverlayArrows) => onChange({ showOverlayArrows })}
            />
            <SettingToggle
              label="Breathing indicator"
              description="Animate the workspace status dot."
              checked={settings.breathe}
              onChange={(breathe) => onChange({ breathe })}
            />
            <div className={styles.width}>
              <p id={`${id}-notification-indicator`} className={styles.controlLabel}>
                Notification indicator
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
                size="small"
              >
                <SegmentedControl.Item value="dot">Dot</SegmentedControl.Item>
                <SegmentedControl.Item value="count">Number</SegmentedControl.Item>
                <SegmentedControl.Item value="none">None</SegmentedControl.Item>
              </SegmentedControl>
            </div>
          </section>
          <Separator decorative />
          <section aria-labelledby={`${id}-layout`} className={styles.section}>
            <h2 id={`${id}-layout`}>Layout</h2>
            <SettingToggle
              label="Header"
              description="Hiding the header closes settings. Use the gear on the right edge to reopen them."
              checked={settings.showHeader}
              onChange={onHeaderChange}
            />
            <SettingToggle
              label="Sidebar"
              description="Show or hide navigation. Keep its layout and width settings below."
              checked={settings.sidebarState !== 'hidden'}
              onChange={(visible) =>
                onChange({ sidebarState: visible ? settings.sidebarMode : 'hidden' })
              }
            />
            <SettingToggle
              label="Breadcrumb"
              description="Show the current page path above the content."
              checked={settings.showBreadcrumb}
              onChange={(showBreadcrumb) => onChange({ showBreadcrumb })}
            />
            <SettingToggle
              label="Footer"
              description="Show the Virgo Design Pro home link."
              checked={settings.showFooter}
              onChange={(showFooter) => onChange({ showFooter })}
            />
          </section>
          <Separator decorative />
          <section aria-labelledby={`${id}-header`} className={styles.section}>
            <h2 id={`${id}-header`}>Header</h2>
            <div className={styles.width}>
              <div className={styles.widthLabel}>
                <label htmlFor={`${id}-height`}>Height</label>
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
                {headerHeightRange.min}–{headerHeightRange.max} pixels.
              </p>
            </div>
            <SegmentedControl
              aria-label="Header material"
              motion="slide"
              value={settings.headerMaterial}
              onValueChange={(value) => {
                if (value === 'solid' || value === 'glass') onChange({ headerMaterial: value });
              }}
              className={styles.segments!}
              size="small"
            >
              <SegmentedControl.Item value="solid">Opaque</SegmentedControl.Item>
              <SegmentedControl.Item value="glass">Frosted glass</SegmentedControl.Item>
            </SegmentedControl>
            <p className={styles.hint}>Soften content scrolling beneath the header.</p>
          </section>
          <Separator decorative />
          <section aria-labelledby={`${id}-navigation`} className={styles.section}>
            <h2 id={`${id}-navigation`}>Sidebar</h2>
            <SegmentedControl
              aria-label="Sidebar layout"
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
              size="small"
            >
              <SegmentedControl.Item value="expanded">Expanded</SegmentedControl.Item>
              <SegmentedControl.Item value="collapsed">Icon rail</SegmentedControl.Item>
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
                aria-label={`${widthLabel} slider`}
                value={sidebarWidth}
                min={widthRange.min}
                max={widthRange.max}
                step={1}
                onValueChange={changeWidth}
              />
              <div className={styles.range}>
                <span>{widthRange.min}px</span>
                <span>{widthRange.max}px</span>
              </div>
              <p id={`${id}-width-hint`} className={styles.hint}>
                {widthRange.min}–{widthRange.max} pixels.{' '}
                {rail ? 'Saved for the icon rail.' : 'Saved for when the sidebar is expanded.'}
              </p>
            </div>
            <SettingToggle
              label="Drag to resize"
              description="Adjust the sidebar from its divider."
              checked={settings.sidebarResizable}
              onChange={(sidebarResizable) => onChange({ sidebarResizable })}
            />
            <SettingToggle
              label="Magnetic snap"
              description="Drag inward to the icon rail, then hide."
              checked={settings.sidebarSnap}
              onChange={(sidebarSnap) => onChange({ sidebarSnap })}
            />
            <SettingToggle
              label="Fixed group labels"
              description="Keep groups expanded and remove disclosure arrows."
              checked={settings.sidebarStyle === 'labels'}
              onChange={(fixed) => onChange({ sidebarStyle: fixed ? 'labels' : 'collapsible' })}
            />
            <SettingToggle
              label="Submenu header"
              description="Show the group name and divider in icon-rail menus."
              checked={settings.showSubmenuHeader}
              onChange={(showSubmenuHeader) => onChange({ showSubmenuHeader })}
            />
          </section>
        </Drawer.Body>
        <Drawer.Footer className={styles.footer}>
          <p role="status">
            {storageAvailable
              ? 'Changes apply immediately and save in this browser.'
              : 'Changes apply for this session. Browser storage is unavailable.'}
          </p>
          <div className={styles.footerActions}>
            <Button variant="outline" onClick={onReset}>
              Restore defaults
            </Button>
            <Drawer.Close variant="primary">Done</Drawer.Close>
          </div>
        </Drawer.Footer>
        <Tooltip>
          <Tooltip.Trigger
            render={(props) => <Drawer.Close {...props} aria-label="Close settings" />}
          />
          <Tooltip.Content placement="left">Close settings</Tooltip.Content>
        </Tooltip>
      </Drawer.Content>
    </Drawer.Portal>
  );
}

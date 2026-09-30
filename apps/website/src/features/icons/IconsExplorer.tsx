import '@virgo-design/tokens/styles.css';
import './styles.scss';
import './platform.scss';

import type { IconAnimation, PlusIconProps } from '@virgo-design/icons';
import { type IconId, iconManifest } from '@virgo-design/icons/metadata';
import { iconComponents } from '@virgo-design/icons/registry';
import { Button, Input, Select, Switch, Tag } from '@virgo-design/ui';
import { type CSSProperties, type ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppearance } from '@/shared/theme/use-appearance';

import { IconSelect, type IconSelectOption } from './components/IconSelect';

const canonicalRenderSize = 24;
const largePreviewSize = 288;
const gridCoordinates = Array.from({ length: 25 }, (_, coordinate) => coordinate);

const iconOptions = iconManifest.map((icon) => ({
  id: icon.id,
  label:
    icon.id === 'github'
      ? 'GitHub'
      : icon.id
          .replace(
            /(^|-)(\w)/g,
            (_match, separator: string, character: string) =>
              `${separator ? ' ' : ''}${character.toUpperCase()}`,
          )
          .replace(/\b(En|Zh)$/, (value) => value.toUpperCase()),
  Icon: iconComponents[icon.id],
  animated: icon.animated,
})) satisfies ReadonlyArray<IconSelectOption>;

export function IconsExplorer({
  iconId,
  customIcon,
  onAnimationChange,
}: {
  iconId?: IconId;
  customIcon?: { id: string; label: string; Icon: (props: PlusIconProps) => ReactElement };
  onAnimationChange?: (animated: IconAnimation | undefined) => void;
}) {
  const { t } = useTranslation();
  const [selectedIconId, setSelectedIconId] = useState<IconId>('plus');
  const [showGrid, setShowGrid] = useState(true);
  const [size, setSize] = useState(24);
  const [color, setColor] = useState('');
  const [animationMode, setAnimationMode] = useState('off');
  const [animationRun, setAnimationRun] = useState(0);
  const { appearance } = useAppearance();
  const selectedIcon =
    customIcon ??
    iconOptions.find((icon) => icon.id === (iconId ?? selectedIconId)) ??
    iconOptions[0]!;
  const SelectedIcon = selectedIcon.Icon;
  const supportsAnimation = 'animated' in selectedIcon && selectedIcon.animated;
  const animated: IconAnimation | undefined =
    !supportsAnimation || animationMode === 'off'
      ? undefined
      : animationMode === 'always'
        ? 'always'
        : animationMode === 'once'
          ? true
          : 3;
  const animationProps = animated === undefined ? {} : { animated };
  const iconStyle = { color: color || undefined };
  const sliderStyle = { '--size-progress': `${((size - 12) / 52) * 100}%` } as CSSProperties;

  return (
    <div className="icons-explorer-feature">
      <section
        className="icons-explorer review-workspace"
        data-appearance={appearance}
        aria-labelledby="review-title"
      >
        <div className="review-board">
          <header className="section-heading">
            <p className="eyebrow">{t('icons.canonicalIcon')}</p>
            <h2 id="review-title">{selectedIcon.label}</h2>
            <p className="canvas-contract">24 × 24 viewBox · currentColor fill</p>
          </header>
          <div
            className="design-canvas"
            data-grid={showGrid}
            data-icon={selectedIcon.id}
            data-testid="icon-canvas"
            style={iconStyle}
          >
            {showGrid ? (
              <div aria-hidden="true" className="grid-coordinates" data-testid="grid-coordinates">
                <div className="grid-coordinates__axis grid-coordinates__axis--x">
                  {gridCoordinates.map((coordinate) => (
                    <span key={coordinate} style={{ left: `${(coordinate / 24) * 100}%` }}>
                      {coordinate}
                    </span>
                  ))}
                </div>
                <div className="grid-coordinates__axis grid-coordinates__axis--y">
                  {gridCoordinates.map((coordinate) => (
                    <span key={coordinate} style={{ top: `${(coordinate / 24) * 100}%` }}>
                      {coordinate}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            <SelectedIcon
              key={`${selectedIcon.id}:${animationRun}`}
              {...animationProps}
              style={iconStyle}
              className="large-glyph"
              size={largePreviewSize}
              data-testid="large-icon-glyph"
            />
          </div>
        </div>

        <aside className="preview-sidebar" aria-label={t('icons.reviewControls')}>
          <h3 className="preview-sidebar-title">{t('icons.reviewControls')}</h3>
          {iconId || customIcon ? null : (
            <IconSelect
              onChange={(iconId) => setSelectedIconId(iconId as IconId)}
              options={iconOptions}
              value={selectedIconId}
            />
          )}
          <div className="preview-context">
            <div className="background-readout">
              <span className="control-label">{t('icons.background')}</span>
              <Tag
                size="md"
                variant="soft"
                intent="neutral"
                role="status"
                aria-label={t('icons.background')}
                data-testid="preview-background"
                aria-live="polite"
              >
                {t(`icons.${appearance}`)}
              </Tag>
            </div>
            <div className="grid-control">
              <span className="control-label">
                {t('icons.grid', { state: t(showGrid ? 'icons.on' : 'icons.off') })}
              </span>
              <Switch
                appearance="fader"
                checked={showGrid}
                aria-label={t('icons.toggleGrid')}
                onCheckedChange={setShowGrid}
              />
            </div>
          </div>
          <div className="size-control">
            <div className="control-heading">
              <label htmlFor="icon-preview-size">{t('icons.size')}</label>
              <output>{size}px</output>
            </div>
            <div className="size-adjustment">
              <input
                id="icon-preview-size"
                style={sliderStyle}
                aria-label={t('icons.size')}
                type="range"
                min="12"
                max="64"
                value={size}
                onChange={(event) => setSize(Number(event.target.value))}
              />
              <span className="adjusted-size-stage">
                <SelectedIcon
                  key={animationRun}
                  {...animationProps}
                  style={iconStyle}
                  size={size}
                  data-testid="controlled-icon-glyph"
                />
              </span>
            </div>
          </div>
          <div className="color-control">
            <span className="control-label">{t('icons.color')}</span>
            <Input
              aria-label={t('icons.color')}
              placeholder="currentColor"
              value={color}
              leadingIcon={
                <span
                  className="color-swatch"
                  style={{ backgroundColor: color || 'var(--vd-icon-primary)' }}
                  aria-hidden="true"
                />
              }
              onChange={(event) => setColor(event.target.value)}
            />
          </div>

          {supportsAnimation ? (
            <div className="animation-control">
              <span className="control-label">{t('icons.animationPlayback')}</span>
              <Select
                value={animationMode}
                onValueChange={(value) => {
                  setAnimationMode(value);
                  setAnimationRun((count) => count + 1);
                  onAnimationChange?.(
                    value === 'off'
                      ? undefined
                      : value === 'always'
                        ? 'always'
                        : value === 'once'
                          ? true
                          : 3,
                  );
                }}
              >
                <Select.Trigger aria-label={t('icons.animationPlayback')} />
                <Select.Content>
                  <Select.Option value="off">{t('icons.nonAnimated')}</Select.Option>
                  <Select.Option value="once">{t('icons.playOnce')}</Select.Option>
                  <Select.Option value="three">{t('icons.playThreeTimes')}</Select.Option>
                  <Select.Option value="always">{t('icons.playAlways')}</Select.Option>
                </Select.Content>
              </Select>
            </div>
          ) : null}

          <section className="actual-size-preview" aria-label={t('icons.actualSize')}>
            <p className="control-label">{t('icons.actualSize')}</p>
            <div className="actual-size-samples">
              {[16, 20, canonicalRenderSize, 32].map((sampleSize) => (
                <span key={sampleSize} className="actual-size-stage" data-icon={selectedIcon.id}>
                  <SelectedIcon
                    key={animationRun}
                    {...animationProps}
                    style={iconStyle}
                    size={sampleSize}
                    data-testid={sampleSize === 24 ? 'actual-icon-glyph' : `actual-${sampleSize}`}
                  />
                  <small>{sampleSize}px</small>
                </span>
              ))}
            </div>
          </section>
          <section className="ui-preview" aria-labelledby="ui-preview-title">
            <p className="control-label" id="ui-preview-title">
              {t('icons.preview')}
            </p>
            <div className="ui-preview-controls">
              <Button
                iconOnly
                aria-label={t('icons.icon')}
                variant="outline"
                data-testid="icon-button-preview"
              >
                <SelectedIcon
                  key={animationRun}
                  {...animationProps}
                  style={iconStyle}
                  aria-hidden="true"
                  size={20}
                />
              </Button>
              <Button
                variant="outline"
                leadingIcon={
                  <SelectedIcon
                    key={animationRun}
                    {...animationProps}
                    style={iconStyle}
                    aria-hidden="true"
                    size={20}
                  />
                }
                data-testid="text-button-preview"
              >
                {t('icons.icon')}
              </Button>
            </div>
            <p className="ui-preview-note">{t('icons.previewNote')}</p>
          </section>
        </aside>
      </section>
    </div>
  );
}

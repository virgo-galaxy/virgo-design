import '@virgo-design/tokens/styles.css';
import './styles.scss';

import {
  BotIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsDownIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpIcon,
  ChevronUpIcon,
  CircleCheckIcon,
  CircleInfoIcon,
  CircleXIcon,
  CloseIcon,
  CodeIcon,
  CopyIcon,
  CybertruckIcon,
  DashboardIcon,
  EllipsisIcon,
  EllipsisVerticalIcon,
  ExternalLinkIcon,
  EyeClosedIcon,
  EyeIcon,
  GaugeIcon,
  GithubIcon,
  GlobeIcon,
  HomeIcon,
  LanguageEnIcon,
  LanguageZhIcon,
  LayersIcon,
  LayoutIcon,
  LockIcon,
  MinusIcon,
  MoonIcon,
  PaletteIcon,
  PinIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  ShapesIcon,
  SidebarCollapseIcon,
  SidebarExpandIcon,
  SplineIcon,
  SunIcon,
  TrashIcon,
  TriangleAlertIcon,
  TypeIcon,
  UnlockIcon,
  UnpinIcon,
  UserIcon,
} from '@virgo-design/icons';
import { useState } from 'react';

import { useAppearance } from '@/shared/theme/use-appearance';

import { IconSelect, type IconSelectOption } from './components/IconSelect';

const canonicalRenderSize = 24;
const largePreviewSize = 288;
const gridCoordinates = Array.from({ length: 25 }, (_, coordinate) => coordinate);

const iconOptions = [
  { id: 'cybertruck', label: 'Cybertruck', Icon: CybertruckIcon },
  { id: 'github', label: 'GitHub', Icon: GithubIcon },
  { id: 'plus', label: 'Plus', Icon: PlusIcon },
  { id: 'minus', label: 'Minus', Icon: MinusIcon },
  { id: 'close', label: 'Close', Icon: CloseIcon },
  { id: 'check', label: 'Check', Icon: CheckIcon },
  { id: 'code', label: 'Code', Icon: CodeIcon },
  { id: 'copy', label: 'Copy', Icon: CopyIcon },
  { id: 'lock', label: 'Lock', Icon: LockIcon },
  { id: 'unlock', label: 'Unlock', Icon: UnlockIcon },
  { id: 'pin', label: 'Pin', Icon: PinIcon },
  { id: 'unpin', label: 'Unpin', Icon: UnpinIcon },
  { id: 'circle-check', label: 'Circle Check', Icon: CircleCheckIcon },
  { id: 'circle-info', label: 'Circle Info', Icon: CircleInfoIcon },
  { id: 'triangle-alert', label: 'Triangle Alert', Icon: TriangleAlertIcon },
  { id: 'circle-x', label: 'Circle X', Icon: CircleXIcon },
  { id: 'ellipsis', label: 'Ellipsis', Icon: EllipsisIcon },
  { id: 'ellipsis-vertical', label: 'Ellipsis Vertical', Icon: EllipsisVerticalIcon },
  { id: 'external-link', label: 'External Link', Icon: ExternalLinkIcon },
  { id: 'chevron-down', label: 'Chevron Down', Icon: ChevronDownIcon },
  { id: 'chevron-up', label: 'Chevron Up', Icon: ChevronUpIcon },
  { id: 'chevron-left', label: 'Chevron Left', Icon: ChevronLeftIcon },
  { id: 'chevron-right', label: 'Chevron Right', Icon: ChevronRightIcon },
  { id: 'chevrons-down', label: 'Chevrons Down', Icon: ChevronsDownIcon },
  { id: 'chevrons-up', label: 'Chevrons Up', Icon: ChevronsUpIcon },
  { id: 'chevrons-left', label: 'Chevrons Left', Icon: ChevronsLeftIcon },
  { id: 'chevrons-right', label: 'Chevrons Right', Icon: ChevronsRightIcon },
  { id: 'search', label: 'Search', Icon: SearchIcon },
  { id: 'eye', label: 'Eye', Icon: EyeIcon },
  { id: 'eye-closed', label: 'Eye Closed', Icon: EyeClosedIcon },
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'layout', label: 'Layout', Icon: LayoutIcon },
  { id: 'palette', label: 'Palette', Icon: PaletteIcon },
  { id: 'type', label: 'Type', Icon: TypeIcon },
  { id: 'layers', label: 'Layers', Icon: LayersIcon },
  { id: 'spline', label: 'Spline', Icon: SplineIcon },
  { id: 'shapes', label: 'Shapes', Icon: ShapesIcon },
  { id: 'sidebar-collapse', label: 'Sidebar Collapse', Icon: SidebarCollapseIcon },
  { id: 'sidebar-expand', label: 'Sidebar Expand', Icon: SidebarExpandIcon },
  { id: 'dashboard', label: 'Dashboard', Icon: DashboardIcon },
  { id: 'gauge', label: 'Gauge', Icon: GaugeIcon },
  { id: 'globe', label: 'Globe', Icon: GlobeIcon },
  { id: 'trash', label: 'Trash', Icon: TrashIcon },
  { id: 'user', label: 'User', Icon: UserIcon },
  { id: 'bot', label: 'Bot', Icon: BotIcon },
  { id: 'settings', label: 'Settings', Icon: SettingsIcon },
  { id: 'moon', label: 'Moon', Icon: MoonIcon },
  { id: 'sun', label: 'Sun', Icon: SunIcon },
  { id: 'language-en', label: 'Language EN', Icon: LanguageEnIcon },
  { id: 'language-zh', label: 'Language ZH', Icon: LanguageZhIcon },
] as const satisfies ReadonlyArray<IconSelectOption>;

type IconId = (typeof iconOptions)[number]['id'];

export function IconsExplorer() {
  const [selectedIconId, setSelectedIconId] = useState<IconId>('plus');
  const [showGrid, setShowGrid] = useState(true);
  const { appearance } = useAppearance();
  const selectedIcon = iconOptions.find((icon) => icon.id === selectedIconId) ?? iconOptions[0];
  const SelectedIcon = selectedIcon.Icon;

  return (
    <div className="icons-explorer-feature">
      <div className="icons-explorer" data-theme={appearance}>
        <main>
          <section className="control-bar" aria-label="Review controls">
            <IconSelect
              onChange={(iconId) => setSelectedIconId(iconId as IconId)}
              options={iconOptions}
              value={selectedIconId}
            />

            <fieldset className="control-group">
              <legend>Grid</legend>
              <button
                aria-label="Toggle grid"
                aria-pressed={showGrid}
                className="toggle-button"
                onClick={() => setShowGrid((visible) => !visible)}
                type="button"
              >
                {showGrid ? 'On' : 'Off'}
              </button>
            </fieldset>
          </section>

          <section className="review-board" aria-labelledby="review-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">CANONICAL ICON</p>
                <h2 id="review-title">{selectedIcon.label}</h2>
              </div>
              <p>24 × 24 viewBox · currentColor fill</p>
            </div>

            <div
              className="design-canvas"
              data-grid={showGrid}
              data-icon={selectedIcon.id}
              data-testid="icon-canvas"
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
                className="large-glyph"
                size={largePreviewSize}
                data-testid="large-icon-glyph"
              />
            </div>

            <div className="actual-size-preview">
              <p>Actual 24px</p>
              <span className="actual-size-stage" data-icon={selectedIcon.id}>
                <SelectedIcon size={canonicalRenderSize} data-testid="actual-icon-glyph" />
              </span>
            </div>

            <section className="ui-preview" aria-labelledby="ui-preview-title">
              <p className="eyebrow" id="ui-preview-title">
                UI PREVIEW
              </p>
              <p className="ui-preview-note">Button icons render at 20 × 20px.</p>
              <div className="ui-preview-controls">
                <button
                  aria-label="Icon"
                  className="icon-button-preview"
                  data-testid="icon-button-preview"
                  type="button"
                >
                  <SelectedIcon aria-hidden="true" size={20} />
                </button>
                <button
                  className="text-button-preview"
                  data-testid="text-button-preview"
                  type="button"
                >
                  <SelectedIcon aria-hidden="true" size={20} />
                  <span>Icon</span>
                </button>
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

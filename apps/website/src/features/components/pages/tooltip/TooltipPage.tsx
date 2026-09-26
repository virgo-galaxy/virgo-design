import './TooltipPage.scss';

import { SettingsIcon } from '@virgo-design/icons';
import { Switch, Tooltip, type TooltipTone } from '@virgo-design/ui';
import { useEffect, useState } from 'react';

import { PlacementCompass } from '../../components/PlacementCompass';
import { ReviewSection } from '../../components/ReviewSection';

const tones: TooltipTone[] = ['default', 'brand', 'success', 'warning', 'danger', 'info'];

export function TooltipPage() {
  const [arrow, setArrow] = useState(true);
  const [actions, setActions] = useState(0);
  const [dynamicOpen, setDynamicOpen] = useState(false);
  const [detailed, setDetailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!dynamicOpen) return;
    const timer = setTimeout(() => setDetailed(true), 900);
    return () => clearTimeout(timer);
  }, [dynamicOpen]);
  return (
    <div className="review-board tooltip-review" id="tooltip-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 30</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Tooltip</h1>
          <p>
            A little context without interrupting the flow. Hover or focus for a brief description,
            with twelve positions that stay connected to the control.
          </p>
          <dl className="component-facts">
            <div>
              <dt>Placement</dt>
              <dd>12 positions</dd>
            </div>
            <div>
              <dt>Trigger</dt>
              <dd>Hover / focus</dd>
            </div>
            <div>
              <dt>Content</dt>
              <dd>Descriptive</dd>
            </div>
          </dl>
        </div>
        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>contextual help</code>
          </div>
          <div className="hero-stage tooltip-hero-stage">
            <Tooltip>
              <Tooltip.Trigger>Hover or focus me</Tooltip.Trigger>
              <Tooltip.Content>Small details, right where you need them.</Tooltip.Content>
            </Tooltip>
          </div>
          <div className="specimen-caption">
            <span>Native actions</span>
            <span>Keyboard ready</span>
            <span>Theme aware</span>
          </div>
        </div>
      </section>
      <ReviewSection
        id="tooltip-basic"
        index="01"
        title="Hover & focus"
        description="Hover opens after a short delay. Keyboard focus opens immediately. Escape dismisses and leaves focus on the control."
      >
        <div className="tooltip-review-card">
          <Tooltip>
            <Tooltip.Trigger variant="text">A little more context</Tooltip.Trigger>
            <Tooltip.Content>Move into this text to keep reading.</Tooltip.Content>
          </Tooltip>
          <Tooltip openDelay={0}>
            <Tooltip.Trigger>Instant preview</Tooltip.Trigger>
            <Tooltip.Content>No hover delay for this example.</Tooltip.Content>
          </Tooltip>
          <Tooltip disabled>
            <Tooltip.Trigger>Disabled tooltip</Tooltip.Trigger>
            <Tooltip.Content>Unavailable</Tooltip.Content>
          </Tooltip>
        </div>
      </ReviewSection>
      <ReviewSection
        id="tooltip-smooth-transition"
        index="02"
        title="Smooth transition"
        description="Smooth transition is enabled for this example. Move between the four buttons to pass the tooltip from one control to the next without a repeated delay or fade."
      >
        <div className="tooltip-review-card tooltip-smooth-card">
          <div className="tooltip-smooth-grid" role="group" aria-label="Smooth transition">
            {['Overview', 'Members', 'Activity', 'Settings'].map((label) => (
              <Tooltip key={label} smoothTransition>
                <Tooltip.Trigger variant="primary">{label}</Tooltip.Trigger>
                <Tooltip.Content>Explore your workspace.</Tooltip.Content>
              </Tooltip>
            ))}
          </div>
        </div>
      </ReviewSection>
      <ReviewSection
        id="tooltip-placement"
        index="03"
        title="Placement & arrow"
        description="Twelve physical positions arranged around the trigger area. The arrow follows the trigger center; the panel flips and shifts at viewport edges."
      >
        <div className="tooltip-placement-card">
          <Switch checked={arrow} onCheckedChange={setArrow}>
            Show arrow
          </Switch>
          <PlacementCompass>
            {(placement, label) => (
              <Tooltip key={placement}>
                <Tooltip.Trigger size="small" aria-label={placement}>
                  {label}
                </Tooltip.Trigger>
                <Tooltip.Content placement={placement} arrow={arrow}>
                  {placement} tooltip
                </Tooltip.Content>
              </Tooltip>
            )}
          </PlacementCompass>
        </div>
      </ReviewSection>
      <ReviewSection
        id="tooltip-tone"
        index="04"
        title="Semantic colors"
        description="Strong semantic tones use dedicated solid backgrounds and on-solid foreground colors. A custom class can set the background and foreground together."
      >
        <div className="tooltip-review-card">
          {tones.map((tone) => (
            <Tooltip key={tone}>
              <Tooltip.Trigger size="small">{tone}</Tooltip.Trigger>
              <Tooltip.Content tone={tone}>{tone} description</Tooltip.Content>
            </Tooltip>
          ))}
          <Tooltip>
            <Tooltip.Trigger size="small">Custom violet</Tooltip.Trigger>
            <Tooltip.Content className="tooltip-custom-color">
              Custom background and foreground.
            </Tooltip.Content>
          </Tooltip>
        </div>
      </ReviewSection>
      <ReviewSection
        id="tooltip-actions"
        index="05"
        title="Real controls"
        description="Our own Settings icon and Button are used together. The tooltip describes the action; clicking still runs it. The icon button keeps its accessible name."
      >
        <div className="tooltip-review-card">
          <Tooltip>
            <Tooltip.Trigger
              aria-label="Workspace settings"
              onClick={() => setActions((value) => value + 1)}
            >
              <SettingsIcon size={20} />
            </Tooltip.Trigger>
            <Tooltip.Content>Open workspace settings</Tooltip.Content>
          </Tooltip>
          <span role="status">Settings opened: {actions}</span>
        </div>
      </ReviewSection>
      <ReviewSection
        id="tooltip-dynamic"
        index="06"
        title="Content & direction"
        description="The first description grows while open to check automatic realignment. The second uses a local RTL direction and logical start alignment."
      >
        <div className="tooltip-review-card">
          <Tooltip
            open={dynamicOpen}
            onOpenChange={(next) => {
              setDynamicOpen(next);
              if (!next) setDetailed(false);
            }}
          >
            <Tooltip.Trigger>Changing description</Tooltip.Trigger>
            <Tooltip.Content placement="topRight">
              {detailed
                ? 'Workspace details are ready. The tooltip keeps its arrow connected as this description becomes longer.'
                : 'Workspace details'}
            </Tooltip.Content>
          </Tooltip>
          <div dir="rtl">
            <Tooltip>
              <Tooltip.Trigger>RTL preview</Tooltip.Trigger>
              <Tooltip.Content placement="topStart">
                مساحة العمل · Workspace details
              </Tooltip.Content>
            </Tooltip>
          </div>
        </div>
      </ReviewSection>
      <ReviewSection
        id="tooltip-sizes"
        index="07"
        title="Content sizes"
        description="Content size is independent of the trigger button. Medium is unchanged; small is a compact description for toolbars."
      >
        <div className="tooltip-review-card">
          <Tooltip>
            <Tooltip.Trigger>Small tooltip</Tooltip.Trigger>
            <Tooltip.Content size="small">Compact description</Tooltip.Content>
          </Tooltip>
          <Tooltip>
            <Tooltip.Trigger>Medium tooltip</Tooltip.Trigger>
            <Tooltip.Content size="medium">Default description</Tooltip.Content>
          </Tooltip>
        </div>
      </ReviewSection>
      <ReviewSection
        id="tooltip-activation"
        index="08"
        title="Keep feedback on activation"
        description="closeOnClick=false keeps the current tooltip open during activation. Its text changes in place; Escape and leaving hover/focus still dismiss it."
      >
        <div className="tooltip-review-card">
          <Tooltip closeOnClick={false}>
            <Tooltip.Trigger
              aria-expanded={expanded}
              aria-controls="tooltip-example-details"
              onClick={() => setExpanded((value) => !value)}
            >
              Toggle details
            </Tooltip.Trigger>
            <Tooltip.Content size="small">
              {expanded ? 'Hide details' : 'Show details'}
            </Tooltip.Content>
          </Tooltip>
          <span id="tooltip-example-details" hidden={!expanded}>
            The description changes without closing the tooltip.
          </span>
        </div>
      </ReviewSection>
      <footer className="review-footer">
        <span>Virgo Design UI · Tooltip V1.0.0</span>
        <span>Primitive · Tokens · Icons · Metadata · Accessibility</span>
      </footer>
    </div>
  );
}

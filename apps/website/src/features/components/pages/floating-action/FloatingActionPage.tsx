import './FloatingActionPage.scss';

import { CircleInfoIcon, DashboardIcon, SettingsIcon } from '@virgo-design/icons';
import {
  FloatingAction,
  type FloatingActionContentProps,
  type FloatingActionProps,
} from '@virgo-design/ui';
import { floatingActionMetadata } from '@virgo-design/ui/metadata';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const variants = ['primary', 'secondary', 'outline', 'text'] as const satisfies ReadonlyArray<
  NonNullable<FloatingActionProps['variant']>
>;

const placements = [
  { value: 'top', label: 'Top' },
  { value: 'right', label: 'Right' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
] as const satisfies ReadonlyArray<{
  value: NonNullable<FloatingActionContentProps['placement']>;
  label: string;
}>;

export function FloatingActionPage() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('Choose a quick action.');

  const selectAction = (message: string) => {
    setStatus(message);
    setOpen(false);
  };

  return (
    <div className="review-board floating-action-review" id="floating-action-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 35</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>{floatingActionMetadata.name}</h1>
          <p>{floatingActionMetadata.description}</p>

          <dl className="component-facts">
            <div>
              <dt>Parts</dt>
              <dd>{String(floatingActionMetadata.anatomy.length).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt>States</dt>
              <dd>{String(floatingActionMetadata.states.length).padStart(2, '0')}</dd>
            </div>
            <div>
              <dt>Patterns</dt>
              <dd>{String(floatingActionMetadata.examples.length).padStart(2, '0')}</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>standalone · primary</code>
          </div>
          <div className="hero-stage">
            <FloatingAction variant="primary" aria-label="Help">
              <CircleInfoIcon />
            </FloatingAction>
          </div>
          <div className="specimen-caption">
            <span>Button semantics</span>
            <span>Circular shape</span>
            <span>Token elevation</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="floating-action-basic"
        index="01"
        title="Basic"
        description="Standalone actions reuse Virgo Button variants, sizing, keyboard activation and disabled behavior."
      >
        <div className="variant-grid">
          {variants.map((variant) => (
            <article className="specimen-cell" key={variant}>
              <div className="cell-meta">
                <strong>{variant.charAt(0).toUpperCase() + variant.slice(1)}</strong>
                <span>Large circular action</span>
              </div>
              <div className="component-stage">
                <FloatingAction variant={variant} aria-label={`${variant} settings`}>
                  <SettingsIcon />
                </FloatingAction>
              </div>
              <code>variant=&quot;{variant}&quot;</code>
            </article>
          ))}
        </div>
        <div className="floating-action-state-row">
          <div>
            <strong>Disabled</strong>
            <span>Native Button disabled behavior</span>
          </div>
          <FloatingAction disabled aria-label="Unavailable action">
            <SettingsIcon />
          </FloatingAction>
          <code>disabled</code>
        </div>
      </ReviewSection>

      <ReviewSection
        id="floating-action-group"
        index="02"
        title="Button and Popover composition"
        description="Group, Trigger and Content combine circular Button actions with Popover open state, focus handling and dismissal."
      >
        <div className="floating-action-group-stage">
          <div>
            <strong>Quick actions</strong>
            <p role="status">{status}</p>
          </div>
          <FloatingAction.Group open={open} onOpenChange={setOpen}>
            <FloatingAction.Trigger aria-label="Quick actions" />
            <FloatingAction.Content aria-label="Quick actions">
              <FloatingAction
                aria-label="Inspect dashboard"
                onClick={() => selectAction('Dashboard inspection selected.')}
              >
                <DashboardIcon />
              </FloatingAction>
              <FloatingAction aria-label="Open help" onClick={() => selectAction('Help selected.')}>
                <CircleInfoIcon />
              </FloatingAction>
            </FloatingAction.Content>
          </FloatingAction.Group>
        </div>
      </ReviewSection>

      <ReviewSection
        id="floating-action-placement"
        index="03"
        title="Popover placement"
        description="Grouped actions inherit Popover placement. Standalone positioning remains the responsibility of the containing layout."
      >
        <div className="floating-action-placement-grid">
          {placements.map(({ value, label }) => (
            <article key={value}>
              <div className="cell-meta">
                <strong>{label}</strong>
                <span>Content placement</span>
              </div>
              <FloatingAction.Group className="floating-action-placement-control">
                <FloatingAction.Trigger aria-label={`Open ${label.toLowerCase()} actions`} />
                <FloatingAction.Content placement={value} aria-label={`${label} actions`}>
                  <FloatingAction aria-label={`${label} settings`}>
                    <SettingsIcon />
                  </FloatingAction>
                </FloatingAction.Content>
              </FloatingAction.Group>
              <code>placement=&quot;{value}&quot;</code>
            </article>
          ))}
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · FloatingAction V1.0.0</span>
        <span>Button · Popover · Tokens · Icons · Metadata</span>
      </footer>
    </div>
  );
}

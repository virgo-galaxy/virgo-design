import { CheckIcon, CloseIcon } from '@virgo-design/icons';
import { Switch } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

export function SwitchPage() {
  return (
    <div className="review-board" id="switch-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 14</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Switch</h1>
          <p>
            Toggles an immediate binary state with a familiar pill control or a more technical
            console-style fader appearance.
          </p>

          <dl className="component-facts">
            <div>
              <dt>Appearances</dt>
              <dd>02</dd>
            </div>
            <div>
              <dt>Sizes</dt>
              <dd>02</dd>
            </div>
            <div>
              <dt>States</dt>
              <dd>03</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>toggle · default</code>
          </div>
          <div className="hero-stage">
            <Switch defaultChecked>Sync changes</Switch>
          </div>
          <div className="specimen-caption">
            <span>44 × 24px</span>
            <span>Body Medium</span>
            <span>Native switch semantics</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="switch-basic"
        index="01"
        title="Basic"
        description="The standard pill switch communicates off and on state through thumb position and brand fill."
      >
        <div className="switch-demo-grid switch-demo-grid--two">
          <article className="switch-specimen-card">
            <div className="cell-meta">
              <strong>Off</strong>
              <span>Inactive binary state</span>
            </div>
            <div className="switch-component-stage">
              <Switch aria-label="Notifications off" />
            </div>
            <code>checked=false</code>
          </article>

          <article className="switch-specimen-card">
            <div className="cell-meta">
              <strong>On</strong>
              <span>Active binary state</span>
            </div>
            <div className="switch-component-stage">
              <Switch aria-label="Notifications on" defaultChecked />
            </div>
            <code>defaultChecked</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="switch-sizes"
        index="02"
        title="Sizes"
        description="Switch keeps a focused two-size scale: default for normal interfaces and small for dense controls."
      >
        <div className="switch-size-panel">
          <div className="switch-size-row">
            <div className="switch-size-name">
              <strong>Default</strong>
              <code>44 × 24px</code>
            </div>
            <div className="switch-size-stage">
              <Switch aria-label="Default switch" defaultChecked />
            </div>
            <code>size=&quot;default&quot;</code>
          </div>

          <div className="switch-size-row">
            <div className="switch-size-name">
              <strong>Small</strong>
              <code>28 × 16px</code>
            </div>
            <div className="switch-size-stage">
              <Switch aria-label="Small switch" defaultChecked size="small" />
            </div>
            <code>size=&quot;small&quot;</code>
          </div>
        </div>
      </ReviewSection>

      <ReviewSection
        id="switch-content"
        index="03"
        title="Content"
        description="Toggle appearance can carry compact decorative cues without changing the accessible switch state."
      >
        <div className="switch-demo-grid">
          <article className="switch-specimen-card">
            <div className="cell-meta">
              <strong>Text</strong>
              <span>Short state words</span>
            </div>
            <div className="switch-component-stage">
              <Switch
                aria-label="Power"
                checkedContent="On"
                defaultChecked
                uncheckedContent="Off"
              />
            </div>
            <code>checkedContent · uncheckedContent</code>
          </article>

          <article className="switch-specimen-card">
            <div className="cell-meta">
              <strong>Numeric</strong>
              <span>Compact binary cue</span>
            </div>
            <div className="switch-component-stage">
              <Switch aria-label="Binary" checkedContent="1" uncheckedContent="0" />
            </div>
            <code>1 · 0</code>
          </article>

          <article className="switch-specimen-card">
            <div className="cell-meta">
              <strong>Icon</strong>
              <span>Virgo icon content</span>
            </div>
            <div className="switch-component-stage">
              <Switch
                aria-label="Verified"
                checkedContent={<CheckIcon size={12} />}
                defaultChecked
                uncheckedContent={<CloseIcon size={12} />}
              />
            </div>
            <code>CheckIcon · CloseIcon</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="switch-appearances"
        index="04"
        title="Appearance"
        description="The fader keeps native switch semantics while using a thin console rail and a compact sliding control block."
      >
        <div className="switch-demo-grid switch-demo-grid--two">
          <article className="switch-specimen-card">
            <div className="cell-meta">
              <strong>Toggle</strong>
              <span>Familiar pill control</span>
            </div>
            <div className="switch-component-stage switch-component-stage--pair">
              <Switch aria-label="Toggle off" />
              <Switch aria-label="Toggle on" defaultChecked />
            </div>
            <code>appearance=&quot;toggle&quot;</code>
          </article>

          <article className="switch-specimen-card">
            <div className="cell-meta">
              <strong>Fader</strong>
              <span>Console-style linear switch</span>
            </div>
            <div className="switch-component-stage switch-component-stage--pair">
              <Switch aria-label="Fader off" appearance="fader" />
              <Switch aria-label="Fader on" appearance="fader" defaultChecked />
            </div>
            <code>appearance=&quot;fader&quot;</code>
          </article>
        </div>
      </ReviewSection>

      <ReviewSection
        id="switch-disabled"
        index="05"
        title="Disabled"
        description="Disabled preserves off and on state in both visual appearances without introducing another semantic mode."
      >
        <div className="switch-disabled-panel">
          <div className="switch-disabled-row">
            <strong>Toggle</strong>
            <Switch aria-label="Disabled toggle off" disabled />
            <Switch aria-label="Disabled toggle on" defaultChecked disabled />
          </div>
          <div className="switch-disabled-row">
            <strong>Fader</strong>
            <Switch aria-label="Disabled fader off" appearance="fader" disabled />
            <Switch aria-label="Disabled fader on" appearance="fader" defaultChecked disabled />
          </div>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Switch V1.0.0</span>
        <span>Primitive · Tokens · Metadata</span>
      </footer>
    </div>
  );
}

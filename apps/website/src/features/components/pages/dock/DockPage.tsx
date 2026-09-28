import './DockPage.scss';

import { Dock } from '@virgo-design/ui';
import { dockMetadata } from '@virgo-design/ui/metadata';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { dockExamples } from '@/examples/components/dock/examples';

function DockHero() {
  return (
    <Dock.Boundary className="hero-stage dock-hero-stage">
      <Dock.Root defaultPlacement={{ edge: 'top', position: 0.5 }}>
        <Dock.Handle aria-label="Move reference dock" />
        <Dock.Content>
          <span className="dock-hero-chip">Dock</span>
        </Dock.Content>
      </Dock.Root>
    </Dock.Boundary>
  );
}

export function DockPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board dock-review" id="dock-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 36</span>
              <span className="version-badge">STABLE · V1.3.0</span>
            </div>
            <h1>{dockMetadata.name}</h1>
            <p>{dockMetadata.description}</p>
            <dl className="component-facts">
              <div>
                <dt>Edges</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>Positioning</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>Orientations</dt>
                <dd>02</dd>
              </div>
              <div>
                <dt>Storage</dt>
                <dd>02</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>top · 12 snap divisions</code>
            </div>
            <DockHero />
            <div className="specimen-caption">
              <span>Interaction chrome</span>
              <span>Snap + free placement</span>
              <span>Keyboard repositioning</span>
              <span>Start / end handle</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id="dock-controlled-placement"
          index="01"
          title="Placement control"
          description="Control top, right, bottom, and left placement from product state while pointer and keyboard interaction continue to report normalized positions."
        >
          <ComponentExample example={dockExamples.dockControlled} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="dock-free-positioning"
          index="02"
          title="Free positioning"
          description="Set snapDivisions to false for continuous normalized pointer movement, exact default positions, and 1% keyboard fine-tuning."
        >
          <ComponentExample example={dockExamples.dockFreePositioning} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="dock-persistent-placement"
          index="03"
          title="Persistent placement"
          description="Uncontrolled Dock instances can restore normalized placement from local or session storage with an explicit consumer-owned key."
        >
          <ComponentExample example={dockExamples.dockPersistence} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="dock-handle-position"
          index="04"
          title="Handle position"
          description="Dock.Handle defaults to the logical start and can move to the logical end without coupling the API to horizontal or vertical physical directions."
        >
          <ComponentExample example={dockExamples.dockHandlePosition} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="dock-lock-pin"
          index="05"
          title="Lock and pin"
          description="Every Dock includes lock and pin controls with tooltips, revealed on hover or focus. Lock prevents movement; pin keeps the dock fixed while content scrolls."
        >
          <ComponentExample example={dockExamples.dockLockPin} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Dock V1.3.0</span>
          <span>
            Boundary · Placement · Snap · Free · Persistence · Handle · Orientation · Metadata
          </span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

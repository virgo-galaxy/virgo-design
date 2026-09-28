import './DrawerPage.scss';

import { Drawer, Switch } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { drawerExamples } from '@/examples/components/drawer/examples';

export function DrawerPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board drawer-review" id="drawer-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 27</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Drawer</h1>
            <p>
              Open a temporary inspector, settings surface, or secondary workspace from any screen
              edge while retaining Dialog&apos;s interaction model.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Placements</dt>
                <dd>4</dd>
              </div>
              <div>
                <dt>Sizes</dt>
                <dd>3</dd>
              </div>
              <div>
                <dt>Default</dt>
                <dd>Right</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>placement=&quot;right&quot;</code>
            </div>
            <div className="hero-stage drawer-hero-stage">
              <Drawer.Root>
                <Drawer.Trigger>Open settings</Drawer.Trigger>
                <Drawer.Portal>
                  <Drawer.Overlay />
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>Workspace settings</Drawer.Title>
                      <Drawer.Description>
                        Configure preferences for this workspace.
                      </Drawer.Description>
                    </Drawer.Header>
                    <Drawer.Body>
                      <div className="drawer-setting-row">
                        <span>
                          <strong>Compact navigation</strong>
                          <small>Use less space for primary navigation.</small>
                        </span>
                        <Switch aria-label="Compact navigation" />
                      </div>
                    </Drawer.Body>
                    <Drawer.Footer>
                      <Drawer.Close>Cancel</Drawer.Close>
                      <Drawer.Close variant="primary">Save</Drawer.Close>
                    </Drawer.Footer>
                    <Drawer.Close />
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </div>
            <div className="specimen-caption">
              <span>Dialog behavior</span>
              <span>Edge motion</span>
              <span>Scrollable body</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'drawer-placements'}
          index={'01'}
          title={'Placements'}
          description={
            'Choose the physical screen edge that best preserves context for the underlying workspace.'
          }
        >
          <ComponentExample example={drawerExamples.drawerPlacements} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'drawer-sizes'}
          index={'02'}
          title={'Sizes'}
          description={'Size controls width for side drawers and height for top or bottom drawers.'}
        >
          <ComponentExample example={drawerExamples.drawerSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'drawer-anatomy'}
          index={'03'}
          title={'Header, body and footer'}
          description={
            'The body flexes and scrolls independently while header and action regions remain stable.'
          }
        >
          <ComponentExample example={drawerExamples.drawerAnatomy} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'drawer-form'}
          index={'04'}
          title={'Form content'}
          description={
            'Controlled state lets an application validate and save a form before closing the panel.'
          }
        >
          <ComponentExample example={drawerExamples.drawerForm} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'drawer-non-modal'}
          index={'05'}
          title={'Non-modal drawer'}
          description={
            'Use non-modal behavior when the surrounding workspace must remain directly interactive.'
          }
        >
          <ComponentExample example={drawerExamples.drawerNonModal} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Drawer V1.0.0</span>
          <span>Dialog behavior · Tokens · Motion · Accessibility</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

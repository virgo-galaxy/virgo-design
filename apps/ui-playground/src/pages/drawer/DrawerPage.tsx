import './DrawerPage.scss';

import {
  Button,
  Drawer,
  type DrawerPlacement,
  type DrawerSize,
  Input,
  Switch,
} from '@virgo-design/ui';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const placements = ['left', 'right', 'top', 'bottom'] as const satisfies readonly DrawerPlacement[];
const sizes = ['sm', 'md', 'lg'] as const satisfies readonly DrawerSize[];

function DrawerFrame({
  placement = 'right',
  size = 'md',
  title,
}: {
  placement?: DrawerPlacement;
  size?: DrawerSize;
  title: string;
}) {
  return (
    <Drawer.Root>
      <Drawer.Trigger size="small">Open {title}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay />
        <Drawer.Content placement={placement} size={size}>
          <Drawer.Header>
            <Drawer.Title>{title}</Drawer.Title>
            <Drawer.Description>
              A {size} panel entering from the {placement} edge.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>
            Drawer behavior, focus, and dismissal come directly from the Dialog primitive.
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close>Cancel</Drawer.Close>
            <Drawer.Close variant="primary">Done</Drawer.Close>
          </Drawer.Footer>
          <Drawer.Close />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export function DrawerPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('Virgo workspace');
  const [savedName, setSavedName] = useState(workspaceName);

  return (
    <div className="review-board drawer-review" id="drawer-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 19</span>
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
          </div>
        </div>
      </section>

      <ReviewSection
        id="drawer-placements"
        index="01"
        title="Placements"
        description="Choose the physical screen edge that best preserves context for the underlying workspace."
      >
        <div className="drawer-review-card">
          {placements.map((placement) => (
            <DrawerFrame key={placement} placement={placement} title={`${placement} drawer`} />
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="drawer-sizes"
        index="02"
        title="Sizes"
        description="Size controls width for side drawers and height for top or bottom drawers."
      >
        <div className="drawer-review-card">
          {sizes.map((size) => (
            <DrawerFrame key={size} size={size} title={`${size.toUpperCase()} drawer`} />
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="drawer-anatomy"
        index="03"
        title="Header, body and footer"
        description="The body flexes and scrolls independently while header and action regions remain stable."
      >
        <div className="drawer-review-card">
          <DrawerFrame placement="left" title="Inspector anatomy" />
        </div>
      </ReviewSection>

      <ReviewSection
        id="drawer-form"
        index="04"
        title="Form content"
        description="Controlled state lets an application validate and save a form before closing the panel."
      >
        <div className="drawer-review-card drawer-form-demo">
          <Drawer.Root open={formOpen} onOpenChange={setFormOpen}>
            <Drawer.Trigger>Edit workspace</Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Content size="lg">
                <Drawer.Header>
                  <Drawer.Title>Workspace details</Drawer.Title>
                  <Drawer.Description>
                    Update information shown throughout Virgo Design.
                  </Drawer.Description>
                </Drawer.Header>
                <Drawer.Body>
                  <form
                    id="drawer-workspace-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSavedName(workspaceName);
                      setFormOpen(false);
                    }}
                  >
                    <label className="drawer-demo-field">
                      Workspace name
                      <Input
                        value={workspaceName}
                        onChange={(event) => setWorkspaceName(event.target.value)}
                      />
                    </label>
                  </form>
                </Drawer.Body>
                <Drawer.Footer>
                  <Drawer.Close>Cancel</Drawer.Close>
                  <Button type="submit" form="drawer-workspace-form">
                    Save changes
                  </Button>
                </Drawer.Footer>
                <Drawer.Close />
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
          <span role="status">Workspace: {savedName}</span>
        </div>
      </ReviewSection>

      <ReviewSection
        id="drawer-non-modal"
        index="05"
        title="Non-modal drawer"
        description="Use non-modal behavior when the surrounding workspace must remain directly interactive."
      >
        <div className="drawer-review-card">
          <Drawer.Root modal={false}>
            <Drawer.Trigger>Open non-modal inspector</Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Content placement="right" size="sm">
                <Drawer.Header>
                  <Drawer.Title>Inspector</Drawer.Title>
                  <Drawer.Description>
                    The canvas remains available behind this panel.
                  </Drawer.Description>
                </Drawer.Header>
                <Drawer.Body>Inspect the current selection without a modal overlay.</Drawer.Body>
                <Drawer.Close />
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Drawer V1.0.0</span>
        <span>Dialog behavior · Tokens · Motion · Accessibility</span>
      </footer>
    </div>
  );
}

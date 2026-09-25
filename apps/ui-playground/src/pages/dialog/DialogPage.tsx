import './DialogPage.scss';

import { Button, Dialog, type DialogSize, Input } from '@virgo-design/ui';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const sizes = ['sm', 'md', 'lg'] as const satisfies readonly DialogSize[];

export function DialogPage() {
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('Virgo workspace');
  const [savedName, setSavedName] = useState(name);

  return (
    <div className="review-board dialog-review" id="dialog-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 18</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Dialog</h1>
          <p>
            Focus attention on a decision or short task with a clear title, structured content and
            predictable actions.
          </p>
          <dl className="component-facts">
            <div>
              <dt>Sizes</dt>
              <dd>3</dd>
            </div>
            <div>
              <dt>Default</dt>
              <dd>Modal</dd>
            </div>
            <div>
              <dt>Style</dt>
              <dd>Classic</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>size="md"</code>
          </div>
          <div className="hero-stage dialog-hero-stage">
            <Dialog.Root>
              <Dialog.Trigger>Open dialog</Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Invite collaborators</Dialog.Title>
                    <Dialog.Description>
                      Share this workspace with people on your team.
                    </Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Body>
                    Invitations use each collaborator&apos;s workspace email address.
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Close>Cancel</Dialog.Close>
                    <Dialog.Close variant="primary">Continue</Dialog.Close>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          <div className="specimen-caption">
            <span>Focus trapped</span>
            <span>Escape ready</span>
            <span>Theme aware</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="dialog-sizes"
        index="01"
        title="Sizes"
        description="Choose the smallest panel that comfortably fits the task. Size changes width, spacing and title hierarchy together."
      >
        <div className="dialog-review-card">
          {sizes.map((size) => (
            <Dialog.Root key={size}>
              <Dialog.Trigger size="small">Open {size}</Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content size={size}>
                  <Dialog.Header>
                    <Dialog.Title>{size.toUpperCase()} dialog</Dialog.Title>
                    <Dialog.Description>
                      A {size} Classic dialog using the shared anatomy.
                    </Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Body>Dialog content scales without changing its behavior.</Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.Close variant="primary">Done</Dialog.Close>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="dialog-form"
        index="02"
        title="Form dialog"
        description="Controlled state lets form submission close the dialog after the data has been handled."
      >
        <div className="dialog-review-card dialog-form-demo">
          <Dialog.Root open={formOpen} onOpenChange={setFormOpen}>
            <Dialog.Trigger>Edit workspace</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay />
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Workspace settings</Dialog.Title>
                  <Dialog.Description>
                    Update the name shown throughout Virgo Design.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>
                  <form
                    id="dialog-workspace-form"
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSavedName(name);
                      setFormOpen(false);
                    }}
                  >
                    <label className="dialog-demo-field">
                      Workspace name
                      <Input value={name} onChange={(event) => setName(event.target.value)} />
                    </label>
                  </form>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.Close>Cancel</Dialog.Close>
                  <Button type="submit" form="dialog-workspace-form">
                    Save changes
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <span role="status">Workspace: {savedName}</span>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Dialog V1.0.0</span>
        <span>Primitive · Tokens · Metadata · Accessibility</span>
      </footer>
    </div>
  );
}

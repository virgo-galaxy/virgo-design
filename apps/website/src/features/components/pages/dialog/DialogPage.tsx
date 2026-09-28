import './DialogPage.scss';

import { Dialog } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { dialogExamples } from '@/examples/components/dialog/examples';

export function DialogPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <article className="review-board dialog-review" id="dialog-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 26</span>
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
              <code>size=&quot;md&quot;</code>
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
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>

        <ArticleSection
          id="dialog-sizes"
          index="01"
          title="Sizes"
          description="Choose the smallest panel that comfortably fits the task. Size changes width, spacing and title hierarchy together."
        >
          <ComponentExample example={dialogExamples.sizes} showCaption={false} />
        </ArticleSection>

        <ArticleSection
          id="dialog-form"
          index="02"
          title="Form dialog"
          description="Controlled state lets form submission close the dialog after the data has been handled."
        >
          <ComponentExample example={dialogExamples.form} showCaption={false} />
        </ArticleSection>

        <footer className="review-footer">
          <span>Virgo Design UI · Dialog V1.0.0</span>
          <span>Primitive · Tokens · Metadata · Accessibility</span>
        </footer>
      </article>
    </ComponentExampleRuntimeProvider>
  );
}

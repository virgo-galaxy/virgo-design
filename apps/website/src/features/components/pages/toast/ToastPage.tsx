import './ToastPage.scss';

import { Toast } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { toastExamples } from '@/examples/components/toast/examples';

export function ToastPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board toast-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 29</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Toast</h1>
            <p>
              Brief feedback that announces itself without interrupting the current task or moving
              focus.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Placement</dt>
                <dd>06</dd>
              </div>
              <div>
                <dt>Priority</dt>
                <dd>Polite · Assertive</dd>
              </div>
              <div>
                <dt>Actions</dt>
                <dd>Optional</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>status · action · dismiss</code>
            </div>
            <div className="hero-stage toast-hero-stage">
              <Toast.Provider hotkey={[]}>
                <Toast.Root intent="success" duration={0}>
                  <Toast.Title>Document archived</Toast.Title>
                  <Toast.Description>Your document moved to the archive.</Toast.Description>
                  <Toast.Action>Undo</Toast.Action>
                  <Toast.Close />
                </Toast.Root>
                <Toast.Viewport placement="top-start" className="toast-hero-viewport" />
              </Toast.Provider>
            </div>
            <div className="specimen-caption">
              <span>Non-blocking feedback</span>
              <span>Semantic status</span>
              <span>Actionable dismissal</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'toast-status'}
          index={'01'}
          title={'Status variants'}
          description={'Each intent uses semantic status tokens and an icon from Virgo Icons.'}
        >
          <ComponentExample example={toastExamples.toastIntents} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'toast-stack'}
          index={'02'}
          title={'Action and stacking'}
          description={
            'Create several notifications. Hover or focus a toast to pause only its remaining duration.'
          }
        >
          <ComponentExample example={toastExamples.toastUndo} />
          <ComponentExample example={toastExamples.toastStack} />
        </ArticleSection>
        <ArticleSection
          id={'toast-placement'}
          index={'03'}
          title={'Viewport placement'}
          description={
            'Choose a position to show a notification inside the preview canvas. Other examples keep their own viewports and notifications.'
          }
        >
          <ComponentExample example={toastExamples.toastPlacement} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Toast V1.0.0</span>
          <span>Live region · Presence · Classic</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

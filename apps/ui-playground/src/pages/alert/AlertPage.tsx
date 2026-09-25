import './AlertPage.scss';

import { WorkspaceIcon } from '@virgo-design/icons';
import { Alert, type AlertIntent, Button } from '@virgo-design/ui';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const intents = [
  {
    intent: 'default',
    title: 'Workspace notice',
    description: 'This message remains part of the page until its owner removes it.',
  },
  {
    intent: 'info',
    title: 'New settings available',
    description: 'Review the latest workspace preferences when convenient.',
  },
  {
    intent: 'success',
    title: 'Deployment complete',
    description: 'The production workspace is running the latest version.',
  },
  {
    intent: 'warning',
    title: 'Configuration problem',
    description: 'Update the settings before the next deployment.',
  },
  {
    intent: 'error',
    title: 'Connection failed',
    description: 'Virgo could not reach the deployment service.',
  },
] as const satisfies ReadonlyArray<{
  intent: AlertIntent;
  title: string;
  description: string;
}>;

export function AlertPage() {
  const [noticeVisible, setNoticeVisible] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  return (
    <div className="review-board alert-review" id="alert-review">
      <section className="overview" id="overview" data-review-section="overview">
        <div className="overview-copy">
          <div className="eyebrow-row">
            <span>Component 17</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Alert</h1>
          <p>
            Keep page-level feedback visible in context with semantic intent, structured content,
            and application-owned actions.
          </p>
          <dl className="component-facts">
            <div>
              <dt>Intents</dt>
              <dd>5</dd>
            </div>
            <div>
              <dt>Variants</dt>
              <dd>2</dd>
            </div>
            <div>
              <dt>Default</dt>
              <dd>Soft</dd>
            </div>
          </dl>
        </div>

        <div className="hero-specimen">
          <div className="specimen-toolbar">
            <span>Reference specimen</span>
            <code>intent=&quot;warning&quot;</code>
          </div>
          <div className="hero-stage alert-hero-stage">
            <Alert intent="warning">
              <Alert.Icon />
              <Alert.Content>
                <Alert.Title>Configuration problem</Alert.Title>
                <Alert.Description>Update the settings before deploy.</Alert.Description>
              </Alert.Content>
            </Alert>
          </div>
          <div className="specimen-caption">
            <span>Persistent</span>
            <span>Inline</span>
            <span>Theme aware</span>
          </div>
        </div>
      </section>

      <ReviewSection
        id="alert-intents"
        index="01"
        title="Semantic intents"
        description="Status icons reinforce each semantic treatment without making color the only signal."
      >
        <div className="alert-stack">
          {intents.map(({ intent, title, description }) => (
            <Alert key={intent} intent={intent}>
              <Alert.Icon />
              <Alert.Content>
                <Alert.Title>{title}</Alert.Title>
                <Alert.Description>{description}</Alert.Description>
              </Alert.Content>
            </Alert>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="alert-content"
        index="02"
        title="Content structure"
        description="Use a concise title alone, or add a description when the user needs explanation or recovery guidance."
      >
        <div className="alert-stack">
          <Alert intent="success" variant="outline">
            <Alert.Icon />
            <Alert.Content>
              <Alert.Title>Changes saved</Alert.Title>
            </Alert.Content>
          </Alert>
          <Alert intent="info">
            <Alert.Icon />
            <Alert.Content>
              <Alert.Title>Scheduled maintenance</Alert.Title>
              <Alert.Description>
                Editing will be unavailable for approximately ten minutes.
              </Alert.Description>
            </Alert.Content>
          </Alert>
        </div>
      </ReviewSection>

      <ReviewSection
        id="alert-action"
        index="03"
        title="Application action"
        description="Action is a layout slot; the application supplies the control and owns its behavior."
      >
        <div className="alert-stack">
          <Alert intent="error">
            <Alert.Icon />
            <Alert.Content>
              <Alert.Title>Deployment failed</Alert.Title>
              <Alert.Description>
                Retry the request after checking the service connection.
              </Alert.Description>
            </Alert.Content>
            <Alert.Action>
              <Button size="small" variant="outline" onClick={() => setRetryCount((n) => n + 1)}>
                Retry
              </Button>
            </Alert.Action>
          </Alert>
          <span role="status">Retry requests: {retryCount}</span>
        </div>
      </ReviewSection>

      <ReviewSection
        id="alert-close"
        index="04"
        title="Closable"
        description="Close only notifies the owner. This example removes the message in application state and can restore it."
      >
        <div className="alert-stack">
          {noticeVisible ? (
            <Alert intent="info">
              <Alert.Icon />
              <Alert.Content>
                <Alert.Title>Review requested</Alert.Title>
                <Alert.Description>
                  A teammate requested feedback on this workspace.
                </Alert.Description>
              </Alert.Content>
              <Alert.Close onClick={() => setNoticeVisible(false)} />
            </Alert>
          ) : (
            <Button size="small" variant="outline" onClick={() => setNoticeVisible(true)}>
              Restore alert
            </Button>
          )}
        </div>
      </ReviewSection>

      <ReviewSection
        id="alert-custom-icon"
        index="05"
        title="Custom icon"
        description="Override the status shape for domain context while keeping intent responsible for color."
      >
        <div className="alert-stack">
          <Alert intent="info" icon={<WorkspaceIcon />}>
            <Alert.Icon />
            <Alert.Content>
              <Alert.Title>Workspace policy</Alert.Title>
              <Alert.Description>
                This project follows the shared organization retention policy.
              </Alert.Description>
            </Alert.Content>
          </Alert>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Alert V1.0.0</span>
        <span>Persistent feedback · Semantic icons · Accessible close</span>
      </footer>
    </div>
  );
}

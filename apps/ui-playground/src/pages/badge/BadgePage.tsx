import './BadgePage.scss';

import { CircleInfoIcon, UserIcon, WorkspaceIcon } from '@virgo-design/icons';
import { Badge, type BadgeIntent, Button } from '@virgo-design/ui';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const intents = [
  'default',
  'success',
  'warning',
  'danger',
  'info',
] as const satisfies readonly BadgeIntent[];

export function BadgePage() {
  const [opens, setOpens] = useState(0);

  return (
    <div className="review-board badge-review">
      <section className="badge-intro" id="overview">
        <div className="eyebrow-row">
          <span>Component 16</span>
          <span className="version-badge">STABLE · V1.0.0</span>
        </div>
        <h1>Badge</h1>
        <p>
          A small count or status marker attached to a host element, with an inline standalone form.
        </p>
      </section>

      <ReviewSection
        id="badge-counts"
        index="01"
        title="Counts and overflow"
        description="Numeric counts stay compact, cap at max, and hide zero unless showZero is explicit."
      >
        <div className="badge-stage">
          <Badge count={8}>
            <span className="badge-host">
              <WorkspaceIcon />
            </span>
          </Badge>
          <Badge count={120} max={99}>
            <span className="badge-host">
              <CircleInfoIcon />
            </span>
          </Badge>
          <Badge count={0}>
            <span className="badge-host">0 hidden</span>
          </Badge>
          <Badge count={0} showZero>
            <span className="badge-host">0 shown</span>
          </Badge>
          <Badge count="New">
            <span className="badge-host">Release</span>
          </Badge>
        </div>
      </ReviewSection>

      <ReviewSection
        id="badge-status"
        index="02"
        title="Dots and intents"
        description="Meaningful dots use an accessible label; semantic intent never depends on arbitrary colors."
      >
        <div className="badge-stage">
          {intents.map((intent) => (
            <Badge key={intent} dot intent={intent} aria-label={`${intent} status`}>
              <span className="badge-avatar">
                <UserIcon />
              </span>
            </Badge>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="badge-composition"
        index="03"
        title="Buttons, icons and standalone badges"
        description="The indicator ignores pointer events, so wrapped controls keep their normal interaction."
      >
        <div className="badge-stage badge-composition-stage">
          <Badge count={3} intent="danger">
            <Button onClick={() => setOpens((value) => value + 1)}>Inbox</Button>
          </Badge>
          <Badge dot intent="success" aria-label="Online">
            <span className="badge-avatar">
              <UserIcon />
            </span>
          </Badge>
          <span>
            Queued <Badge count={12} />
          </span>
          <span>
            Release <Badge count="New" intent="info" />
          </span>
          <span role="status">Inbox opened: {opens}</span>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Badge V1.0.0</span>
        <span>Attached status · Inline count · Classic</span>
      </footer>
    </div>
  );
}

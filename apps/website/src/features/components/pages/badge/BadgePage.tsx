import './BadgePage.scss';

import { LayoutIcon, UserIcon } from '@virgo-design/icons';
import { Badge } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { badgeExamples } from '@/examples/components/badge/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function BadgePage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board badge-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Badge</h1>
            <p>
              A small count or status marker attached to a host element, with an inline standalone
              form.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Forms</dt>
                <dd>Count</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Dot</dd>
              </div>
              <div>
                <dt>Standalone</dt>
                <dd>Inline</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>count · dot · standalone</code>
            </div>
            <div className="hero-stage">
              <div className="badge-stage badge-hero-stage">
                <Badge count={8}>
                  <span className="badge-host">
                    <LayoutIcon />
                  </span>
                </Badge>
                <Badge dot intent="success" aria-label="Online">
                  <span className="badge-avatar">
                    <UserIcon />
                  </span>
                </Badge>
                <span>
                  Release <Badge count="New" intent="info" />
                </span>
              </div>
            </div>
            <div className="specimen-caption">
              <span>Attached count</span>
              <span>Status dot</span>
              <span>Inline metadata</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'badge-counts'}
          index={'01'}
          title={'Counts and overflow'}
          description={
            'Numeric counts stay compact, cap at max, and hide zero unless showZero is explicit.'
          }
        >
          <ComponentExample example={badgeExamples.badgeCounts} />
          <ComponentExample example={badgeExamples.badgeZero} />
        </ArticleSection>
        <ArticleSection
          id={'badge-status'}
          index={'02'}
          title={'Dots and intents'}
          description={
            'Meaningful dots use an accessible label; semantic intent never depends on arbitrary colors.'
          }
        >
          <ComponentExample example={badgeExamples.badgeStatus} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'badge-composition'}
          index={'03'}
          title={'Buttons, icons and standalone badges'}
          description={
            'The indicator ignores pointer events, so wrapped controls keep their normal interaction.'
          }
        >
          <ComponentExample example={badgeExamples.badgeInteractiveHost} />
          <ComponentExample example={badgeExamples.badgeStandalone} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

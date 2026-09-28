import { CircleInfoIcon } from '@virgo-design/icons';
import { FloatingAction } from '@virgo-design/ui';
import { floatingActionMetadata } from '@virgo-design/ui/metadata';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { floatingActionExamples } from '@/examples/components/floating-action/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function FloatingActionPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board floating-action-review" id="floating-action-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>{floatingActionMetadata.name}</h1>
            <p>{floatingActionMetadata.description}</p>
            <dl className="component-facts">
              <div>
                <dt>Parts</dt>
                <dd>{String(floatingActionMetadata.anatomy.length).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>States</dt>
                <dd>{String(floatingActionMetadata.states.length).padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>Patterns</dt>
                <dd>{String(Object.keys(floatingActionExamples).length).padStart(2, '0')}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>standalone · primary</code>
            </div>
            <div className="hero-stage">
              <FloatingAction variant="primary" aria-label="Help">
                <CircleInfoIcon />
              </FloatingAction>
            </div>
            <div className="specimen-caption">
              <span>Button semantics</span>
              <span>Circular shape</span>
              <span>Token elevation</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'floating-action-basic'}
          index={'01'}
          title={'Basic'}
          description={
            'Standalone actions reuse Virgo Button variants, sizing, keyboard activation and disabled behavior.'
          }
        >
          <ComponentExample example={floatingActionExamples.floatingActionVariants} />
          <ComponentExample example={floatingActionExamples.floatingActionDisabled} />
        </ArticleSection>
        <ArticleSection
          id={'floating-action-group'}
          index={'02'}
          title={'Button and Popover composition'}
          description={
            'Group, Trigger and Content combine circular Button actions with Popover open state, focus handling and dismissal.'
          }
        >
          <ComponentExample
            example={floatingActionExamples.floatingActionGroup}
            showCaption={false}
          />
        </ArticleSection>
        <ArticleSection
          id={'floating-action-placement'}
          index={'03'}
          title={'Popover placement'}
          description={
            'Grouped actions inherit Popover placement. Standalone positioning remains the responsibility of the containing layout.'
          }
        >
          <ComponentExample
            example={floatingActionExamples.floatingActionPlacement}
            showCaption={false}
          />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

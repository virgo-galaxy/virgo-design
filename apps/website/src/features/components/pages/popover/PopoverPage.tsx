import './PopoverPage.scss';

import { Popover } from '@virgo-design/ui';
import { useState } from 'react';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { popoverExamples } from '@/examples/components/popover/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function PopoverPage() {
  const [name] = useState('Virgo workspace');
  const [savedName] = useState(name);
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board popover-review" id="popover-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Popover</h1>
            <p>
              Open a little more context, right where you need it. Details, forms and actions share
              a compact panel that stays connected to its trigger.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Content</dt>
                <dd>Flexible</dd>
              </div>
              <div>
                <dt>Triggers</dt>
                <dd>2 modes</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>Non-modal</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>contextual content</code>
            </div>
            <div className="hero-stage popover-hero-stage">
              <Popover>
                <Popover.Trigger>Workspace details</Popover.Trigger>
                <Popover.Content arrow>
                  <div className="popover-demo-content">
                    <strong>{savedName}</strong>
                    <p>A shared space for your team's designs, components and ideas.</p>
                    <Popover.Close>Got it</Popover.Close>
                  </div>
                </Popover.Content>
              </Popover>
            </div>
            <div className="specimen-caption">
              <span>Any content</span>
              <span>Keyboard ready</span>
              <span>Theme aware</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'popover-triggers'}
          index={'01'}
          title={'Click & hover'}
          description={
            'Click to focus the panel. Hover offers a quick preview without moving keyboard focus; interactive content stays open while focused.'
          }
        >
          <ComponentExample example={popoverExamples.popoverClick} />
          <ComponentExample example={popoverExamples.popoverHover} />
          <ComponentExample example={popoverExamples.popoverDisabled} />
          <ComponentExample example={popoverExamples.popoverCustomTrigger} />
        </ArticleSection>
        <ArticleSection
          id={'popover-form'}
          index={'02'}
          title={'Edit in context'}
          description={
            'A controlled panel with a real form. Save updates the workspace name and returns focus to Edit workspace.'
          }
        >
          <ComponentExample example={popoverExamples.popoverForm} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'popover-placement'}
          index={'03'}
          title={'Placement & offset'}
          description={
            'Twelve physical positions around the trigger area. Panels flip and shift at viewport edges. These examples use a 12px offset and an arrow.'
          }
        >
          <ComponentExample example={popoverExamples.popoverPlacement} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'popover-nested'}
          index={'04'}
          title={'Actions inside a panel'}
          description={
            'Open a Dropdown inside the Popover. Escape closes the menu first; selecting an action keeps the parent panel open.'
          }
        >
          <ComponentExample example={popoverExamples.popoverNestedMenu} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

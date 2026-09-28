import './TooltipPage.scss';

import { Tooltip } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { tooltipExamples } from '@/examples/components/tooltip/examples';

export function TooltipPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board tooltip-review" id="tooltip-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 24</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Tooltip</h1>
            <p>
              A little context without interrupting the flow. Hover or focus for a brief
              description, with twelve positions that stay connected to the control.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Placement</dt>
                <dd>12 positions</dd>
              </div>
              <div>
                <dt>Trigger</dt>
                <dd>Hover / focus</dd>
              </div>
              <div>
                <dt>Content</dt>
                <dd>Descriptive</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>contextual help</code>
            </div>
            <div className="hero-stage tooltip-hero-stage">
              <Tooltip>
                <Tooltip.Trigger>Hover or focus me</Tooltip.Trigger>
                <Tooltip.Content>Small details, right where you need them.</Tooltip.Content>
              </Tooltip>
            </div>
            <div className="specimen-caption">
              <span>Native actions</span>
              <span>Keyboard ready</span>
              <span>Theme aware</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'tooltip-basic'}
          index={'01'}
          title={'Hover & focus'}
          description={
            'Hover opens after a short delay. Keyboard focus opens immediately. Escape dismisses and leaves focus on the control.'
          }
        >
          <ComponentExample example={tooltipExamples.tooltipBasic} />
          <ComponentExample example={tooltipExamples.tooltipInstant} />
          <ComponentExample example={tooltipExamples.tooltipDisabled} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-smooth-transition'}
          index={'02'}
          title={'Smooth transition'}
          description={
            'Smooth transition is enabled for this example. Move between the four buttons to pass the tooltip from one control to the next without a repeated delay or fade.'
          }
        >
          <ComponentExample example={tooltipExamples.tooltipSmooth} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-placement'}
          index={'03'}
          title={'Placement & arrow'}
          description={
            'Twelve physical positions arranged around the trigger area. The arrow follows the trigger center; the panel flips and shifts at viewport edges.'
          }
        >
          <ComponentExample example={tooltipExamples.tooltipPlacement} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-tone'}
          index={'04'}
          title={'Semantic colors'}
          description={
            'Semantic tones pair solid backgrounds with on-solid foregrounds. Custom tones can set both using palette tokens.'
          }
        >
          <ComponentExample example={tooltipExamples.tooltipTones} />
          <ComponentExample example={tooltipExamples.tooltipCustomColor} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-actions'}
          index={'05'}
          title={'Real controls'}
          description={
            'Our own Settings icon and Button are used together. The tooltip describes the action; clicking still runs it. The icon button keeps its accessible name.'
          }
        >
          <ComponentExample example={tooltipExamples.tooltipAction} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-dynamic'}
          index={'06'}
          title={'Content & direction'}
          description={
            'The first description grows while open to check automatic realignment. The second uses a local RTL direction and logical start alignment.'
          }
        >
          <ComponentExample example={tooltipExamples.tooltipDynamic} />
          <ComponentExample example={tooltipExamples.tooltipDirection} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-sizes'}
          index={'07'}
          title={'Content sizes'}
          description={
            'Content size is independent of the trigger button. Medium is unchanged; small is a compact description for toolbars.'
          }
        >
          <ComponentExample example={tooltipExamples.tooltipSizes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tooltip-activation'}
          index={'08'}
          title={'Keep feedback on activation'}
          description={
            'closeOnClick=false keeps the current tooltip open during activation. Its text changes in place; Escape and leaving hover/focus still dismiss it.'
          }
        >
          <ComponentExample example={tooltipExamples.tooltipActivation} showCaption={false} />
        </ArticleSection>
        <footer className="review-footer">
          <span>Virgo Design UI · Tooltip V1.0.0</span>
          <span>Primitive · Tokens · Icons · Metadata · Accessibility</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

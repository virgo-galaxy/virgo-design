import './TagPage.scss';

import { CheckIcon, LayoutIcon } from '@virgo-design/icons';
import { Tag } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { tagExamples } from '@/examples/components/tag/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function TagPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board tag-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Tag</h1>
            <p>A compact, standalone label for classification, status and short metadata.</p>
            <dl className="component-facts">
              <div>
                <dt>Variants</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Sizes</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Behaviors</dt>
                <dd>Closable</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>semantic · icon · closable</code>
            </div>
            <div className="hero-stage">
              <div className="tag-stage">
                <Tag intent="brand">Design System</Tag>
                <Tag icon={<CheckIcon />} intent="success" variant="outline">
                  Stable
                </Tag>
                <Tag icon={<LayoutIcon />} intent="info">
                  Workspace
                </Tag>
                <Tag closable closeLabel="Remove Prototype">
                  Prototype
                </Tag>
              </div>
            </div>
            <div className="specimen-caption">
              <span>Classification</span>
              <span>Semantic color</span>
              <span>Removable metadata</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'tag-intents'}
          index={'01'}
          title={'Semantic intents'}
          description={
            'The palette follows existing Virgo brand and status tokens in light and dark themes.'
          }
        >
          <ComponentExample example={tagExamples.tagIntents} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'tag-variants'}
          index={'02'}
          title={'Variants and sizes'}
          description={'Soft, solid and outline treatments share three compact density levels.'}
        >
          <ComponentExample example={tagExamples.tagVariants} />
          <ComponentExample example={tagExamples.tagSizes} />
        </ArticleSection>
        <ArticleSection
          id={'tag-composition'}
          index={'03'}
          title={'Icons and closable collections'}
          description={
            'Icons are decorative. Close buttons notify the owner, and this demo removes the matching item in application state.'
          }
        >
          <ComponentExample example={tagExamples.tagIcons} />
          <ComponentExample example={tagExamples.tagClosable} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

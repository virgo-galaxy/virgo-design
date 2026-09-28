import './SkeletonPage.scss';

import { Skeleton } from '@virgo-design/ui';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { skeletonExamples } from '@/examples/components/skeleton/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function SkeletonPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board skeleton-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Skeleton</h1>
            <p>Visual content placeholders that preserve layout while real content loads.</p>
            <dl className="component-facts">
              <div>
                <dt>Shapes</dt>
                <dd>Text · Block · Circle</dd>
              </div>
              <div>
                <dt>Motion</dt>
                <dd>Optional</dd>
              </div>
              <div>
                <dt>Purpose</dt>
                <dd>Layout preservation</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>card placeholder · animated</code>
            </div>
            <div className="hero-stage">
              <div className="skeleton-card" aria-label="Loading card preview" aria-busy="true">
                <Skeleton style={{ height: 144 }} />
                <div className="skeleton-card-copy">
                  <Skeleton variant="text" style={{ width: '72%' }} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" style={{ width: '84%' }} />
                </div>
              </div>
            </div>
            <div className="specimen-caption">
              <span>Predictable dimensions</span>
              <span>Content loading</span>
              <span>Reduced-motion aware</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'skeleton-variants'}
          index={'01'}
          title={'Text, rectangle, and circle'}
          description={
            'A small set of shapes covers text lines, media blocks, and avatar placeholders.'
          }
        >
          <ComponentExample example={skeletonExamples.skeletonShapes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'skeleton-card'}
          index={'02'}
          title={'Card placeholder'}
          description={'Native dimensions and normal layout composition keep the API predictable.'}
        >
          <ComponentExample example={skeletonExamples.skeletonCard} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'skeleton-motion'}
          index={'03'}
          title={'Motion control'}
          description={
            'Pulse is enabled by default, can be disabled, and stops for reduced-motion preferences.'
          }
        >
          <ComponentExample example={skeletonExamples.skeletonMotion} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

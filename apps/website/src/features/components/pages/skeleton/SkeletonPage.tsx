import './SkeletonPage.scss';

import { Skeleton } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { skeletonExamples } from '@/examples/components/skeleton/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function SkeletonPage() {
  const { t } = useTranslation();

  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board skeleton-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Skeleton</h1>
            <p>{t('components.skeleton.overview.description')}</p>
            <dl className="component-facts">
              <div>
                <dt>{t('components.skeleton.facts.shapes')}</dt>
                <dd>{t('components.skeleton.facts.textBlockCircle')}</dd>
              </div>
              <div>
                <dt>{t('components.skeleton.facts.motion')}</dt>
                <dd>{t('components.skeleton.facts.optional')}</dd>
              </div>
              <div>
                <dt>{t('components.skeleton.facts.purpose')}</dt>
                <dd>{t('components.skeleton.facts.layoutPreservation')}</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.skeleton.specimen.referenceSpecimen')}</span>
              <code>{t('components.skeleton.specimen.summary')}</code>
            </div>
            <div className="hero-stage">
              <div
                className="skeleton-card"
                aria-label={t('examples.skeleton.copy.loadingCardPreview')}
                aria-busy="true"
              >
                <Skeleton style={{ height: 144 }} />
                <div className="skeleton-card-copy">
                  <Skeleton variant="text" style={{ width: '72%' }} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" style={{ width: '84%' }} />
                </div>
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.skeleton.specimen.predictableDimensions')}</span>
              <span>{t('components.skeleton.specimen.contentLoading')}</span>
              <span>{t('components.skeleton.specimen.reducedMotionAware')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'skeleton-variants'}
          index={'01'}
          title={t('components.skeleton.variants.title')}
          description={t('components.skeleton.variants.description')}
        >
          <ComponentExample example={skeletonExamples.skeletonShapes} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'skeleton-card'}
          index={'02'}
          title={t('components.skeleton.card.title')}
          description={t('components.skeleton.card.description')}
        >
          <ComponentExample example={skeletonExamples.skeletonCard} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'skeleton-motion'}
          index={'03'}
          title={t('components.skeleton.motion.title')}
          description={t('components.skeleton.motion.description')}
        >
          <ComponentExample example={skeletonExamples.skeletonMotion} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

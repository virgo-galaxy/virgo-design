import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { timelineExamples } from '@/examples/components/timeline/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './TimelinePage.module.scss';
export function TimelinePage() {
  const { t } = useTranslation();
  const Reference = timelineExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['review-board', styles.board].join(' ')}>
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Timeline</h1>
            <p>{t('components.timeline.overview.description')}</p>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.timeline.specimen.referenceSpecimen')}</span>
              <code>Timeline</code>
            </div>
            <div className="hero-stage">
              <div className={styles.specimen}>
                <Reference />
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.timeline.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id="timeline-1"
          index="01"
          title={t('examples.timeline.copy.title0')}
          description={t('examples.timeline.copy.description0')}
        >
          <ComponentExample example={timelineExamples.example0} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="timeline-2"
          index="02"
          title={t('examples.timeline.copy.title1')}
          description={t('examples.timeline.copy.description1')}
        >
          <ComponentExample example={timelineExamples.example1} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

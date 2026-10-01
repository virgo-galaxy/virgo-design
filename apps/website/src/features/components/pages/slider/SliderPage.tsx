import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { sliderExamples } from '@/examples/components/slider/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';
import styles from './SliderPage.module.scss';
export function SliderPage() {
  const { t } = useTranslation();
  const Reference = sliderExamples.example0.Component;
  return (
    <ComponentExampleRuntimeProvider>
      <div className={['review-board', styles.board].join(' ')}>
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Slider</h1>
            <p>{t('components.slider.overview.description')}</p>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>{t('components.slider.specimen.referenceSpecimen')}</span>
              <code>Slider</code>
            </div>
            <div className="hero-stage">
              <div className={styles.specimen}>
                <Reference />
              </div>
            </div>
            <div className="specimen-caption">
              <span>{t('components.slider.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id="slider-1"
          index="01"
          title={t('examples.slider.copy.title0')}
          description={t('examples.slider.copy.description0')}
        >
          <ComponentExample example={sliderExamples.example0} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id="slider-2"
          index="02"
          title={t('examples.slider.copy.title1')}
          description={t('examples.slider.copy.description1')}
        >
          <ComponentExample example={sliderExamples.example1} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

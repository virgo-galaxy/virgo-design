import { useTranslation } from 'react-i18next';

import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { ReferenceSpecimen } from '@/components/docs/ReferenceSpecimen';
import { carouselExamples } from '@/examples/components/carousel/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function CarouselPage() {
  const { t } = useTranslation();
  const Reference = carouselExamples.example0.Component;

  return (
    <ComponentExampleRuntimeProvider>
      <div className="component-page">
        <section className="overview" id="overview" data-docs-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Carousel</h1>
            <p>{t('components.carousel.overview.description')}</p>
          </div>
          <ReferenceSpecimen>
            <ReferenceSpecimen.Toolbar>
              <span>{t('components.carousel.specimen.referenceSpecimen')}</span>
              <code>Carousel</code>
            </ReferenceSpecimen.Toolbar>
            <ReferenceSpecimen.Stage>
              <div className="hero-content">
                <Reference />
              </div>
            </ReferenceSpecimen.Stage>
            <ReferenceSpecimen.Caption>
              <span>{t('components.carousel.specimen.contract')}</span>
              <ComponentExampleRuntimeControl />
            </ReferenceSpecimen.Caption>
          </ReferenceSpecimen>
        </section>
        <ArticleSection
          id="carousel-1"
          index="01"
          title={t('examples.carousel.copy.title0')}
          description={t('examples.carousel.copy.description0')}
        >
          <ComponentExample example={carouselExamples.example0} showCaption={false} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}

import { Carousel, useCarouselState } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function CarouselExample() {
  const { t } = useTranslation();

  return (
    <Carousel
      count={2}
      aria-label={t('primitives.catalogue.names.carousel')}
      data-docs-primitive="carousel"
    >
      <Carousel.Viewport>
        <Carousel.Track>
          <Carousel.Item index={0}>{t('primitives.examples.headlessByDefault')}</Carousel.Item>
          <Carousel.Item index={1}>{t('primitives.examples.projectName')}</Carousel.Item>
        </Carousel.Track>
      </Carousel.Viewport>
      <CarouselNavigation />
    </Carousel>
  );
}

function CarouselNavigation() {
  const state = useCarouselState();
  const { t } = useTranslation();

  return (
    <>
      <button type="button" disabled={!state.canPrevious} onClick={state.previous}>
        {t('primitives.examples.previousSlide')}
      </button>
      <button type="button" disabled={!state.canNext} onClick={state.next}>
        {t('primitives.examples.nextSlide')}
      </button>
    </>
  );
}

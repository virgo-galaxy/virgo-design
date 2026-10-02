import { Carousel, Input, Surface, Tag } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import styles from './CarouselContentExample.module.scss';

export default function CarouselContentExample() {
  const { t } = useTranslation();
  return (
    <div className={styles.examples}>
      <Carousel
        count={3}
        loop
        autoPlay
        interval={4000}
        aria-label={t('examples.carousel.copy.highlights')}
      >
        <Carousel.Viewport>
          <Carousel.Track>
            {[0, 1, 2].map((index) => (
              <Carousel.Item key={index} index={index}>
                <Surface border="subtle" radius={8} className={styles.banner} data-slide={index}>
                  <Tag size="sm">0{index + 1}</Tag>
                  <h3>{t('examples.carousel.copy.highlightTitle')}</h3>
                  <p>{t('examples.carousel.copy.highlightBody')}</p>
                </Surface>
              </Carousel.Item>
            ))}
          </Carousel.Track>
        </Carousel.Viewport>
        <div className={styles.controls}>
          <Carousel.Indicators
            getSlideLabel={(index) => t('examples.carousel.copy.slide', { index: index + 1 })}
          />
          <Carousel.Playback />
        </div>
      </Carousel>
      <Carousel
        count={2}
        wheel
        arrows="always"
        stackBelow={600}
        aria-label={t('examples.carousel.copy.editor')}
      >
        <Carousel.Viewport>
          <Carousel.Track>
            {[0, 1].map((index) => (
              <Carousel.Item key={index} index={index}>
                <Surface border="default" radius={8} className={styles.editor}>
                  <h3>
                    {t(
                      index === 0
                        ? 'examples.carousel.copy.project'
                        : 'examples.carousel.copy.team',
                    )}
                  </h3>
                  <Input
                    aria-label={t('examples.carousel.copy.draft', { index: index + 1 })}
                    defaultValue={t('examples.carousel.copy.initialDraft')}
                  />
                  <p>{t('examples.carousel.copy.preserved')}</p>
                </Surface>
              </Carousel.Item>
            ))}
          </Carousel.Track>
        </Carousel.Viewport>
        <Carousel.Indicators
          variant="bar"
          getSlideLabel={(index) => t('examples.carousel.copy.slide', { index: index + 1 })}
        />
      </Carousel>
    </div>
  );
}

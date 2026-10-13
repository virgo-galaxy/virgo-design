import { Carousel } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { workplaceImages } from '../presentation/workplace-images';
import styles from './WorkspaceCarousel.module.scss';

export function WorkspaceCarousel() {
  const { t } = useTranslation();
  return (
    <Carousel
      size="medium"
      count={workplaceImages.length}
      loop
      autoPlay
      interval={6000}
      arrows="hover"
      aria-label={t('workplace.workspaceInspiration')}
      className={styles.carousel}
    >
      <Carousel.Viewport className={styles.viewport}>
        <Carousel.Track>
          {workplaceImages.map((image, index) => (
            <Carousel.Item key={image.id} index={index}>
              <img
                src={image.src}
                alt={t(`workplace.imageAlts.${image.id}`)}
                width={960}
                height={640}
                loading="lazy"
                draggable={false}
              />
            </Carousel.Item>
          ))}
        </Carousel.Track>
        <Carousel.Indicators variant="bar" placement="inside" className={styles.indicator} />
      </Carousel.Viewport>
    </Carousel>
  );
}

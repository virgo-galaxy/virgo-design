import { Carousel } from '@virgo-design/ui';

import { workplaceImages } from '@/data/workplace-images';

import styles from './WorkspaceCarousel.module.scss';

export function WorkspaceCarousel() {
  return (
    <Carousel
      count={workplaceImages.length}
      loop
      autoPlay
      interval={6000}
      arrows="hover"
      aria-label="Workspace inspiration"
      className={styles.carousel}
    >
      <Carousel.Viewport className={styles.viewport}>
        <Carousel.Track>
          {workplaceImages.map((image, index) => (
            <Carousel.Item key={image.id} index={index}>
              <img
                src={image.src}
                alt={image.alt}
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

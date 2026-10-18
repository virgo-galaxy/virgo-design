import { Carousel } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';

import { workplaceImages } from '../presentation/workplace-images';

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
      className={[
        '[--carousel-control-background:rgb(0_0_0_/_45%)] [--carousel-control-background-hover:rgb(0_0_0_/_60%)]',
        '[--carousel-control-border:rgb(255_255_255_/_70%)] [--carousel-control-foreground:var(--vd-color-white,_#fff)]',
      ].join(' ')}
    >
      <Carousel.Viewport className="[border-radius:var(--vd-shape-radius-8,_var(--vd-radius-8))] [&_img]:block [&_img]:w-full [&_img]:[height:160px] [&_img]:object-cover [&_img]:select-none">
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
        <Carousel.Indicators
          variant="bar"
          placement="inside"
          className="[--carousel-indicator-width:88px] [--carousel-indicator-color:var(--vd-color-white,_#fff)] [--carousel-indicator-background:rgb(255_255_255_/_35%)]"
        />
      </Carousel.Viewport>
    </Carousel>
  );
}

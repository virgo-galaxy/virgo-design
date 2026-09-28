import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_PATHS } from '@/shared/routes/route-config';

import { createBrandTimeline } from './brand-motion';
import styles from './virgo-brand.module.scss';
import { VirgoMark } from './VirgoMark';

gsap.registerPlugin(useGSAP);

export interface VirgoBrandProps {
  className?: string | undefined;
}

export function VirgoBrand({ className }: VirgoBrandProps) {
  const root = useRef<HTMLAnchorElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const hasCompletedIntro = useRef(false);

  useGSAP(
    () => {
      const element = root.current;
      if (!element || typeof window.matchMedia !== 'function') return;

      const media = gsap.matchMedia();
      media.add(
        { motionAllowed: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 1181px)' },
        (context) => {
          if (!context.conditions?.motionAllowed) return;
          const timeline = createBrandTimeline(element);
          animation.current = timeline;
          if (!hasCompletedIntro.current) {
            timeline.eventCallback('onComplete', () => {
              hasCompletedIntro.current = true;
            });
            timeline.delay(0.25).play();
          }
          return () => {
            animation.current = null;
          };
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );

  // Reuse one timeline: entering again during playback never stacks animations.
  const replay = () => {
    const timeline = animation.current;
    if (timeline && !timeline.isActive()) timeline.restart();
  };

  return (
    <Link
      ref={root}
      className={`${styles.brand}${className ? ` ${className}` : ''}`}
      to={ROUTE_PATHS.root}
      aria-label="Virgo Design"
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') replay();
      }}
      onFocus={replay}
    >
      <VirgoMark />
      <span className={styles.name} data-brand-name="">
        <span data-brand-label="">Virgo Design</span>
        <span className={styles.sheen} data-brand-sheen="" aria-hidden="true">
          Virgo Design
        </span>
        <span className={styles.letters} data-brand-letters="" aria-hidden="true">
          {Array.from('Virgo Design').map((letter, index) => (
            <span className={styles.letter} data-brand-letter="" key={index}>
              {letter}
            </span>
          ))}
        </span>
        <span className={styles.dust} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((index) => (
            <i
              className={styles.particle}
              data-brand-dust=""
              key={index}
              style={{ left: `${12 + index * 18}%` }}
            />
          ))}
        </span>
      </span>
    </Link>
  );
}

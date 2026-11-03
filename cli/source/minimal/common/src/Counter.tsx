import { Button } from '@virgo-design/ui';
import { useCallback, useEffect, useRef, useState } from 'react';

import * as styles from './classes';

const tuckedWing = 'rotate(-24deg) scale(0.72)';

export function Counter() {
  const [count, setCount] = useState(0);
  const character = useRef<SVGSVGElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const jump = useCallback(() => {
    setCount((current) => current + 1);
    const sprite = character.current;
    if (!sprite || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const jumps = sprite.getAnimations();
    const spritePosition = getComputedStyle(sprite).transform;
    const boost = jumps.length > 0;
    for (const animation of jumps) animation.cancel();

    sprite.animate(
      [
        { transform: spritePosition, easing: 'ease-out' },
        { transform: `translateY(${boost ? -31 : -27}px)`, offset: 0.44, easing: 'ease-in' },
        { transform: 'translateY(0)' },
      ],
      340,
    );
    for (const wing of sprite.querySelectorAll<SVGPathElement>('[data-wing]')) {
      const position = getComputedStyle(wing).transform;
      for (const animation of wing.getAnimations()) animation.cancel();
      wing.animate(
        [
          { transform: position },
          { transform: 'rotate(20deg) scale(1)', offset: 0.23 },
          { transform: 'rotate(-12deg) scale(0.9)', offset: 0.48 },
          { transform: 'rotate(16deg) scale(1)', offset: 0.72 },
          { transform: tuckedWing },
        ],
        { duration: 340, easing: 'ease-in-out' },
      );
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const space = event.code === 'Space' || event.key === ' ';
      if (
        (!space && event.key !== 'ArrowUp') ||
        event.defaultPrevented ||
        event.isComposing ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return;

      const target = event.target;
      if (target instanceof HTMLElement) {
        if (target === button.current && space) return;
        if (
          target !== button.current &&
          (target.isContentEditable ||
            target.closest(
              'button, input, select, textarea, a[href], [role="button"], [role="textbox"]',
            ))
        )
          return;
      }
      event.preventDefault();
      if (!event.repeat) jump();
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [jump]);

  return (
    <div className={styles.counter}>
      <div aria-hidden="true" className={styles.stage}>
        <svg
          ref={character}
          className={styles.sprite}
          shapeRendering="crispEdges"
          viewBox="-6 -1 28 18"
        >
          {[false, true].map((mirrored) => (
            <g
              key={String(mirrored)}
              transform={mirrored ? 'translate(16 0) scale(-1 1)' : undefined}
            >
              <path
                data-wing
                d="M5 11H1v-1H0V8h-2V6h-2V3h2v1h2v1h2v2h2v2h1z"
                fill="#fff"
                stroke="#a3afc5"
                strokeWidth=".45"
                style={{
                  transform: tuckedWing,
                  transformBox: 'fill-box',
                  transformOrigin: 'right bottom',
                }}
              />
            </g>
          ))}
          <path fill="#0647ca" d="M5 1h6v1h2v7H3V2h2z" />
          <path fill="#0062ff" d="M4 2h8v6H4zM4 9h8v4H4zM3 10h1v2H3zM12 10h1v2h-1z" />
          <path fill="#ffd5a5" d="M5 4h6v4H5zM3 12h1v1H3zM12 12h1v1h-1z" />
          <path fill="#202538" d="M6 5h1v1H6zM9 5h1v1H9zM5 13h2v2H4v-1h1zM9 13h2v1h1v1H9z" />
          <path fill="#bcd6ff" d="M7 9h2v1H7zM7 11h2v1H7z" />
        </svg>
      </div>
      <Button ref={button} type="button" onClick={jump}>
        Count is {count}
      </Button>
      <p className={styles.hint}>
        Press <kbd className={styles.keycap}>Space</kbd> or{' '}
        <kbd className={styles.keycap} aria-label="Up Arrow">
          ↑
        </kbd>{' '}
        to jump.
      </p>
    </div>
  );
}

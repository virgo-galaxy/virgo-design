import { ChevronsDownIcon } from '@virgo-design/icons';

import styles from './scroll-cue.module.scss';

export interface ScrollCueProps {
  targetId: string;
  ariaLabel: string;
  visible?: boolean;
}

export function ScrollCue({ targetId, ariaLabel, visible = true }: ScrollCueProps) {
  const scrollToTarget = () => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <button
      className={`${styles.scrollCue} ${visible ? styles.visible : ''}`}
      type="button"
      aria-label={ariaLabel}
      onClick={scrollToTarget}
    >
      <ChevronsDownIcon size={24} aria-hidden="true" />
    </button>
  );
}

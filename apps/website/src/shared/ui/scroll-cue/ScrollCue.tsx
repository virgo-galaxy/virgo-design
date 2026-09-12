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
      <svg viewBox="0 0 32 46" aria-hidden="true">
        <path d="M7 7L16 16L25 7" />
        <path d="M7 17L16 26L25 17" />
        <path d="M7 27L16 36L25 27" />
      </svg>
    </button>
  );
}

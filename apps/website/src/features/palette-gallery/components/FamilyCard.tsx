import type { FoundationGroupId } from '@/domain/foundation-colors';

import styles from '../styles/palette-gallery.module.scss';

interface FamilyCardProps {
  groupId: FoundationGroupId;
  label: string;
  base: string;
  index: number;
  progress: number;
  exitProgress: number;
  active: boolean;
  onSelect: () => void;
}

export function FamilyCard({
  groupId,
  label,
  base,
  index,
  progress,
  exitProgress,
  active,
  onSelect,
}: FamilyCardProps) {
  const row = Math.floor(index / 4);
  const column = index % 4;
  const remaining = 1 - progress;

  const initialX = (1.5 - column) * 155;
  const initialY = (1.15 - row) * 108;

  const rotateY = (index % 2 === 0 ? 1 : -1) * (360 + (index % 3) * 72) * remaining;
  const rotateX = ((index % 3) - 1) * 18 * remaining - exitProgress * (3 + row * 0.8);
  const rotateZ = ((index % 5) - 2) * 7 * remaining + (column - 1.5) * exitProgress * 1.6;
  const scale = (0.52 + progress * 0.48) * (1 - exitProgress * 0.055);
  const exitY = -exitProgress * (10 + row * 4);
  const opacity = (0.12 + progress * 0.88) * (1 - exitProgress * 0.68);

  const transform = [
    `translate3d(${initialX * remaining}px, ${initialY * remaining + exitY}px, 0)`,
    `rotateY(${rotateY}deg)`,
    `rotateX(${rotateX}deg)`,
    `rotateZ(${rotateZ}deg)`,
    `scale(${scale})`,
  ].join(' ');

  return (
    <button
      className={`${styles.familyCard} ${active ? styles.familyCardActive : ''}`}
      type="button"
      style={{ opacity, transform }}
      data-foundation={groupId}
      onClick={onSelect}
    >
      <span
        className={styles.familyCardColor}
        style={{
          backgroundColor: base,
        }}
      />

      <span className={styles.familyCardMeta}>
        <strong>{label}</strong>
        <code>{base.toUpperCase()}</code>
      </span>
    </button>
  );
}

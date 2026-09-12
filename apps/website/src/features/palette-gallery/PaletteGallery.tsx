import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { FoundationGroup, FoundationGroupId } from '@/domain/foundation-colors';
import { useSectionMotion } from '@/shared/hooks/use-section-motion';
import type { Appearance } from '@/shared/theme/types';
import { ScrollCue } from '@/shared/ui/scroll-cue/ScrollCue';

import { FamilyCard } from './components/FamilyCard';
import { FamilyDetail } from './components/FamilyDetail';
import styles from './styles/palette-gallery.module.scss';

interface PaletteGalleryProps {
  groups: readonly FoundationGroup[];
  appearance: Appearance;
  selectedFoundation: FoundationGroupId;
  onSelectedFoundationChange: (foundation: FoundationGroupId) => void;
}

export function PaletteGallery({
  groups,
  appearance,
  selectedFoundation,
  onSelectedFoundationChange,
}: PaletteGalleryProps) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const motion = useSectionMotion(sectionRef, 'sticky');

  const selected = useMemo(
    () => groups.find((group) => group.id === selectedFoundation) ?? groups[0],
    [groups, selectedFoundation],
  );

  if (!selected) {
    return null;
  }

  const labelFor = (group: FoundationGroup) => {
    if (group.id === 'brand') {
      return t('foundations.brand');
    }

    if (group.id === 'neutral') {
      return t('foundations.neutral');
    }

    return t(`families.${group.id}`);
  };

  const headerOpacity = (0.35 + motion.enter * 0.65) * (1 - motion.exit * 0.78);
  const headerY = (1 - motion.enter) * 28 - motion.exit * 18;
  const layoutY = motion.exit * -18;
  const layoutScale = 1 - motion.exit * 0.028;

  return (
    <section
      ref={sectionRef}
      id="palette-gallery"
      className={styles.gallery}
      data-theme={appearance}
    >
      <div className={styles.stickyScene}>
        <div className={styles.galleryShell}>
          <header
            className={styles.galleryHeader}
            style={{
              opacity: headerOpacity,
              transform: `translate3d(0, ${headerY}px, 0) scale(${1 - motion.exit * 0.012})`,
            }}
          >
            <div>
              <div className={styles.eyebrow}>{t('gallery.eyebrow')}</div>
              <h2>{t('gallery.title')}</h2>
              <p>{t('gallery.description')}</p>
            </div>
          </header>

          <div
            className={styles.galleryLayout}
            style={{
              opacity: 1 - motion.exit * 0.22,
              transform: `translate3d(0, ${layoutY}px, 0) scale(${layoutScale})`,
            }}
          >
            <div className={styles.cardStage} aria-label={t('gallery.colorFamilies')}>
              {groups.map((group, index) => (
                <FamilyCard
                  key={group.id}
                  groupId={group.id}
                  label={labelFor(group)}
                  base={group.base}
                  index={index}
                  progress={motion.enter}
                  exitProgress={motion.exit}
                  active={group.id === selectedFoundation}
                  onSelect={() => onSelectedFoundationChange(group.id)}
                />
              ))}
            </div>

            <FamilyDetail
              groupId={selected.id}
              kind={selected.kind}
              label={labelFor(selected)}
              base={selected.base}
              scale={selected.scale}
              progress={motion.enter}
              exitProgress={motion.exit}
            />
          </div>
        </div>

        <ScrollCue
          targetId="theme-builder"
          ariaLabel={t('common.buildTheme')}
          visible={motion.enter >= 0.82 && motion.exit < 0.08}
        />
      </div>
    </section>
  );
}

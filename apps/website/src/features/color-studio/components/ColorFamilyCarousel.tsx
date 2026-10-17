import { CHROMATIC_FAMILIES, type ColorFamily, type ColorFamilyBases } from '@virgo-design/colors';
import { Button } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../styles/color-studio.module.scss';

interface ColorFamilyCarouselProps {
  bases: ColorFamilyBases;
  selectedFamily: ColorFamily;
  onSelectedFamilyChange: (family: ColorFamily) => void;
}

const CAROUSEL_COPIES = [0, 1] as const;

export function ColorFamilyCarousel({
  bases,
  selectedFamily,
  onSelectedFamilyChange,
}: ColorFamilyCarouselProps) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const paused = hovered || focused;

  return (
    <div className={styles.familyCarousel}>
      <div
        className={styles.familyCarouselViewport}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocused(false);
          }
        }}
      >
        <div
          className={`${styles.familyCarouselTrack} ${
            paused ? styles.familyCarouselTrackPaused : ''
          }`}
        >
          {CAROUSEL_COPIES.map((copyIndex) => (
            <div
              className={styles.familyCarouselSet}
              key={copyIndex}
              aria-hidden={copyIndex === 1 ? true : undefined}
            >
              {CHROMATIC_FAMILIES.map((family) => {
                const selected = family === selectedFamily;

                return (
                  <Button
                    variant="text"
                    key={`${copyIndex}-${family}`}
                    className={`${styles.familyItem} ${selected ? styles.familyItemSelected : ''}`}
                    type="button"
                    tabIndex={copyIndex === 1 ? -1 : 0}
                    onClick={() => onSelectedFamilyChange(family)}
                  >
                    <span
                      className={styles.familyColor}
                      style={{
                        backgroundColor: bases[family],
                      }}
                    />

                    <span className={styles.familyName}>
                      {t(`foundations.paletteGallery.families.${family}`)}
                    </span>
                    <code>{bases[family].toUpperCase()}</code>
                  </Button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

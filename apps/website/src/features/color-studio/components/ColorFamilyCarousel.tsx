import { COLOR_FAMILIES, type ColorFamily, type ColorFamilyBases } from '@virgo-design/colors';
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
  const [paused, setPaused] = useState(false);

  return (
    <div className={styles.familyCarousel}>
      <div
        className={styles.familyCarouselViewport}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPaused(false);
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
              {COLOR_FAMILIES.map((family) => {
                const selected = family === selectedFamily;

                return (
                  <button
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
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

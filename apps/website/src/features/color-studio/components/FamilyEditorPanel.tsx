import { COLOR_FAMILIES, type ColorFamily, type ColorFamilyBases } from '@virgo-design/colors';
import { Input } from '@virgo-design/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from '../styles/color-studio.module.scss';

const HEX_PATTERN = /^#[0-9a-fA-F]{6}$/;

interface FamilyHexInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function FamilyHexInput({ label, value, onChange }: FamilyHexInputProps) {
  const [draft, setDraft] = useState(value.toUpperCase());

  useEffect(() => {
    setDraft(value.toUpperCase());
  }, [value]);

  const commit = () => {
    if (HEX_PATTERN.test(draft)) {
      onChange(draft.toUpperCase());
      return;
    }

    setDraft(value.toUpperCase());
  };

  return (
    <Input
      rootClassName={styles.familyInputFrame!}
      aria-label={label}
      className={styles.familyEditorInput!}
      value={draft}
      spellCheck={false}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.currentTarget.blur();
        }

        if (event.key === 'Escape') {
          setDraft(value.toUpperCase());
          event.currentTarget.blur();
        }
      }}
    />
  );
}

interface FamilyEditorPanelProps {
  active: boolean;
  bases: ColorFamilyBases;
  selectedFamily: ColorFamily;
  onChange: (family: ColorFamily, value: string) => void;
  onSelect: (family: ColorFamily) => void;
}

export function FamilyEditorPanel({
  active,
  bases,
  selectedFamily,
  onChange,
  onSelect,
}: FamilyEditorPanelProps) {
  const { t } = useTranslation();

  return (
    <aside
      className={`${styles.familyEditorPanel!} ${active ? styles.familyEditorPanelActive! : ''}`}
      aria-label={t('foundations.colorStudio.settings.familyEditorTitle')}
      aria-hidden={!active}
      inert={!active}
    >
      <header className={styles.familyEditorHeader!}>
        <span className={styles.panelEyebrow!}>
          {t('foundations.colorStudio.settings.familyEditorEyebrow')}
        </span>

        <h2>{t('foundations.colorStudio.settings.familyEditorTitle')}</h2>

        <p>{t('foundations.colorStudio.settings.familyEditorDescription')}</p>
      </header>

      <div className={styles.familyEditorList!}>
        {COLOR_FAMILIES.map((family, index) => {
          const selected = family === selectedFamily;

          return (
            <div
              key={family}
              className={`${styles.familyEditorRow!} ${
                selected ? styles.familyEditorRowActive! : ''
              }`}
              style={{
                transitionDelay: active ? `${80 + index * 24}ms` : '0ms',
              }}
              onPointerDownCapture={() => onSelect(family)}
              onFocusCapture={() => onSelect(family)}
            >
              <span className={styles.familyEditorName!}>
                {t(`foundations.paletteGallery.families.${family}`)}
              </span>

              <span
                className={styles.familyEditorColor!}
                style={{
                  backgroundColor: bases[family],
                }}
                aria-hidden="true"
              />

              <FamilyHexInput
                label={t(`foundations.paletteGallery.families.${family}`)}
                value={bases[family]}
                onChange={(value) => onChange(family, value)}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
}

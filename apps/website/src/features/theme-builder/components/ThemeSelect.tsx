import { useEffect, useMemo, useRef, useState } from 'react';

import styles from '../theme-builder.module.scss';

export interface ThemeSelectOption<T extends string | number> {
  value: T;
  label: string;
  color?: string;
}

interface ThemeSelectProps<T extends string | number> {
  value: T;
  options: readonly ThemeSelectOption<T>[];
  ariaLabel: string;
  compact?: boolean;
  onChange: (value: T) => void;
}

export function ThemeSelect<T extends string | number>({
  value,
  options,
  ariaLabel,
  compact = false,
  onChange,
}: ThemeSelectProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => options.find((option) => option.value === value) ?? options[0],
    [options, value],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (!rootRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  if (!selected) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className={`${styles.themeSelect} ${open ? styles.themeSelectOpen : ''} ${
        compact ? styles.themeSelectCompact : ''
      }`}
    >
      <button
        className={styles.themeSelectTrigger}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={styles.themeSelectValue}>
          {selected.color ? (
            <span
              className={styles.themeSelectSwatch}
              style={{ backgroundColor: selected.color }}
              aria-hidden="true"
            />
          ) : null}

          <span>{selected.label}</span>
        </span>

        <svg className={styles.themeSelectChevron} viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 4.5 6 7.5 9 4.5" />
        </svg>
      </button>

      {open ? (
        <div className={styles.themeSelectMenu} role="listbox" aria-label={ariaLabel}>
          {options.map((option) => {
            const active = option.value === value;

            return (
              <button
                key={String(option.value)}
                className={`${styles.themeSelectOption} ${
                  active ? styles.themeSelectOptionActive : ''
                }`}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span className={styles.themeSelectOptionValue}>
                  {option.color ? (
                    <span
                      className={styles.themeSelectOptionSwatch}
                      style={{ backgroundColor: option.color }}
                      aria-hidden="true"
                    />
                  ) : null}

                  <span>{option.label}</span>
                </span>

                {active ? (
                  <svg className={styles.themeSelectCheck} viewBox="0 0 14 14" aria-hidden="true">
                    <path d="m3 7.2 2.4 2.4L11 4.5" />
                  </svg>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

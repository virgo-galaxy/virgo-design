import './IconSelect.scss';

import { type ComponentType, useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type IconRenderer = ComponentType<{
  'aria-hidden'?: boolean | 'true';
  size?: number;
}>;

export type IconSelectOption = {
  Icon: IconRenderer;
  id: string;
  label: string;
};

type IconSelectProps = {
  onChange: (iconId: string) => void;
  options: readonly IconSelectOption[];
  value: string;
};

export function IconSelect({ onChange, options, value }: IconSelectProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const selectedIcon = options.find((icon) => icon.id === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsidePointerDown);

    return () => document.removeEventListener('pointerdown', closeOnOutsidePointerDown);
  }, [isOpen]);

  if (selectedIcon === undefined) {
    return null;
  }

  const SelectedIcon = selectedIcon.Icon;

  return (
    <div className="icon-select" ref={rootRef}>
      <span className="icon-select__label" id={`${menuId}-label`}>
        {t('foundations.icons.icon')}
      </span>
      <button
        aria-controls={isOpen ? menuId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={`${menuId}-label ${menuId}-value`}
        className="icon-select__trigger"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setIsOpen(false);
          }
        }}
        type="button"
      >
        <SelectedIcon aria-hidden="true" size={16} />
        <span id={`${menuId}-value`}>{selectedIcon.label}</span>
        <span aria-hidden="true" className="icon-select__indicator" />
      </button>

      {isOpen ? (
        <div
          aria-labelledby={`${menuId}-label`}
          className="icon-select__menu"
          id={menuId}
          role="listbox"
        >
          {options.map((option) => {
            const OptionIcon = option.Icon;
            const isSelected = option.id === selectedIcon.id;

            return (
              <button
                aria-selected={isSelected}
                className="icon-select__option"
                key={option.id}
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                role="option"
                type="button"
              >
                <OptionIcon aria-hidden="true" size={16} />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

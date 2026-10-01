import './IconSelect.scss';

import { Select } from '@virgo-design/ui';
import { type ComponentType, useId } from 'react';
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
  const labelId = useId();
  const selectedIcon = options.find((icon) => icon.id === value) ?? options[0];
  if (!selectedIcon) return null;
  const SelectedIcon = selectedIcon.Icon;

  return (
    <Select className="icon-select" value={selectedIcon.id} onValueChange={onChange}>
      <span className="icon-select__label" id={`${labelId}-label`}>
        {t('icons.icon')}
      </span>
      <Select.Trigger
        aria-labelledby={`${labelId}-label ${labelId}-value`}
        className="icon-select__trigger"
        indicator={<span className="icon-select__indicator" />}
        renderValue={() => (
          <>
            <SelectedIcon aria-hidden="true" size={16} />
            <span id={`${labelId}-value`}>{selectedIcon.label}</span>
          </>
        )}
      ></Select.Trigger>
      <Select.Content className="icon-select__menu">
        {options.map((option) => {
          const OptionIcon = option.Icon;
          return (
            <Select.Option className="icon-select__option" key={option.id} value={option.id}>
              <OptionIcon aria-hidden="true" size={16} />
              <span>{option.label}</span>
            </Select.Option>
          );
        })}
      </Select.Content>
    </Select>
  );
}

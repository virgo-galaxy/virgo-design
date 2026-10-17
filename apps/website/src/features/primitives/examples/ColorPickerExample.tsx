import { ColorPicker } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function ColorPickerExample() {
  const { t } = useTranslation();

  return (
    <ColorPicker data-docs-primitive="color-picker">
      <ColorPicker.Input aria-label={t('examples.colorPicker.copy.label')} />
      <ColorPicker.Swatch value="#1a5cff" />
    </ColorPicker>
  );
}

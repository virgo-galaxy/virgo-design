import { Slider } from '@virgo-design/primitives';
import { useTranslation } from 'react-i18next';

export function SliderExample() {
  const { t } = useTranslation();

  return (
    <Slider
      data-docs-primitive="slider"
      aria-label={t('examples.slider.copy.label')}
      defaultValue={40}
    />
  );
}

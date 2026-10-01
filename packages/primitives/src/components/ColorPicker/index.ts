import {
  ColorPicker as Root,
  ColorPickerInput,
  ColorPickerPreview,
  ColorPickerSwatch,
} from './ColorPicker';
export const ColorPicker = Object.assign(Root, {
  Root,
  Input: ColorPickerInput,
  Swatch: ColorPickerSwatch,
  Preview: ColorPickerPreview,
});
export type {
  ColorPickerInputProps,
  ColorPickerPreviewProps,
  ColorPickerProps,
  ColorPickerSwatchProps,
} from './ColorPicker.types';

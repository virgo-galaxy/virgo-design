import {
  ColorPicker as Root,
  ColorPickerArea,
  ColorPickerChannelField,
  ColorPickerContent,
  ColorPickerHexField,
  ColorPickerHue,
  ColorPickerInput,
  ColorPickerPreview,
  ColorPickerSwatch,
  ColorPickerTrigger,
} from './ColorPicker';
export const ColorPicker = Object.assign(Root, {
  Root,
  Area: ColorPickerArea,
  ChannelField: ColorPickerChannelField,
  Content: ColorPickerContent,
  HexField: ColorPickerHexField,
  Hue: ColorPickerHue,
  Trigger: ColorPickerTrigger,

  Input: ColorPickerInput,
  Swatch: ColorPickerSwatch,
  Preview: ColorPickerPreview,
});
export type {
  ColorPickerAreaProps,
  ColorPickerChannelFieldProps,
  ColorPickerContentProps,
  ColorPickerHexFieldProps,
  ColorPickerHueProps,
  ColorPickerInputProps,
  ColorPickerPreviewProps,
  ColorPickerProps,
  ColorPickerSwatchProps,
  ColorPickerTriggerProps,
} from './ColorPicker.types';

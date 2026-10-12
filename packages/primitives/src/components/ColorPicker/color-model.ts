export const isColor = (value: string) => /^#[0-9a-f]{6}(?:[0-9a-f]{2})?$/i.test(value);
export const normalizeColor = (value: string) => (isColor(value) ? value.toLowerCase() : '#000000');
export const clamp = (value: number, max: number) => Math.min(max, Math.max(0, value));
export function colorToAlpha(value: string) {
  const color = normalizeColor(value);
  return color.length === 9 ? parseInt(color.slice(7), 16) : 255;
}
export function withAlpha(value: string, alpha: number) {
  const color = normalizeColor(value).slice(0, 7);
  const byte = Math.round(clamp(alpha, 255));
  return color + (byte === 255 ? '' : byte.toString(16).padStart(2, '0'));
}
export function colorToRgb(value: string) {
  const hex = normalizeColor(value).slice(1);
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}
export function rgbToColor(rgb: { r: number; g: number; b: number }) {
  return (
    '#' +
    [rgb.r, rgb.g, rgb.b]
      .map((v) => Math.round(clamp(v, 255)).toString(16).padStart(2, '0'))
      .join('')
  );
}
export function colorToHsv(value: string) {
  const rgb = colorToRgb(value);
  const r = rgb.r / 255,
    g = rgb.g / 255,
    b = rgb.b / 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b),
    delta = max - min;
  let h = 0;
  if (delta) {
    h = max === r ? (g - b) / delta : max === g ? 2 + (b - r) / delta : 4 + (r - g) / delta;
    h = (h * 60 + 360) % 360;
  }
  return { h, s: max ? (delta / max) * 100 : 0, v: max * 100 };
}
export function hsvToColor({ h, s, v }: { h: number; s: number; v: number }) {
  const chroma = ((v / 100) * s) / 100,
    x = chroma * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = v / 100 - chroma;
  const channels =
    h < 60
      ? [chroma, x, 0]
      : h < 120
        ? [x, chroma, 0]
        : h < 180
          ? [0, chroma, x]
          : h < 240
            ? [0, x, chroma]
            : h < 300
              ? [x, 0, chroma]
              : [chroma, 0, x];
  return rgbToColor({
    r: (channels[0]! + m) * 255,
    g: (channels[1]! + m) * 255,
    b: (channels[2]! + m) * 255,
  });
}

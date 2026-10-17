export interface OklchColor {
  l: number;
  c: number;
  h: number;
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function srgbToLinear(value: number) {
  const channel = value / 255;

  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(value: number) {
  const channel = value <= 0.0031308 ? 12.92 * value : 1.055 * value ** (1 / 2.4) - 0.055;

  return clamp(channel, 0, 1);
}

function parseHex(hex: string): RgbColor {
  const normalized = hex.trim().replace(/^#/, '');

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    throw new Error(`Expected a six-digit HEX color, received "${hex}".`);
  }

  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function rgbToHex(color: RgbColor) {
  const toHex = (value: number) =>
    Math.round(clamp(value, 0, 255))
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

export function normalizeHex(hex: string) {
  const color = parseHex(hex);

  return rgbToHex(color);
}

export function hexToOklch(hex: string): OklchColor {
  const rgb = parseHex(hex);

  const r = srgbToLinear(rgb.r);
  const g = srgbToLinear(rgb.g);
  const b = srgbToLinear(rgb.b);

  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const lRoot = Math.cbrt(l);
  const mRoot = Math.cbrt(m);
  const sRoot = Math.cbrt(s);

  const lightness = 0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot;
  const a = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot;
  const labB = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot;

  const chroma = Math.sqrt(a * a + labB * labB);

  let hue = (Math.atan2(labB, a) * 180) / Math.PI;

  if (hue < 0) {
    hue += 360;
  }

  return {
    l: lightness,
    c: chroma,
    h: hue,
  };
}

function oklchToLinearRgb(color: OklchColor) {
  const hue = (color.h * Math.PI) / 180;

  const a = color.c * Math.cos(hue);
  const labB = color.c * Math.sin(hue);

  const lRoot = color.l + 0.3963377774 * a + 0.2158037573 * labB;
  const mRoot = color.l - 0.1055613458 * a - 0.0638541728 * labB;
  const sRoot = color.l - 0.0894841775 * a - 1.291485548 * labB;

  const l = lRoot ** 3;
  const m = mRoot ** 3;
  const s = sRoot ** 3;

  return {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  };
}

function isInSrgbGamut(color: OklchColor) {
  const rgb = oklchToLinearRgb(color);

  return rgb.r >= 0 && rgb.r <= 1 && rgb.g >= 0 && rgb.g <= 1 && rgb.b >= 0 && rgb.b <= 1;
}

function fitToSrgb(color: OklchColor): OklchColor {
  if (isInSrgbGamut(color)) {
    return color;
  }

  let low = 0;
  let high = color.c;

  for (let index = 0; index < 24; index += 1) {
    const chroma = (low + high) / 2;

    const candidate: OklchColor = {
      ...color,
      c: chroma,
    };

    if (isInSrgbGamut(candidate)) {
      low = chroma;
    } else {
      high = chroma;
    }
  }

  return {
    ...color,
    c: low,
  };
}

export function oklchToHex(color: OklchColor) {
  const fitted = fitToSrgb(color);
  const rgb = oklchToLinearRgb(fitted);

  return rgbToHex({
    r: linearToSrgb(rgb.r) * 255,
    g: linearToSrgb(rgb.g) * 255,
    b: linearToSrgb(rgb.b) * 255,
  });
}

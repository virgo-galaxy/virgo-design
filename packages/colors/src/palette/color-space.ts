export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

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

interface LinearRgbColor {
  r: number;
  g: number;
  b: number;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function normalizeHue(value: number): number {
  return ((value % 360) + 360) % 360;
}

export function normalizeHex(value: string): string {
  let hex = value.trim().replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((character) => `${character}${character}`)
      .join('');
  }

  if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error(`Invalid HEX color: ${value}`);
  }

  return `#${hex.toUpperCase()}`;
}

function hexToRgb(value: string): RgbColor {
  const hex = normalizeHex(value).slice(1);

  return {
    r: Number.parseInt(hex.slice(0, 2), 16) / 255,
    g: Number.parseInt(hex.slice(2, 4), 16) / 255,
    b: Number.parseInt(hex.slice(4, 6), 16) / 255,
  };
}

function rgbToHex({ r, g, b }: RgbColor): string {
  const channel = (value: number) =>
    Math.round(clamp01(value) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase();
}

export function hexToHsl(value: string): HslColor {
  const { r, g, b } = hexToRgb(value);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  const l = (max + min) / 2;

  if (delta === 0) {
    return { h: 0, s: 0, l };
  }

  const s = delta / (1 - Math.abs(2 * l - 1));

  let h: number;

  if (max === r) {
    h = 60 * (((g - b) / delta) % 6);
  } else if (max === g) {
    h = 60 * ((b - r) / delta + 2);
  } else {
    h = 60 * ((r - g) / delta + 4);
  }

  return {
    h: normalizeHue(h),
    s,
    l,
  };
}

export function hslToHex({ h, s, l }: HslColor): string {
  const hue = normalizeHue(h);
  const saturation = clamp01(s);
  const lightness = clamp01(l);

  const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = lightness - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (hue < 60) {
    r = c;
    g = x;
  } else if (hue < 120) {
    r = x;
    g = c;
  } else if (hue < 180) {
    g = c;
    b = x;
  } else if (hue < 240) {
    g = x;
    b = c;
  } else if (hue < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return rgbToHex({
    r: r + m,
    g: g + m,
    b: b + m,
  });
}

export function hexToHsv(value: string): HsvColor {
  const { r, g, b } = hexToRgb(value);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === r) {
      h = 60 * (((g - b) / delta) % 6);
    } else if (max === g) {
      h = 60 * ((b - r) / delta + 2);
    } else {
      h = 60 * ((r - g) / delta + 4);
    }
  }

  return {
    h: normalizeHue(h),
    s: max === 0 ? 0 : delta / max,
    v: max,
  };
}

export function hsvToHex({ h, s, v }: HsvColor): string {
  const hue = normalizeHue(h);
  const saturation = clamp01(s);
  const value = clamp01(v);

  const c = value * saturation;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = value - c;

  let r = 0;
  let g = 0;
  let b = 0;

  if (hue < 60) {
    r = c;
    g = x;
  } else if (hue < 120) {
    r = x;
    g = c;
  } else if (hue < 180) {
    g = c;
    b = x;
  } else if (hue < 240) {
    g = x;
    b = c;
  } else if (hue < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }

  return rgbToHex({
    r: r + m,
    g: g + m,
    b: b + m,
  });
}

function srgbToLinear(value: number): number {
  if (value <= 0.04045) {
    return value / 12.92;
  }

  return ((value + 0.055) / 1.055) ** 2.4;
}

function linearToSrgb(value: number): number {
  if (value <= 0.0031308) {
    return 12.92 * value;
  }

  return 1.055 * value ** (1 / 2.4) - 0.055;
}

export function hexToOklch(value: string): OklchColor {
  const rgb = hexToRgb(value);

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

  return {
    l: lightness,
    c: Math.sqrt(a * a + labB * labB),
    h: normalizeHue((Math.atan2(labB, a) * 180) / Math.PI),
  };
}

function oklchToLinearRgb({ l, c, h }: OklchColor): LinearRgbColor {
  const radians = (normalizeHue(h) * Math.PI) / 180;
  const a = c * Math.cos(radians);
  const labB = c * Math.sin(radians);

  const lRoot = l + 0.3963377774 * a + 0.2158037573 * labB;
  const mRoot = l - 0.1055613458 * a - 0.0638541728 * labB;
  const sRoot = l - 0.0894841775 * a - 1.291485548 * labB;

  const linearL = lRoot ** 3;
  const linearM = mRoot ** 3;
  const linearS = sRoot ** 3;

  return {
    r: 4.0767416621 * linearL - 3.3077115913 * linearM + 0.2309699292 * linearS,
    g: -1.2684380046 * linearL + 2.6097574011 * linearM - 0.3413193965 * linearS,
    b: -0.0041960863 * linearL - 0.7034186147 * linearM + 1.707614701 * linearS,
  };
}

function isInSrgbGamut(rgb: LinearRgbColor): boolean {
  return rgb.r >= 0 && rgb.r <= 1 && rgb.g >= 0 && rgb.g <= 1 && rgb.b >= 0 && rgb.b <= 1;
}

export function oklchToHex(color: OklchColor): string {
  const normalized: OklchColor = {
    l: clamp01(color.l),
    c: Math.max(0, color.c),
    h: normalizeHue(color.h),
  };

  let linear = oklchToLinearRgb(normalized);

  if (!isInSrgbGamut(linear)) {
    let low = 0;
    let high = normalized.c;

    for (let index = 0; index < 24; index += 1) {
      const candidateChroma = (low + high) / 2;
      const candidate: OklchColor = {
        ...normalized,
        c: candidateChroma,
      };

      const candidateRgb = oklchToLinearRgb(candidate);

      if (isInSrgbGamut(candidateRgb)) {
        low = candidateChroma;
        linear = candidateRgb;
      } else {
        high = candidateChroma;
      }
    }
  }

  return rgbToHex({
    r: linearToSrgb(linear.r),
    g: linearToSrgb(linear.g),
    b: linearToSrgb(linear.b),
  });
}

const MAX_OKLCH_CHROMA = 0.5;

export function findMaxOklchChroma(lightness: number, hue: number): number {
  const l = clamp01(lightness);
  const h = normalizeHue(hue);

  let low = 0;
  let high = MAX_OKLCH_CHROMA;

  for (let index = 0; index < 18; index += 1) {
    const chroma = (low + high) / 2;

    const rgb = oklchToLinearRgb({
      l,
      c: chroma,
      h,
    });

    if (isInSrgbGamut(rgb)) {
      low = chroma;
    } else {
      high = chroma;
    }
  }

  return low;
}

export function findPeakOklchLightness(hue: number): number {
  const h = normalizeHue(hue);

  const minimumLightness = 0.18;
  const maximumLightness = 0.96;
  const samples = 24;
  const step = (maximumLightness - minimumLightness) / samples;

  let bestLightness = 0.6;
  let bestChroma = -1;

  for (let index = 0; index <= samples; index += 1) {
    const lightness = minimumLightness + step * index;

    const chroma = findMaxOklchChroma(lightness, h);

    if (chroma > bestChroma) {
      bestChroma = chroma;
      bestLightness = lightness;
    }
  }

  let low = Math.max(minimumLightness, bestLightness - step);

  let high = Math.min(maximumLightness, bestLightness + step);

  for (let index = 0; index < 5; index += 1) {
    const left = low + (high - low) / 3;

    const right = high - (high - low) / 3;

    const leftChroma = findMaxOklchChroma(left, h);

    const rightChroma = findMaxOklchChroma(right, h);

    if (leftChroma < rightChroma) {
      low = left;
    } else {
      high = right;
    }
  }

  return (low + high) / 2;
}

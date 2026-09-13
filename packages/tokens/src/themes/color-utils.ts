export function withAlpha(hex: string, alpha: number): string {
  const normalized = hex.replace('#', '');

  if (!/^[\da-f]{6}$/i.test(normalized)) {
    throw new Error(`Expected a six-digit hex color, received: ${hex}`);
  }

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgb(${red} ${green} ${blue} / ${alpha})`;
}

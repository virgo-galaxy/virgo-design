/** WCAG relative luminance for opaque sRGB hex tokens. Unsupported formats are not graded. */
export function contrastRatio(background: string, foreground: string): number | null {
  function luminance(value: string) {
    if (!/^#[\da-f]{6}$/i.test(value)) return null;
    const channels = [1, 3, 5].map((offset) => {
      const channel = Number.parseInt(value.slice(offset, offset + 2), 16) / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return channels.reduce(
      (total, channel, index) => total + channel * ([0.2126, 0.7152, 0.0722][index] ?? 0),
      0,
    );
  }
  const a = luminance(background);
  const b = luminance(foreground);
  if (a === null || b === null) return null;
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

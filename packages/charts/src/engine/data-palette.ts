/** Resolve formal data colors in full ECharts options, preserving non-color data and objects. */
export function mapDataPaletteColors<T>(value: T, resolve: (color: string) => string): T {
  if (typeof value === 'string' && /^var\(--(?:vd-data-|chart-series-)/.test(value))
    return resolve(value) as T;
  if (Array.isArray(value)) {
    const next = value.map((item) => mapDataPaletteColors(item, resolve));
    return (next.some((item, index) => item !== value[index]) ? next : value) as T;
  }
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    const entries = Object.entries(value).map(
      ([key, item]) => [key, mapDataPaletteColors(item, resolve)] as const,
    );
    return (
      entries.some(([key, item]) => item !== (value as Record<string, unknown>)[key])
        ? Object.fromEntries(entries)
        : value
    ) as T;
  }
  return value;
}

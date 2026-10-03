export function linear(domain: readonly [number, number], range: readonly [number, number]) {
  const span = domain[1] - domain[0];
  return (value: number) =>
    range[0] + (span ? (value - domain[0]) / span : 0.5) * (range[1] - range[0]);
}
export type Point = readonly [number, number];
const round = (n: number) => Number(n.toFixed(3));
export function linePath(points: readonly (Point | null)[]) {
  let d = '',
    last: Point | null = null;
  for (const point of points) {
    if (!point) {
      last = null;
      continue;
    }
    const [x, y] = point;
    if (!last) d += `M${round(x)},${round(y)}`;
    else d += `L${round(x)},${round(y)}`;
    last = point;
  }
  return d;
}
export function areaPath(points: readonly (Point | null)[], baseline: number) {
  const segments: Point[][] = [[]];
  for (const point of points) {
    if (point) segments.at(-1)!.push(point);
    else if (segments.at(-1)!.length) segments.push([]);
  }
  return segments
    .filter((s) => s.length)
    .map(
      (s) =>
        `${linePath(s)}L${round(s.at(-1)![0])},${round(baseline)}L${round(s[0]![0])},${round(baseline)}Z`,
    )
    .join('');
}

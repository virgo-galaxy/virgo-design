export function createMockTaskId(sequence: number): string {
  const first = (Math.imul(sequence, 0x9e3779b1) >>> 0).toString(16).padStart(8, '0');
  const second = (Math.imul(sequence, 0x85ebca6b) >>> 16).toString(16).padStart(4, '0');

  return `${first}-${second}`;
}

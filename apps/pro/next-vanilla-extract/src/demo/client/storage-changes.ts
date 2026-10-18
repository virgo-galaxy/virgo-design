import { isRecord } from '@/lib/validation/is-record';

const areas = ['tasks', 'catalog', 'profile', 'workflows', 'notifications'] as const;

export type DemoChanges = Record<(typeof areas)[number], boolean>;

export const demoChangeKey = 'virgo-pro.demo-change';

export function readDemoChanges(raw: string | null): DemoChanges | undefined {
  try {
    const value: unknown = JSON.parse(raw ?? 'null');
    if (isRecord(value) && isRecord(value.changes)) {
      const changes = value.changes;
      if (areas.every((area) => typeof changes[area] === 'boolean'))
        return Object.fromEntries(areas.map((area) => [area, changes[area]])) as DemoChanges;
    }
  } catch {}
  return undefined;
}

export function changesFromHeader(header: string): DemoChanges {
  const changed = new Set(header.split(','));
  return Object.fromEntries(areas.map((area) => [area, changed.has(area)])) as DemoChanges;
}

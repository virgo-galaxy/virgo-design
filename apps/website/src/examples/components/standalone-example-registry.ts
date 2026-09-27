import type { ComponentType } from 'react';

type StandaloneExampleModule = { default: ComponentType };

const modules = import.meta.glob<StandaloneExampleModule>('./*/*Example.tsx');

function exampleIdFromPath(path: string) {
  const fileName = path
    .slice(path.lastIndexOf('/') + 1)
    .replace(/\.tsx$/, '')
    .replace(/Example$/, '');

  return fileName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const loaders = new Map(
  Object.entries(modules).map(([path, load]) => [exampleIdFromPath(path), load] as const),
);

export const standaloneExampleIds = new Set(loaders.keys());

export async function loadStandaloneExample(exampleId: string) {
  const load = loaders.get(exampleId);
  if (!load) return undefined;
  const module = await load();
  return module.default;
}

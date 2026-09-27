import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

type ExampleManifestModule = Record<string, Readonly<Record<string, ComponentExampleDefinition>>>;

const manifests = import.meta.glob<ExampleManifestModule>('./*/examples.ts', { eager: true });

const definitions = Object.values(manifests).flatMap((module) =>
  Object.values(module).flatMap((examples) => Object.values(examples)),
);

export const componentExampleRegistry = new Map(
  definitions.map((definition) => [definition.id, definition] as const),
);

export function getComponentExample(exampleId: string) {
  return componentExampleRegistry.get(exampleId);
}

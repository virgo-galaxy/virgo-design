import type { ApiReferenceRegistry } from '@/components/docs/ApiReference';

export type ApiDescriptionResources = Record<string, { api: Record<string, string> }>;

// English descriptions come directly from generated canonical JSDoc metadata.
export function collectApiDescriptionResources(
  registry: ApiReferenceRegistry,
): ApiDescriptionResources {
  return Object.fromEntries(
    Object.entries(registry).map(([slug, document]) => [
      slug,
      {
        api: Object.fromEntries(
          document.declarations
            .flatMap((declaration) => [declaration, ...declaration.properties])
            .filter((entry) => entry.description.trim())
            .map((entry) => [
              entry.descriptionTranslationKey.split('.api.')[1]!,
              entry.description,
            ]),
        ),
      },
    ]),
  );
}

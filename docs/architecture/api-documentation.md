# API documentation generation

Website API references are generated from the public TypeScript surfaces in
`@virgo-design/ui` and `@virgo-design/primitives`. The
[generator](../../scripts/generate-api-docs.mjs) owns API facts; Website owns their presentation.

## Canonical source

Public `*.types.ts` files and their English JSDoc define prop names, required state, signatures,
descriptions and `@default` values. Update those declarations when an API changes. Do not maintain
handwritten prop tables in architecture documents or edit generated output directly.

React/DOM inherited attributes remain in the exported signature but are omitted from property rows.
Virgo-specific inherited primitive props are included. Component and Primitive detail routes render
their own generated registry through the shared `ApiReference` component.

## Workflow

After changing public types or JSDoc, run from the repository root:

```bash
pnpm gen:api-docs
pnpm check:api-docs
```

The generator writes these files under `apps/website/src/generated/`:

| File                                     | Purpose                                  |
| ---------------------------------------- | ---------------------------------------- |
| `component-api-reference.generated.ts`   | UI declaration and property facts        |
| `primitive-api-reference.generated.ts`   | Primitive declaration and property facts |
| `api-description-resources.generated.ts` | Lean English description resources       |
| `api-reference.generated.ts`             | Re-export barrel for the fact registries |

Commit regenerated output with its source change. If generated imports or output structure need
to change, update the generator and regenerate. `pnpm check:api-docs` compares every output with
canonical source without rewriting it; `pnpm all` includes this check.

## Localization

Generated declarations and properties carry stable `descriptionTranslationKey` values in
`components.<slug>.api.*` or `primitives.<slug>.api.*`. English descriptions come from canonical
JSDoc. Co-located Website Chinese resources override those keys without creating another API
registry or adding Chinese JSDoc to package source.

Changing only a Chinese description does not require regeneration. Changing public API facts or
English JSDoc does. `ApiReference` resolves translated descriptions and falls back to generated
English text. The description-resource equivalence test guards agreement with the full registries.

## Loading and presentation

The i18n registry imports lean description resources and Chinese overrides. Detail features import
their own fact registry, keeping full signatures and declaration metadata out of the initial
translation bundle.

Surface owns declaration frames; Table owns table semantics, internal separators and a named
scroll viewport. Website styles own content geometry and typography. Presentation changes do not
change API facts or require another generator. See [Website maintenance](website-maintenance.md)
for composition and example ownership.

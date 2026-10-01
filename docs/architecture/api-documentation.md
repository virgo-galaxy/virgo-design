# API documentation

Virgo Design API reference is generated from the public TypeScript surfaces in
`@virgo-design/ui` and `@virgo-design/primitives`.

## Source of truth

Public `*.types.ts` files are the source of truth for prop names, required state, type signatures,
JSDoc descriptions, and `@default` values. Component and primitive documentation should not keep a
second handwritten prop table.

Generated declarations and properties also carry a stable `descriptionTranslationKey` under the
corresponding `components.<slug>.api.*` or `primitives.<slug>.api.*` domain. `ApiReference` asks the
default translation tree for that key and falls back to the generated English JSDoc description.
The generator therefore remains the source of API facts while a business-owned locale can override
only the description text.

Adding or changing a locale override does not require generation. Add the same key structure to the
module's canonical English locale and its `zh-CN` locale, then change the localized string. Changes
to the public API or its JSDoc still require regeneration. Do not add Chinese JSDoc to package
sources or generate separate English and Chinese API registries.

The generator intentionally omits React and DOM inherited attributes from property rows. Their
heritage remains visible in the exported type signature, while Virgo-specific inherited props from
`@virgo-design/primitives` are included.

## Generate

```bash
pnpm gen:api-docs
```

This writes:

```text
apps/website/src/generated/api-reference.generated.ts
```

Do not edit the generated file by hand.

## Verify

```bash
pnpm check:api-docs
```

`pnpm all` runs this check before typecheck, lint, tests, and build so API reference data cannot drift
silently after a public type change.

## Rendering

`ApiReference` is shared by the website documentation surfaces:

- every Components detail route renders the `@virgo-design/ui` API after its examples;
- every Primitives detail route renders the `@virgo-design/primitives` API while retaining its
  compact public-export summary.

The reference uses Virgo Table, which preserves native HTML table semantics and a named scroll
viewport. This presentation is independent of the generated API model.

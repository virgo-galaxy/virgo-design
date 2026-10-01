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

Changing a Chinese description override does not require generation. English API descriptions
are generated from canonical JSDoc; co-located `zh-CN` files override the generated keys. Changes
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
apps/website/src/generated/api-reference.generated.ts              # compatibility barrel
apps/website/src/generated/component-api-reference.generated.ts  # UI facts
apps/website/src/generated/primitive-api-reference.generated.ts  # primitive facts
apps/website/src/generated/api-description-resources.generated.ts # English description text
```

Do not edit generated files by hand. The i18n registry imports only the lean English description
resources and business-owned Chinese overrides. UI and primitive detail features import their
own fact registry. This avoids pulling types, default values and full declaration metadata into
the initial translation bundle. The equivalence test checks every generated English description
against the canonical full registry; the check command validates all four outputs.

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

Declaration and public-type frames use Virgo Surface (`tone="default"`, `border="subtle"`,
`radius={12}`). Explicit named regions preserve their accessible section semantics without adding
wrappers or changing Surface's neutral default. Surface owns the fill, outer border and radius;
Website owns content layout and overflow clipping.

Inside each declaration, Virgo Table preserves native table semantics and a named scroll viewport.
`border="separators"` supplies internal row rules without duplicating Surface's outer edge.
Column ratios, code typography, content padding and dividers between title/signature/table regions
remain Website composition styles. This presentation is independent of the generated API model.

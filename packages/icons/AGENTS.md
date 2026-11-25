# Virgo Design icons

## Visual style

- Use clean, geometric silhouettes. Small chamfers give suitable UI icons a subtle cyber-inspired
  style. Match the depth and angle of cuts on comparable corners and check them at 16 px.
- Preserve the defining contours of globe arcs and glyphs such as Japanese `の`. Use a chamfer
  only where it preserves the shape's identity and readability.
- Keep the original contours and proportions of recognizable brand marks such as Apple, X and
  the Twitter bird. Limit geometry changes to uniform scaling and positioning. Reserve Virgo
  chamfers for suitable UI geometry.
- Edit monochrome SVG sources in `icons/`. Use a `0 0 24 24` viewBox and filled paths with
  `currentColor`. Keep transforms, fixed colors and motion out of those source SVGs. Use
  `brands/` and `artwork/` for full-color assets, preserving the original colors and proportions.

## Size and alignment

- At 24 px, aim for a longest visible edge of 18–21 px for ordinary controls and about 2 units
  of line weight. Chevrons, dots, bars and resize marks can use smaller bounds. Compare perceived
  weight and centering with adjacent icons.
- Match the outline and filled versions' outer contours, width, height and placement within
  about 0.5 units where the silhouette is meant to stay the same. Check state pairs such as
  sun/moon and open/closed eye in the same button. Keep toolbar hit areas and hover footprints
  consistent separately from icon geometry.

## Variants and motion

- Use one family ID for an icon's variants. Usually make an outline and a filled version. Keep
  a single variant for simple line marks, such as a minus or a chevron, and for marks with one
  recognizable treatment.
- Add motion when it helps show direction, state or feedback. Static icons are valid, and
  animated icons render statically by default. Define motion in `scripts/animations.ts` and
  keep motion support and behavior consistent across the family's variants.

## Catalogue

- Update `metadata.json` with family, variant, category, search terms and animation support.
  Use the existing category that best describes the icon's primary purpose, shared across its
  variants. Add a category when it represents a distinct, recurring use that the current
  categories handle poorly. Update the catalogue's English and Chinese labels and search terms.
- Review `relatedGroups` in the [website catalogue](../../apps/website/src/features/icons/related.ts).
  Group family IDs by a strong relationship, such as shared purpose, neighboring states or
  equivalent actions. Category and visual similarity alone are weak signals. Use smaller groups
  and keep only meaningful recommendations.
- Adding an icon to the manifest makes it searchable. Adding its family to a related group
  makes it a candidate in both directions. Each page ranks its candidates and shows up to six.
  Check the new icon and the affected existing detail pages so important relationships appear
  in both directions.

## Verify

- Review the icons at 16, 20 and 24 px on light and dark backgrounds. Check meaningful gaps,
  line weight, alignment and any animated and static states.
- Run `pnpm gen:icons` and `pnpm check:icons` from the repo root. Check the catalogue's
  search, category, variants and related icons for the families changed.

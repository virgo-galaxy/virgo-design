# @virgo-design/icons

## 0.1.3

### Patch Changes

- 5f1d4b2: Add `XTwitterIcon` and `TwitterIcon` as static brand icons.
- 95bc341: Add the repository's `packages/icons/AGENTS.md` guide for icon style, sizing, variants, motion, categories, and related icons.
- 5f1d4b2: Match the outline and filled pause silhouettes, balance the moon and settings icon sizes, center the closed-eye variants, and scale down the Traditional Chinese glyph.

## 0.1.2

### Patch Changes

- 78a03d1: Expand the icon catalogue and update its metadata.

  - Add the `MonitorPlugIcon`, `NetworkNeighborhoodIcon`, `CloudIcon`, `FolderIcon`, and `UsersIcon` families with outline and filled variants. Both monitor plug variants support the `animated` prop.
  - Add `ClockFilledIcon`, `FileTextFilledIcon`, `AppleIcon`, `WindowsIcon`, `LinuxIcon`, `LanguageJaIcon`, `LanguageKoIcon`, and `LanguageTwIcon`.
  - Add `files` and `people` to `IconCategory` and update categories for several existing families. If you map every category in TypeScript, add entries for the new categories. Recheck any category filters that depend on the previous assignments.

## 0.1.1

### Patch Changes

- Align the package version with the Virgo Design `0.1.1` release. No package-specific API changes.

## 0.1.0

### Minor Changes

- d3f17a3: Add the Virgo Design libraries for React components, interaction primitives, icons, charts,
  design tokens, themes, fonts and color utilities. Include JavaScript and TypeScript entry points,
  stylesheets, SVG assets and self-hosted font resources.

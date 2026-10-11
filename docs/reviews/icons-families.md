# Virgo icon families — 2026-10-04

The library has 75 families and 111 canonical SVGs: 36 Outline / Filled pairs and
39 single regular icons. Only the requested 36 families received Filled variants.

Canonical sources keep `viewBox="0 0 24 24"`, closed `currentColor` paths and
explicit React exports (`SunIcon`, `SunFilledIcon`). Outline describes the visual
shape; both variants retain fill-first construction without a stroke or runtime
variant API. Metadata records now include the canonical `family` and the
`outline | filled` variant. The generator validates their naming and relationship
before writing output.

Sun, Moon, Play, Pause and Stop previously defaulted to solid geometry. That exact
geometry is now preserved in their Filled sources; default exports are outline.
Pause's hollow bars use wider shells with 1.5-unit rails so their negative space
remains visible at small sizes. Animation capability belongs to the family. The 34 animated families contain 46
animated icon variants: the 12 animated pairs share motion and playback controls, while
the remaining pairs stay static. Filled Gauge animates its negative-space needle
contour without moving the dial. Metadata validation enforces animation agreement
within each family.

The motion review compared both members
at 0%, 25% and 55% of the shared cycle on light and dark backgrounds. Browser
sampling of 21 phases for all 24 animated pair members confirms actual movement
and keeps sampled path points within the 24-unit canvas. The animation catalogue
contains 34 families / 46 variants, with paired members sharing motion descriptions.

The optical review compared every pair at 16, 20, 24 and
32px on light and dark backgrounds. The 20/24px samples are the primary optical
review; 16px is diagnostic. All 576 rendered SVG samples fit within the 24-unit
canvas. Filled status icons, fields, pigment wells, lock holes and gauge markings
retain transparent negative space rather than fixed background colors. Settings,
Pin and Unpin retain their intentional 9-degree geometry.

The Website catalogue is a flat grid with one equal-width, equal-height cell for each
actual export. Family only expresses relationships: it never groups cards into layout
containers, splits their widths or reserves slots. Sort by family A–Z, Outline before
Filled, so siblings are consecutive and may wrap normally across rows. Each card shows
its family and visual variant. Detail exposes explicit component names and independent
TSX / SVG exports for each member. Search supports family, variant, inherited aliases
and localized Chinese terms; category and animation filters continue to show only
matching variants.

Regression coverage checks exact pair membership, preservation of former solid
silhouettes, distinct geometry, explicit exports, refs and accessibility, invalid
family metadata, generator freshness, flat catalogue structure and consecutive sibling order, localized variant
search and switching between detail / code / SVG exports.

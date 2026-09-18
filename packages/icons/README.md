# @virgo-design/icons

`@virgo-design/icons` is the icon system of Virgo Design.

Virgo Icons are built around a solid geometric visual language with a restrained cyber-geometric character. The system is designed for production interfaces: clear at small sizes, visually consistent as a family, and distinctive without relying on decorative effects.

## Architecture

Canonical icon assets live in:

```text
packages/icons/icons/
```

These SVG files are the source of truth.

React components are generated from the canonical SVG assets:

```text
canonical SVG
        ↓
pnpm gen:icons
        ↓
generated React components
        ↓
@virgo-design/icons
```

Generated components live in:

```text
packages/icons/src/generated/
```

The package entry point is generated from the available canonical icons.

Applications, UI components, documentation, and the Icons Playground consume `@virgo-design/icons`. They do not own canonical icon geometry.

## Canonical SVG

Every Virgo Icon is designed on a canonical:

```text
24 × 24
```

coordinate system.

Canonical SVGs use:

```svg
viewBox="0 0 24 24"
```

Presentation width and height are controlled by the consumer rather than hard-coded into the source asset.

Virgo Icons primarily use:

```svg
fill="currentColor"
```

The system is fill-first rather than stroke-first.

Filled geometry is a construction method, not a goal of making icons visually heavy. Complex icons should preserve intentional negative space and maintain a perceived visual density reasonably close to the established family references.

A canonical icon may contain one or multiple meaningful paths depending on its geometry.

## Visual Language

Virgo Icons use a:

> **Solid Geometric / Light Cyber-Geometric**

visual language.

The character of the system is:

- precise
- geometric
- clean
- restrained
- slightly sharp
- technical
- production-oriented
- subtly futuristic

The cyber-geometric character comes primarily from structure:

- proportion
- terminal treatment
- controlled chamfers
- negative space
- directional geometry
- optical balance

It does not depend on decorative sci-fi details.

Virgo Icons should remain immediately understandable as familiar interface symbols before their stylistic character becomes noticeable.

## Geometry

The canonical canvas is a coordinate system, not a box that must be filled.

Icons may use different visual footprints depending on their semantic shape.

Simple stems generally use a visual weight around:

```text
2 units
```

This describes perceived geometry rather than an SVG `stroke-width`.

Integer and half-unit coordinates are preferred:

```text
4
4.5
5
```

Other values may be used when optical correction requires them.

Mechanical consistency is useful, but optical balance has higher priority.

A mathematically centered icon may still require a small optical adjustment to appear centered at real UI sizes.

## Negative Space and Density

Negative space is a first-class part of Virgo Icon geometry.

A fill-first icon should not become a large solid silhouette simply because its shape is complex.

As icon complexity increases, internal space becomes increasingly important for preserving clarity and family consistency.

The intended relationship is:

```text
solid geometry
+
intentional negative space
=
clear visual skeleton
```

Icons such as Settings, Trash, User, and other structurally complex symbols should retain enough open space to remain visually balanced beside simpler icons such as Plus, Minus, Check, and Chevron.

Perceived weight matters more than total filled area or path complexity.

## Chamfers and Terminals

Controlled chamfers are one of the geometric signatures of Virgo Icons.

The accepted `plus.svg` demonstrates the initial reference treatment:

- small
- restrained
- geometric
- integrated into the structure

A typical chamfer may be around:

```text
0.5 unit
```

where appropriate.

Chamfers are not a decoration applied uniformly to every icon. Their shape and presence depend on the object being represented.

Different icons may express Virgo character through different structural features.

## Curves

Virgo Icons are geometric, but they are not restricted to straight lines.

Natural curves are appropriate for symbols such as:

- Search
- User
- Info
- Eye
- Globe
- circular controls
- mechanical rings

A naturally curved object should remain naturally curved.

The design system does not force circles, human forms, or other organic structures into polygons merely for visual consistency.

Rounded geometry is intentional rather than automatic.

## Optical Balance

Every icon should feel stable at real interface sizes.

The main visual priorities are:

1. Recognition
2. Optical balance
3. Family consistency
4. Virgo character
5. Decorative expression

Recognition always comes first.

Family consistency is achieved through shared visual weight, proportion, spacing, negative-space discipline, and geometric restraint rather than by repeating the same motif on every icon.

## Reference Icons

### Plus

`icons/plus.svg` is the first canonical family reference.

It establishes an initial baseline for:

- visual weight
- overall proportion
- terminal treatment
- chamfer restraint
- geometric sharpness
- fill-based construction

New icons should feel related to Plus without copying its geometry mechanically.

### Search

Search demonstrates how curved geometry can coexist with the Virgo visual language.

Its circular structure is semantically natural and therefore remains curved while still following the same family principles of weight, spacing, and restraint.

### Settings

Settings demonstrates intentional brand-coded geometry within a familiar interface symbol.

Certain unusual rotations, offsets, or asymmetries may be deliberate parts of canonical icon geometry. When present, their design intent is documented directly in the corresponding SVG source.

## Real-Size Review

Canonical geometry is designed on the 24×24 canvas and should remain clear at real interface sizes.

The primary reference size is:

```text
24px
```

Common UI usage around:

```text
20px
```

is also important when evaluating visual density, negative space, and recognizability.

Large Playground previews are useful for inspecting geometry, but the final judgment belongs to the real rendered size.

Details that only work when heavily magnified are not part of the intended visual language.

Small structural signatures may use optical compensation so they remain perceptible at real UI sizes.

## Naming

Canonical SVG files use lowercase kebab-case:

```text
plus.svg
minus.svg
chevron-down.svg
search.svg
settings.svg
```

Generated React components use PascalCase with the `Icon` suffix:

```text
PlusIcon
MinusIcon
ChevronDownIcon
SearchIcon
SettingsIcon
```

## Generation

After changing or adding a canonical SVG, regenerate the React package with:

```bash
pnpm gen:icons
```

The generator reads the canonical assets and updates the generated React components and public exports.

The normal repository validation command is:

```bash
pnpm all
```

## Usage

```tsx
import { PlusIcon, SearchIcon } from '@virgo-design/icons';

export function Example() {
  return (
    <>
      <PlusIcon />
      <SearchIcon size={20} />
    </>
  );
}
```

Icons inherit their color from the surrounding interface through `currentColor`.

This allows icon color to follow component state, semantic color tokens, and normal CSS without embedding presentation-specific colors into canonical assets.

## Icons Playground

`apps/icons-playground` is the internal visual review environment for Virgo Icons.

It consumes the icon package and provides enlarged geometry inspection, real-size previews, theme review, grid inspection, and icon selection.

The Playground is a viewing and calibration surface.

Canonical icon geometry remains in:

```text
packages/icons/icons/
```

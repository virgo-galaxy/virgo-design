import { describe, expect, it } from 'vitest';

import { componentRoutes } from '@/features/components/app/componentRoutes';
import { primitiveDocs } from '@/features/primitives/primitiveDocs';

import {
  componentPrimitiveRelations,
  getComponentsForPrimitive,
  getPrimitivesForComponent,
} from './componentPrimitiveRelations';

describe('componentPrimitiveRelations', () => {
  const componentSlugs = new Set<string>(componentRoutes.map((route) => route.id));
  const primitiveSlugs = new Set<string>(primitiveDocs.map((doc) => doc.slug));

  it('only contains canonical component route slugs', () => {
    expect(Object.keys(componentPrimitiveRelations).every((slug) => componentSlugs.has(slug))).toBe(
      true,
    );
  });

  it('only points to canonical primitive route slugs', () => {
    const relatedPrimitiveSlugs = Object.values(componentPrimitiveRelations).flat();

    expect(relatedPrimitiveSlugs.every((slug) => primitiveSlugs.has(slug))).toBe(true);
  });

  it('returns a one-to-one relationship', () => {
    expect(getPrimitivesForComponent('button')).toEqual(['button']);
    expect(getPrimitivesForComponent('dock')).toEqual(['dock']);
  });

  it('supports one component built with multiple primitives', () => {
    expect(getPrimitivesForComponent('command')).toEqual(['command', 'dialog']);
    expect(getPrimitivesForComponent('navigation-menu')).toEqual(['navigation-menu', 'popover']);
    expect(getPrimitivesForComponent('pagination')).toEqual(['pagination', 'dropdown', 'input']);
    expect(getPrimitivesForComponent('floating-action')).toEqual(['button', 'popover']);
  });

  it('reverse-computes multiple components using one primitive', () => {
    expect(getComponentsForPrimitive('dialog')).toEqual(['command', 'dialog', 'drawer']);
    expect(getComponentsForPrimitive('radio')).toEqual(['radio', 'segmented-control']);
    expect(getComponentsForPrimitive('button')).toEqual(['button', 'floating-action']);
    expect(getComponentsForPrimitive('popover')).toEqual([
      'floating-action',
      'navigation-menu',
      'popover',
    ]);
  });

  it('returns no relationship for a UI-only component', () => {
    expect(getPrimitivesForComponent('card')).toEqual([]);
  });

  it('returns no consumers for a primitive-only primitive', () => {
    expect(getComponentsForPrimitive('collapsible')).toEqual([]);
  });
});

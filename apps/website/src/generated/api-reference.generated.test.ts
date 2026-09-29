import { describe, expect, it } from 'vitest';

import { componentRoutes } from '@/features/components/app/componentRoutes';
import { primitiveDocs } from '@/features/primitives/primitiveDocs';

import { componentApiReference, primitiveApiReference } from './api-reference.generated';

describe('generated API reference registry', () => {
  it('covers every documented component family exactly once', () => {
    expect(Object.keys(componentApiReference).sort()).toEqual(
      componentRoutes.map((route) => route.id).sort(),
    );
    componentRoutes.forEach((route) => {
      expect(componentApiReference[route.id]?.declarations.length).toBeGreaterThan(0);
    });
  });

  it('covers every primitive detail page exactly once', () => {
    expect(Object.keys(primitiveApiReference).sort()).toEqual(
      primitiveDocs.map((doc) => doc.slug).sort(),
    );
    primitiveDocs.forEach((doc) => {
      expect(primitiveApiReference[doc.slug]?.declarations.length).toBeGreaterThan(0);
    });
  });

  it('keeps Textarea in the Input component family API', () => {
    expect(componentApiReference.input?.declarations.map((entry) => entry.name)).toContain(
      'TextareaProps',
    );
  });
});

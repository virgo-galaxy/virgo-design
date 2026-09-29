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

  it('provides stable translation keys while retaining English JSDoc fallbacks', () => {
    const textButton = componentApiReference.button?.declarations.find(
      (entry) => entry.name === 'TextButtonProps',
    );
    const children = textButton?.properties.find((property) => property.name === 'children');

    expect(textButton?.descriptionTranslationKey).toBe(
      'components.button.api.text-button-props.description',
    );
    expect(children?.descriptionTranslationKey).toBe(
      'components.button.api.text-button-props.properties.children.description',
    );
    expect(children?.description).toBe('Visible text label for the action.');
  });
});

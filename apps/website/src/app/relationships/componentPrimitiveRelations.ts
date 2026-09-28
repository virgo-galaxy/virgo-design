import type { ComponentSlug } from '@/features/components/app/componentRoutes';
import type { PrimitiveSlug } from '@/features/primitives/primitiveDocs';

/**
 * Semantic construction dependencies for the Website's canonical Component routes.
 * Primitive-to-Component relationships are always derived from this single source.
 */
export const componentPrimitiveRelations = {
  accordion: ['accordion'],
  breadcrumb: ['breadcrumb'],
  button: ['button'],
  checkbox: ['checkbox'],
  command: ['command', 'dialog'],
  'context-menu': ['context-menu'],
  cursor: ['cursor'],
  dialog: ['dialog'],
  drawer: ['dialog'],
  dropdown: ['dropdown'],
  dock: ['dock'],
  'floating-action': ['button', 'popover'],
  input: ['input', 'textarea'],
  layout: ['layout'],
  menu: ['menu'],
  menubar: ['menubar'],
  'navigation-menu': ['navigation-menu', 'popover'],
  pagination: ['pagination', 'dropdown', 'input'],
  popover: ['popover'],
  radio: ['radio'],
  'segmented-control': ['radio'],
  select: ['select'],
  switch: ['switch'],
  tabs: ['tabs'],
  toast: ['toast'],
  tooltip: ['tooltip', 'cursor'],
} as const satisfies Partial<Record<ComponentSlug, readonly PrimitiveSlug[]>>;

type RelatedComponentSlug = keyof typeof componentPrimitiveRelations;

const noPrimitives: readonly PrimitiveSlug[] = [];

export function getPrimitivesForComponent(componentSlug: ComponentSlug): readonly PrimitiveSlug[] {
  return componentPrimitiveRelations[componentSlug as RelatedComponentSlug] ?? noPrimitives;
}

export function getComponentsForPrimitive(primitiveSlug: PrimitiveSlug): readonly ComponentSlug[] {
  return (Object.keys(componentPrimitiveRelations) as RelatedComponentSlug[]).filter(
    (componentSlug) =>
      (componentPrimitiveRelations[componentSlug] as readonly PrimitiveSlug[]).includes(
        primitiveSlug,
      ),
  );
}

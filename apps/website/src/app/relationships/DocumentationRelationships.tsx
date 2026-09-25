import { RelationshipSection } from '@/components/docs/RelationshipSection/RelationshipSection';
import type { ComponentSlug } from '@/features/playground/ui/app/componentRoutes';
import type { PrimitiveSlug } from '@/features/primitives/primitiveDocs';

import {
  getComponentsForPrimitive,
  getPrimitivesForComponent,
} from './componentPrimitiveRelations';
import styles from './documentation-relationships.module.scss';

function formatSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ');
}

export function ComponentRelationships({ componentSlug }: { componentSlug: ComponentSlug }) {
  const items = getPrimitivesForComponent(componentSlug).map((primitiveSlug) => ({
    href: `/primitives/${primitiveSlug}`,
    label: `${formatSlug(primitiveSlug)} Primitive`,
  }));

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.componentPlacement}>
      <RelationshipSection title="Built with" items={items} />
    </div>
  );
}

export function PrimitiveRelationships({ primitiveSlug }: { primitiveSlug: PrimitiveSlug }) {
  const items = getComponentsForPrimitive(primitiveSlug).map((componentSlug) => ({
    href: `/components/${componentSlug}`,
    label: formatSlug(componentSlug),
  }));

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.primitivePlacement}>
      <RelationshipSection title="Used by" items={items} />
    </div>
  );
}

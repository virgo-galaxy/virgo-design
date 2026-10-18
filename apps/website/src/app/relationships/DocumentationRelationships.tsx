import { useTranslation } from 'react-i18next';

import { RelationshipSection } from '@/components/docs/RelationshipSection/RelationshipSection';
import type { ComponentSlug } from '@/features/components/app/componentRoutes';
import type { PrimitiveSlug } from '@/features/primitives/primitiveDocs';

import {
  getComponentsForPrimitive,
  getCompositionsForComponent,
  getPrimitivesForComponent,
} from './componentPrimitiveRelations';

import styles from './documentation-relationships.module.scss';

function formatSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
}

export function ComponentRelationships({ componentSlug }: { componentSlug: ComponentSlug }) {
  const { t } = useTranslation();
  const items = getPrimitivesForComponent(componentSlug).map((primitiveSlug) => ({
    href: `/primitives/${primitiveSlug}`,
    label: t('docs.relationships.primitiveLabel', { name: formatSlug(primitiveSlug) }),
  }));

  const compositionItems = getCompositionsForComponent(componentSlug).map((slug) => ({
    href: `/components/${slug}`,
    label: formatSlug(slug),
  }));
  if (items.length === 0 && compositionItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.componentPlacement}>
      <RelationshipSection kind="builtWith" items={items} compositionItems={compositionItems} />
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
      <RelationshipSection kind="usedBy" items={items} />
    </div>
  );
}

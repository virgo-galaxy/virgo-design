import { ChevronRightIcon } from '@virgo-design/icons';
import { Tree as PrimitiveTree } from '@virgo-design/primitives';
import { forwardRef } from 'react';

import styles from './Tree.module.scss';
import type {
  TreeGroupProps,
  TreeItemProps,
  TreeLabelProps,
  TreeProps,
  TreeToggleProps,
} from './Tree.types';

export const Tree = forwardRef<HTMLDivElement, TreeProps>(function Tree(
  { size = 'medium', className, ...props },
  ref,
) {
  return (
    <PrimitiveTree
      {...props}
      ref={ref}
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-size={size}
    />
  );
});

export const TreeItem = forwardRef<HTMLDivElement, TreeItemProps>(function TreeItem(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveTree.Item
      {...props}
      ref={ref}
      className={[styles.item, className].filter(Boolean).join(' ')}
    />
  );
});

export const TreeLabel = forwardRef<HTMLDivElement, TreeLabelProps>(function TreeLabel(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveTree.Label
      {...props}
      ref={ref}
      className={[styles.label, className].filter(Boolean).join(' ')}
    />
  );
});

export const TreeGroup = forwardRef<HTMLDivElement, TreeGroupProps>(function TreeGroup(
  { className, ...props },
  ref,
) {
  return (
    <PrimitiveTree.Group
      {...props}
      ref={ref}
      className={[styles.group, className].filter(Boolean).join(' ')}
    />
  );
});

export const TreeToggle = forwardRef<HTMLButtonElement, TreeToggleProps>(function TreeToggle(
  { children, className, ...props },
  ref,
) {
  return (
    <PrimitiveTree.Toggle
      {...props}
      ref={ref}
      className={[styles.toggle, className].filter(Boolean).join(' ')}
    >
      {children ?? <ChevronRightIcon size={16} />}
    </PrimitiveTree.Toggle>
  );
});

import { Tree as TreeRoot, TreeGroup, TreeItem, TreeLabel, TreeToggle } from './Tree';
export const Tree = Object.assign(TreeRoot, {
  Root: TreeRoot,
  Item: TreeItem,
  Label: TreeLabel,
  Group: TreeGroup,
  Toggle: TreeToggle,
});
export type {
  TreeGroupProps,
  TreeItemProps,
  TreeLabelProps,
  TreeProps,
  TreeToggleProps,
} from './Tree.types';

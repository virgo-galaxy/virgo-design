import type { ComponentMetadata } from '../../metadata/ComponentMetadata';
export const treeMetadata = {
  name: 'Tree',
  package: '@virgo-design/ui',
  category: 'Navigation',
  description: 'Navigates nested hierarchies with independent expansion, focus and selection.',
  import: "import { Tree } from '@virgo-design/ui';",
  sizes: [
    { name: 'small', description: 'Compact presentation.' },
    { name: 'medium', description: 'Default presentation.' },
    { name: 'large', description: 'Spacious presentation.' },
  ],
  states: ['default', 'focus', 'selected', 'expanded', 'disabled'],
  anatomy: [
    {
      name: 'Tree',
      description: 'Tree composition part.',
    },
    {
      name: 'Tree.Item',
      description: 'Tree.Item composition part.',
    },
    {
      name: 'Tree.Label',
      description: 'Tree.Label composition part.',
    },
    {
      name: 'Tree.Toggle',
      description: 'Tree.Toggle composition part.',
    },
    {
      name: 'Tree.Group',
      description: 'Tree.Group composition part.',
    },
  ],
  capabilities: {
    controlledExpansion: true,
    controlledSelection: true,
    multipleSelection: true,
    typeahead: true,
  },
  accessibility: [
    'Uses tree/treeitem/group roles and one visible enabled tab stop.',
    'Arrow keys and Home/End move focus; Enter/Space explicitly select.',
    'Multiple selection toggles without modifier keys; focus does not change selection.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;

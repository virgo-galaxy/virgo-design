import type { ComponentMetadata } from '../../metadata/ComponentMetadata';

export const commandMetadata = {
  name: 'Command',
  package: '@virgo-design/ui',
  category: 'Actions',
  description: 'Searches and executes application commands from an inline list or dialog palette.',
  import: "import { Command } from '@virgo-design/ui';",
  variants: [
    { name: 'inline', description: 'Embeds a searchable command list in the current flow.' },
    { name: 'dialog', description: 'Composes the existing Dialog protocol as a command palette.' },
  ],
  states: ['idle', 'searching', 'active', 'disabled', 'empty'],
  anatomy: ['Root', 'Dialog', 'Input', 'List', 'Empty', 'Group', 'Item', 'Separator'].map(
    (part) => ({ name: `Command.${part}`, description: 'Command composition part.' }),
  ),
  capabilities: {
    controlledSearch: true,
    controlledActiveItem: true,
    customFilter: true,
    keyboardNavigation: true,
    dialogComposition: true,
    icon: true,
    shortcutDisplay: true,
    shortcutBinding: false,
  },
  accessibility: [
    'Input uses combobox semantics and keeps DOM focus while aria-activedescendant tracks the active option.',
    'Arrow keys, Home and End move through visible enabled commands; Enter selects the active command.',
    'Command.Dialog reuses Dialog focus trapping, Escape dismissal, modal isolation and focus return.',
  ],
  examples: [],
} as const satisfies ComponentMetadata;

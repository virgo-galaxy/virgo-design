import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import CommandDialogExample from './CommandDialogExample';
import commandDialogSource from './CommandDialogExample.tsx?raw';
import CommandFilterExample from './CommandFilterExample';
import commandFilterSource from './CommandFilterExample.tsx?raw';
import CommandInlineExample from './CommandInlineExample';
import commandInlineSource from './CommandInlineExample.tsx?raw';

export const commandExamples = {
  commandInline: {
    id: 'command-inline',
    title: 'Inline command list',
    description: 'Search by label or keyword; the selected value is local feedback.',
    Component: CommandInlineExample,
    source: commandInlineSource,
  },
  commandDialog: {
    id: 'command-dialog',
    title: 'Dialog palette',
    description: 'Focus this example, then press ⌘/Ctrl K, or use its button.',
    Component: CommandDialogExample,
    source: commandDialogSource,
  },
  commandFilter: {
    id: 'command-filter',
    title: 'Custom filter',
    description: 'Match the beginning of each command value.',
    Component: CommandFilterExample,
    source: commandFilterSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;

import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import CommandDialogExample from './CommandDialogExample';
import commandDialogStyles from './CommandDialogExample.module.scss?virgo-raw';
import commandDialogSource from './CommandDialogExample.tsx?raw';
import CommandFilterExample from './CommandFilterExample';
import commandFilterStyles from './CommandFilterExample.module.scss?virgo-raw';
import commandFilterSource from './CommandFilterExample.tsx?raw';
import CommandInlineExample from './CommandInlineExample';
import commandInlineStyles from './CommandInlineExample.module.scss?virgo-raw';
import commandInlineSource from './CommandInlineExample.tsx?raw';

export const commandExamples = {
  commandInline: {
    id: 'command-inline',
    title: 'Inline command list',
    titleTranslationKey: 'examples.command.copy.inlineCommandList',
    description: 'Search by label or keyword; the selected value is local feedback.',
    descriptionTranslationKey:
      'examples.command.copy.searchByLabelOrKeywordTheSelectedValueIsLocal',
    Component: CommandInlineExample,
    source: createExampleSource(commandInlineSource),
    styleSource: commandInlineStyles,
  },
  commandDialog: {
    id: 'command-dialog',
    title: 'Dialog palette',
    titleTranslationKey: 'examples.command.copy.dialogPalette',
    description: 'Focus this example, then press ⌘/Ctrl K, or use its button.',
    descriptionTranslationKey: 'examples.command.copy.focusThisExampleThenPressCtrlKOrUseIts',
    Component: CommandDialogExample,
    source: createExampleSource(commandDialogSource),
    styleSource: commandDialogStyles,
  },
  commandFilter: {
    id: 'command-filter',
    title: 'Custom filter',
    titleTranslationKey: 'examples.command.copy.customFilter',
    description: 'Match the beginning of each command value.',
    descriptionTranslationKey: 'examples.command.copy.matchTheBeginningOfEachCommandValue',
    Component: CommandFilterExample,
    source: createExampleSource(commandFilterSource),
    styleSource: commandFilterStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;

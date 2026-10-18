import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import DialogFormExample from './DialogFormExample';
import dialogFormSource from './DialogFormExample.tsx?raw';
import DialogSizesExample from './DialogSizesExample';
import dialogSizesSource from './DialogSizesExample.tsx?raw';

import dialogFormStyles from './DialogFormExample.module.scss?virgo-raw';
import dialogSizesStyles from './DialogSizesExample.module.scss?virgo-raw';

export const dialogExamples = {
  sizes: {
    id: 'dialog-sizes',
    title: 'Dialog sizes',
    titleTranslationKey: 'examples.dialog.copy.dialogSizes',
    description: 'Small, medium and large dialogs share the same anatomy and behavior.',
    descriptionTranslationKey:
      'examples.dialog.copy.smallMediumAndLargeDialogsShareTheSameAnatomyAnd',
    Component: DialogSizesExample,
    source: createExampleSource(dialogSizesSource),
    styleSource: dialogSizesStyles,
  },
  form: {
    id: 'dialog-form',
    title: 'Form dialog',
    titleTranslationKey: 'examples.dialog.copy.formDialog',
    description: 'Controlled state lets form submission close the dialog after handling the data.',
    descriptionTranslationKey:
      'examples.dialog.copy.controlledStateLetsFormSubmissionCloseTheDialogAfterHandling',
    Component: DialogFormExample,
    source: createExampleSource(dialogFormSource),
    styleSource: dialogFormStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;

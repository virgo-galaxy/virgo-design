import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import DialogFormExample from './DialogFormExample';
import dialogFormSource from './DialogFormExample.tsx?raw';
import DialogSizesExample from './DialogSizesExample';
import dialogSizesSource from './DialogSizesExample.tsx?raw';

export const dialogExamples = {
  sizes: {
    id: 'dialog-sizes',
    title: 'Dialog sizes',
    description: 'Small, medium and large dialogs share the same anatomy and behavior.',
    Component: DialogSizesExample,
    source: dialogSizesSource,
  },
  form: {
    id: 'dialog-form',
    title: 'Form dialog',
    description: 'Controlled state lets form submission close the dialog after handling the data.',
    Component: DialogFormExample,
    source: dialogFormSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;

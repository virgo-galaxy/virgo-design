import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import AccordionMultipleExample from './AccordionMultipleExample';
import accordionMultipleSource from './AccordionMultipleExample.tsx?raw';
import AccordionSingleExample from './AccordionSingleExample';
import accordionSingleSource from './AccordionSingleExample.tsx?raw';
import AccordionSizesExample from './AccordionSizesExample';
import accordionSizesSource from './AccordionSizesExample.tsx?raw';
import AccordionVariantsExample from './AccordionVariantsExample';
import accordionVariantsSource from './AccordionVariantsExample.tsx?raw';

export const accordionExamples = {
  accordionVariants: {
    id: 'accordion-variants',
    title: 'Visual variants',
    description: 'Default, bordered, and ghost treatment share the same content.',
    Component: AccordionVariantsExample,
    source: accordionVariantsSource,
  },
  accordionSizes: {
    id: 'accordion-sizes',
    title: 'Accordion sizes',
    description: 'Size adjusts heading height, type, icon, and spacing together.',
    Component: AccordionSizesExample,
    source: accordionSizesSource,
  },
  accordionSingle: {
    id: 'accordion-single',
    title: 'Single selection',
    description: 'At most one section is open.',
    Component: AccordionSingleExample,
    source: accordionSingleSource,
  },
  accordionMultiple: {
    id: 'accordion-multiple',
    title: 'Multiple selection',
    description: 'Sections open independently.',
    Component: AccordionMultipleExample,
    source: accordionMultipleSource,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;

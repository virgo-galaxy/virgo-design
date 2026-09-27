import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';

import AccordionMultipleExample from './AccordionMultipleExample';
import accordionMultipleStyles from './AccordionMultipleExample.module.scss?virgo-raw';
import accordionMultipleSource from './AccordionMultipleExample.tsx?raw';
import AccordionSingleExample from './AccordionSingleExample';
import accordionSingleStyles from './AccordionSingleExample.module.scss?virgo-raw';
import accordionSingleSource from './AccordionSingleExample.tsx?raw';
import AccordionSizesExample from './AccordionSizesExample';
import accordionSizesStyles from './AccordionSizesExample.module.scss?virgo-raw';
import accordionSizesSource from './AccordionSizesExample.tsx?raw';
import AccordionVariantsExample from './AccordionVariantsExample';
import accordionVariantsStyles from './AccordionVariantsExample.module.scss?virgo-raw';
import accordionVariantsSource from './AccordionVariantsExample.tsx?raw';

export const accordionExamples = {
  accordionVariants: {
    id: 'accordion-variants',
    title: 'Visual variants',
    description: 'Default, bordered, and ghost treatment share the same content.',
    Component: AccordionVariantsExample,
    source: accordionVariantsSource,
    styleSource: accordionVariantsStyles,
  },
  accordionSizes: {
    id: 'accordion-sizes',
    title: 'Accordion sizes',
    description: 'Size adjusts heading height, type, icon, and spacing together.',
    Component: AccordionSizesExample,
    source: accordionSizesSource,
    styleSource: accordionSizesStyles,
  },
  accordionSingle: {
    id: 'accordion-single',
    title: 'Single selection',
    description: 'At most one section is open.',
    Component: AccordionSingleExample,
    source: accordionSingleSource,
    styleSource: accordionSingleStyles,
  },
  accordionMultiple: {
    id: 'accordion-multiple',
    title: 'Multiple selection',
    description: 'Sections open independently.',
    Component: AccordionMultipleExample,
    source: accordionMultipleSource,
    styleSource: accordionMultipleStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;

import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import AccordionMultipleExample from './AccordionMultipleExample';
import accordionMultipleSource from './AccordionMultipleExample.tsx?raw';
import AccordionSingleExample from './AccordionSingleExample';
import accordionSingleSource from './AccordionSingleExample.tsx?raw';
import AccordionSizesExample from './AccordionSizesExample';
import accordionSizesSource from './AccordionSizesExample.tsx?raw';
import AccordionVariantsExample from './AccordionVariantsExample';
import accordionVariantsSource from './AccordionVariantsExample.tsx?raw';

import accordionMultipleStyles from './AccordionMultipleExample.module.scss?virgo-raw';
import accordionSingleStyles from './AccordionSingleExample.module.scss?virgo-raw';
import accordionSizesStyles from './AccordionSizesExample.module.scss?virgo-raw';
import accordionVariantsStyles from './AccordionVariantsExample.module.scss?virgo-raw';

export const accordionExamples = {
  accordionVariants: {
    id: 'accordion-variants',
    title: 'Visual variants',
    titleTranslationKey: 'examples.accordion.copy.visualVariants',
    description: 'Default, bordered, and ghost treatment share the same content.',
    descriptionTranslationKey:
      'examples.accordion.copy.defaultBorderedAndGhostTreatmentShareTheSameContent',
    Component: AccordionVariantsExample,
    source: createExampleSource(accordionVariantsSource),
    styleSource: accordionVariantsStyles,
  },
  accordionSizes: {
    id: 'accordion-sizes',
    title: 'Accordion sizes',
    titleTranslationKey: 'examples.accordion.copy.accordionSizes',
    description: 'Size adjusts heading height, type, icon, and spacing together.',
    descriptionTranslationKey:
      'examples.accordion.copy.sizeAdjustsHeadingHeightTypeIconAndSpacingTogether',
    Component: AccordionSizesExample,
    source: createExampleSource(accordionSizesSource),
    styleSource: accordionSizesStyles,
  },
  accordionSingle: {
    id: 'accordion-single',
    title: 'Single selection',
    titleTranslationKey: 'examples.accordion.copy.singleSelection',
    description: 'At most one section is open.',
    descriptionTranslationKey: 'examples.accordion.copy.atMostOneSectionIsOpen',
    Component: AccordionSingleExample,
    source: createExampleSource(accordionSingleSource),
    styleSource: accordionSingleStyles,
  },
  accordionMultiple: {
    id: 'accordion-multiple',
    title: 'Multiple selection',
    titleTranslationKey: 'examples.accordion.copy.multipleSelection',
    description: 'Sections open independently.',
    descriptionTranslationKey: 'examples.accordion.copy.sectionsOpenIndependently',
    Component: AccordionMultipleExample,
    source: createExampleSource(accordionMultipleSource),
    styleSource: accordionMultipleStyles,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;

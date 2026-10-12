import type { ComponentExampleDefinition } from '@/components/docs/ComponentExample';
import { createExampleSource } from '@/examples/components/create-example-source';

import Example from './CarouselContentExample';
import style from './CarouselContentExample.module.scss?virgo-raw';
import source from './CarouselContentExample.tsx?raw';
export const carouselExamples = {
  example0: {
    id: 'carousel-content',
    title: 'Content and examples',
    titleTranslationKey: 'examples.carousel.copy.title0',
    description: 'Automatic playback and interactive pages share one shell.',
    descriptionTranslationKey: 'examples.carousel.copy.description0',
    Component: Example,
    source: createExampleSource(source),
    styleSource: style,
  },
} as const satisfies Readonly<Record<string, ComponentExampleDefinition>>;
